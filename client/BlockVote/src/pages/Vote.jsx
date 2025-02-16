// src/Vote.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { POOL_CONTRACT_ABI } from "../constants/index";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

function Vote() {
    const { poolAddress } = useParams();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCandidates = async () => {
            setError("");
            try {
                if (!window.ethereum) {
                    setError("Please install MetaMask.");
                    return;
                }
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const poolContract = new ethers.Contract(poolAddress, POOL_CONTRACT_ABI, signer);

                const candidatesFromContract = await poolContract.getCandidates();
                
                if (candidatesFromContract.length === 0) {
                    setError("No candidates available for this pool.");
                } else {
                    setCandidates(candidatesFromContract);
                }
            } catch (err) {
                console.error("Error fetching candidates:", err);
                setError("Failed to fetch candidates. Check console for details.");
            }
        };
        fetchCandidates();
    }, [poolAddress]);

    const handleVote = async () => {
        setError("");
        setLoading(true);
        try {
            if (!selectedCandidate) {
                setError("Please select a candidate to vote.");
                setLoading(false);
                return;
            }

            if (!window.ethereum) {
                setError("Please install MetaMask.");
                setLoading(false);
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const poolContract = new ethers.Contract(poolAddress, POOL_CONTRACT_ABI, signer);

            const tx = await poolContract.vote(selectedCandidate);
            await tx.wait();

            console.log("Vote successfully cast for:", selectedCandidate);
            alert("Vote successfully cast for: " + selectedCandidate);
            navigate("/home");
        } catch (err) {
            console.error("Error while voting:", err);
            setError("Voting failed. Ensure you are a registered voter and haven't already voted.");
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto p-6 max-w-lg bg-white shadow-md rounded-md mt-20">
            <h1 className="text-2xl font-bold mb-4 text-center">Vote for a Candidate</h1>
            {error && <Alert severity="error" className="mb-4">{error}</Alert>}
            {candidates.length > 0 ? (
                <FormControl component="fieldset" className="mb-4">
                    <FormLabel component="legend">Select a Candidate</FormLabel>
                    <RadioGroup value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}>
                        {candidates.map((candidate, index) => (
                            <FormControlLabel key={index} value={candidate} control={<Radio />} label={candidate} />
                        ))}
                    </RadioGroup>
                </FormControl>
            ) : (
                <p>Loading candidates...</p>
            )}
            <div className="flex justify-center">
                <Button variant="contained" color="primary" onClick={handleVote} disabled={loading}>
                    {loading ? "Submitting Vote..." : "Vote"}
                </Button>
            </div>
        </div>
    );
}

export default Vote;