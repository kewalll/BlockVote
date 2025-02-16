// src/VotingContext.jsx
import React, { createContext, useState, useContext } from 'react';

const VotingContext = createContext(null);

export const VotingProvider = ({ children }) => {
  const [pools, setPools] = useState([]);
  const [account, setAccount] = useState('');

  // Function to update the pools
  const updatePools = (newPools) => {
    setPools(newPools);
  };

   // Function to update the account
   const updateAccount = (newAccount) => {
    setAccount(newAccount);
  };

  return (
    <VotingContext.Provider value={{ pools, updatePools, account, updateAccount }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => useContext(VotingContext);
