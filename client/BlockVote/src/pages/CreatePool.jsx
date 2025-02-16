// src/CreatePool.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { FACTORY_CONTRACT_ADDRESS, FACTORY_CONTRACT_ABI } from '../constants/index';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

dayjs.locale('en');

function CreatePool() {
    const navigate = useNavigate();
    const [poolName, setPoolName] = useState('');
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs().add(1, 'day'));
    const [candidates, setCandidates] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (!window.ethereum) {
                setError("Please install MetaMask or another web3 provider");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, FACTORY_CONTRACT_ABI, signer);

            const startTimeUnix = startTime.unix();
            const endTimeUnix = endTime.unix();

            const tx = await contract.createVotingPool(
                poolName,
                startTimeUnix,
                endTimeUnix,
                candidates.split(',').map(candidate => candidate.trim())
            );
            await tx.wait();

            console.log('Pool created:', { poolName, startTime, endTime, candidates });
            navigate('/home');
        } catch (err) {
            console.error('Error creating pool:', err);
            setError('Failed to create pool. Check console for details.');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-md mt-20">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center">Create Voting Pool</h1>
                    {error && <Alert severity="error" className="mb-4">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <TextField
                                label="Pool Name"
                                fullWidth
                                value={poolName}
                                onChange={(e) => setPoolName(e.target.value)}
                                required
                            />
                        </div>

                        <Stack spacing={3} className="mb-4">
                            <DateTimePicker
                                label="Start Time"
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                            />
                            <DateTimePicker
                                label="End Time"
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                            />
                        </Stack>

                        <div className="mb-4">
                            <TextField
                                label="Candidates (comma-separated)"
                                fullWidth
                                value={candidates}
                                onChange={(e) => setCandidates(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button variant="contained" color="primary" type="submit">
                                Create Pool
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default CreatePool;