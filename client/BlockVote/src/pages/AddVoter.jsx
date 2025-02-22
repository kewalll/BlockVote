import React, { useState } from "react";
import { ethers } from "ethers";
import { FACTORY_CONTRACT_ADDRESS, FACTORY_CONTRACT_ABI } from "../constants/index";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function AddVoter() {
    const navigate = useNavigate();
    const [voterAddress, setVoterAddress] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleAddVoter = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!ethers.isAddress(voterAddress)) {
            setError("Invalid Ethereum address. Please enter a valid address.");
            return;
        }

        try {
            if (!window.ethereum) {
                setError("Please install MetaMask or another web3 provider.");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, FACTORY_CONTRACT_ABI, signer);

            const tx = await contract.addVoter(voterAddress);
            await tx.wait();

            setSuccess("Voter added successfully!");
            setVoterAddress("");
            navigate('/home');
        } catch (err) {
            console.error("Error adding voter:", err);
            setError("Failed to add voter. Check console for details.");
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-md mt-20">
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Add Voter</h1>
                {error && <Alert severity="error" className="mb-4">{error}</Alert>}
                {success && <Alert severity="success" className="mb-4">{success}</Alert>}

                <form onSubmit={handleAddVoter}>
                    <div className="mb-4">
                        <TextField
                            label="Voter Address"
                            fullWidth
                            value={voterAddress}
                            onChange={(e) => setVoterAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button variant="contained" color="primary" type="submit">
                            Add Voter
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddVoter;
