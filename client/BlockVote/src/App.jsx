import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VotingProvider } from "./VotingContext";
import HomePage from "./pages/HomePage";
import CreatePool from "./pages/CreatePool";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import LandingPage from "./pages/LandingPage"; // Importing Landing Page

function App() {
  return (
    <VotingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreatePool />} />
          <Route path="/vote/:poolAddress" element={<Vote />} />
          <Route path="/results/:poolAddress" element={<Results />} />
        </Routes>
      </Router>
    </VotingProvider>
  );
}

export default App;
