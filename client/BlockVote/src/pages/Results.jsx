import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { POOL_CONTRACT_ABI, FACTORY_CONTRACT_ABI, FACTORY_CONTRACT_ADDRESS } from '../constants/index';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    PieController,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    BarController
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    PieController
);

function Results() {
    const { poolAddress } = useParams();
    const [candidateNames, setCandidateNames] = useState([]);
    const [voteCounts, setVoteCounts] = useState([]);
    const [totalVotes, setTotalVotes] = useState(0);
    const [estimatedTotalVoters, setEstimatedTotalVoters] = useState(0);
    const [voterTurnout, setVoterTurnout] = useState(0);
    const [error, setError] = useState('');
    const chartRef = useRef(null);
    const pieChartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [pieChartInstance, setPieChartInstance] = useState(null);
    const [endTime, setEndTime] = useState(0);
    const [isVotingCompleted, setIsVotingCompleted] = useState(false);
    const [winner, setWinner] = useState('');
    const [candidateVotePercentage, setCandidateVotePercentage] = useState([]); // Added for analytics

    useEffect(() => {
        const fetchResults = async () => {
            try {
                if (window.ethereum) {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();

                    const poolContract = new ethers.Contract(poolAddress, POOL_CONTRACT_ABI, signer);
                    const factoryContract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, FACTORY_CONTRACT_ABI, signer); // Fetch from factory

                    // Fetch candidate names and votes
                    const [names, counts] = await poolContract.getAllVotes();
                    setCandidateNames(names);
                    setVoteCounts(counts.map(count => Number(count)));

                    // Calculate total votes
                    const totalVotesCast = counts.reduce((acc, count) => acc + Number(count), 0);
                    setTotalVotes(totalVotesCast);

                    // Get estimated total voters from the factory contract
                    const estimatedVoters = Number(await factoryContract.countVoters());
                    setEstimatedTotalVoters(estimatedVoters);

                    // Calculate voter turnout
                    const turnout = estimatedVoters > 0 ? ((totalVotesCast / estimatedVoters) * 100).toFixed(2) : 0;
                    setVoterTurnout(turnout);

                    // Fetch voting end time
                    const endTimeFromContract = Number(await poolContract.endTime());
                    setEndTime(endTimeFromContract);
                    const now = Math.floor(Date.now() / 1000);
                    setIsVotingCompleted(now > endTimeFromContract);

                    // Calculate percentage of votes per candidate
                    const votePercentage = counts.map(count => ((Number(count) / totalVotesCast) * 100).toFixed(2));
                    setCandidateVotePercentage(votePercentage);

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
            let maxVotes = Math.max(...voteCounts);
            let winningCandidate = candidateNames[voteCounts.indexOf(maxVotes)];
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
                        data: voteCounts,
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
        }

        if (pieChartRef.current) {
            const ctx = pieChartRef.current.getContext('2d');
            if (pieChartInstance) {
                pieChartInstance.destroy();
            }
            const newPieChartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: candidateNames,
                    datasets: [{
                        data: voteCounts,
                        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                    }],
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Vote Distribution' },
                    },
                },
            });
            setPieChartInstance(newPieChartInstance);
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
                    <div className="p-4 bg-gray-100 rounded-md mt-6">
                        <canvas ref={pieChartRef} />
                    </div>
                    
                    {isVotingCompleted ? (
                        <div className="mt-6 text-center">
                            <p className="text-green-600 font-semibold text-lg">Voting has been completed.</p>
                            <p className="mt-3 font-semibold">Voter Turnout: {voterTurnout}%</p>
                            {winner && <p className="mt-4 text-xl font-bold text-blue-600">Winner: {winner}!</p>}
                            
                            {/* Added Data Analytics */}
                            <div className="mt-6 p-4 bg-gray-200 rounded-md">
                                <h2 className="text-lg font-semibold text-gray-700">Vote Analysis</h2>
                                {candidateNames.map((name, index) => (
                                    <p key={index} className="mt-2">
                                        {name}: <span className="font-bold">{voteCounts[index]} votes</span> ({candidateVotePercentage[index]}%)
                                    </p>
                                ))}
                            </div>
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
