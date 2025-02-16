import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { FACTORY_CONTRACT_ADDRESS, FACTORY_CONTRACT_ABI, POOL_CONTRACT_ABI } from '../constants/index';
import { useVoting } from '../VotingContext';

function HomePage() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const { pools, updatePools, account } = useVoting();

    useEffect(() => {
        const fetchPools = async () => {
            if (typeof window.ethereum !== 'undefined' && account) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const factoryContract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, FACTORY_CONTRACT_ABI, signer);

                    const poolAddresses = await factoryContract.getAllPools();

                    const poolDetails = await Promise.all(
                        poolAddresses.map(async (poolAddress) => {
                            const poolContract = new ethers.Contract(poolAddress, POOL_CONTRACT_ABI, signer);
                            const poolName = await poolContract.poolName();
                            const endTime = await poolContract.endTime();
                            return { 
                                address: poolAddress, 
                                name: poolName, 
                                endTime: Number(endTime) * 1000 // Convert to milliseconds
                            };
                        })
                    );

                    updatePools(poolDetails.sort((a, b) => b.endTime - a.endTime));


                    const admin = await factoryContract.admin();
                    setIsAdmin(account.toLowerCase() === admin.toLowerCase());
                } catch (error) {
                    console.error("Error fetching pools:", error);
                }
            }
        };

        fetchPools();
    }, [account, updatePools]);

    const goToCreatePool = () => {
        navigate('/create');
    };

    const goToVote = (poolAddress) => {
        navigate(`/vote/${poolAddress}`);
    };

    const goToResults = (poolAddress) => {
        navigate(`/results/${poolAddress}`);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Voting Pools</h1>

            {isAdmin && (
                <div className="flex justify-center mb-6">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                        onClick={goToCreatePool}
                    >
                        + Create New Pool
                    </button>
                </div>
            )}

            {pools.length > 0 ? (
                <div className="space-y-4">
                    {pools.map((pool) => (
                        <div
                            key={pool.address}
                            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{pool.name}</h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    Ends on: <span className="font-medium">{formatDate(pool.endTime)}</span>
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    className={`py-2 px-5 rounded-lg transition duration-300 font-semibold ${
                                        Date.now() > pool.endTime
                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                                    onClick={() => goToVote(pool.address)}
                                    disabled={Date.now() > pool.endTime} 
                                >
                                    Vote
                                </button>

                                {isAdmin && (
                                    <button
                                        className="bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 px-5 rounded-lg transition duration-300"
                                        onClick={() => goToResults(pool.address)}
                                    >
                                        View Results
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 text-lg">No voting pools available.</p>
            )}
        </div>
    );
}

export default HomePage;
