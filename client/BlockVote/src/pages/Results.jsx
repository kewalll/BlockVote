// src/Results.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { POOL_CONTRACT_ABI } from '../constants/index';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController
);

function Results() {
    const { poolAddress } = useParams();
    const [candidateNames, setCandidateNames] = useState([]);
    const [voteCounts, setVoteCounts] = useState([]);
    const [error, setError] = useState('');
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [endTime, setEndTime] = useState(0);
    const [isVotingCompleted, setIsVotingCompleted] = useState(false);
    const [winner, setWinner] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                if (window.ethereum) {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const poolContract = new ethers.Contract(poolAddress, POOL_CONTRACT_ABI, signer);

                    const [names, counts] = await poolContract.getAllVotes();
                    setCandidateNames(names);
                    setVoteCounts(counts);

                    const endTimeFromContract = Number(await poolContract.endTime());
                    setEndTime(endTimeFromContract);

                    const now = Math.floor(Date.now() / 1000);
                    setIsVotingCompleted(now > endTimeFromContract);
                } else {
                    setError("Please install MetaMask or another web3 provider");
                }
            } catch (err) {
                console.error('Error fetching results:', err);
                setError('Failed to fetch results. Check console for details.');
            }
        };

        fetchResults();
    }, [poolAddress]);

    useEffect(() => {
        if (isVotingCompleted && candidateNames.length > 0 && voteCounts.length > 0) {
            let maxVotes = 0;
            let winningCandidate = '';

            for (let i = 0; i < candidateNames.length; i++) {
                if (Number(voteCounts[i]) > maxVotes) {
                    maxVotes = Number(voteCounts[i]);
                    winningCandidate = candidateNames[i];
                }
            }
            setWinner(winningCandidate);
        }
    }, [isVotingCompleted, candidateNames, voteCounts]);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (chartInstance) {
                chartInstance.destroy();
            }
            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: candidateNames,
                    datasets: [{
                        label: 'Vote Counts',
                        data: voteCounts.map(count => Number(count)),
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    }],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Voting Results' },
                    },
                },
            });
            setChartInstance(newChartInstance);

            return () => {
                if (newChartInstance) {
                    newChartInstance.destroy();
                }
            };
        }
    }, [candidateNames, voteCounts]);

    return (
        <div className="container mx-auto p-6 max-w-2xl bg-white shadow-lg rounded-lg mt-20">
            <h1 className="text-3xl font-bold text-center mb-6">Voting Results</h1>
            {error && <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">{error}</div>}
            {candidateNames.length > 0 ? (
                <>
                    <div className="p-4 bg-gray-100 rounded-md">
                        <canvas ref={chartRef} />
                    </div>
                    {isVotingCompleted ? (
                        <div className="mt-6 text-center">
                            <p className="text-green-600 font-semibold text-lg">Voting has been completed.</p>
                            <div className="mt-3 text-left">
                                <p className="font-semibold">Vote Counts:</p>
                                {candidateNames.map((name, index) => (
                                    <div key={name} className="mt-1">{name}: {voteCounts[index].toString()} votes</div>
                                ))}
                            </div>
                            {winner && (
                                <p className="mt-4 text-xl font-bold text-blue-600">Winner: {winner}!</p>
                            )}
                        </div>
                    ) : (
                        <p className="mt-4 text-yellow-500 text-center">Voting is still in progress.</p>
                    )}
                </>
            ) : (
                <p className="text-center">Loading results...</p>
            )}
        </div>
    );
}

export default Results;
