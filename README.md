# BlockVote: A Blockchain-Based Voting System  

## Overview  
BlockVote is a decentralized, secure, and transparent blockchain-based voting system designed to enhance electoral integrity. Using smart contracts and cryptographic techniques, it ensures fraud-resistant elections where votes are immutable and publicly verifiable.

## Features  
- **Decentralized Voting Pools** – Deploy and manage elections dynamically.  
- **Immutable & Transparent** – Blockchain ensures tamper-proof results.  
- **One-Vote-Per-Voter** – Smart contracts prevent duplicate voting.  
- **Voter Privacy & Security** – Zero-Knowledge Proofs (ZKP) ensure anonymity.  
- **Automated Vote Counting** – Real-time tallying through smart contracts.  
- **Global Accessibility** – Vote securely from anywhere.  

## Tech Stack  
- **Blockchain**: Ethereum / Polygon (PoS)  
- **Smart Contracts**: Solidity, OpenZeppelin  
- **Frontend**: React.js, Ethers.js  
- **Backend**: Node.js, Express.js  
- **Development Tools**: Hardhat, Ganache  
- **Deployment**: AWS / Google Cloud / Azure  

## System Workflow  
1. **Admin Panel** – Create and manage election pools.  
2. **Voter Authentication** – Verify voter identity via blockchain wallets.  
3. **Voting Process** – Users securely cast votes on-chain.  
4. **Result Tracking** – Live updates and transparent results.  

## Screenshots  
### Landing Page  
![Landing Page](./screenshots/landing_page.png)  

### Admin Panel  
![Admin Panel](./screenshots/admin_panel.png)  

### Admin Dashboard  
![Admin Dashboard](./screenshots/admin_dashboard.png)  

### Voting Results  
![Voting Results](./screenshots/voting_results.png)  

### Voting Interface  
![Voting Interface](./screenshots/voting_interface.png)  
 

## Installation & Setup  

### Prerequisites  
- Node.js & npm  
- Hardhat (for smart contract development)  
- MetaMask (for blockchain interactions)  
- Ganache (for local blockchain testing)  

### Setup Instructions  
1. **Clone the repository**  
   ```bash
   git clone https://github.com/kewalll/BlockVote.git
   cd BlockVote
2. **Install Dependencies**
- For Client Side
   ```bash
   cd .\client\BlockVote\
   npm i
   ```
- For Backend
 ```bash
  cd .\SmartContract\
  npm i
```

3. **Compile & Deploy Smart Contracts**
   ```bash

   ```

4. **Run Frontend**
   ```bash
   cd .\client\BlockVote\
   npm run dev
   ```

5. **Connect MetaMask**
- Import local blockchain accounts from Ganache
- Set up the correct network in MetaMask

### SDGs Achieved
 - **SDG 9:** Blockchain-based voting infrastructure.
 - **SDG 11:** Inclusive and accessible election participation.
 - **SDG 12:** Inclusive and accessible election participation.
 - **SDG 13:** Inclusive and accessible election participation.
 - **SDG 16:** Inclusive and accessible election participation.

## Future Enhancements
- **Regional Vote Analysis (Data Science Integration):** Implement data visualization to display votes per region dynamically.
- **Machine Learning Vote Prediction:** Develop an ML model to predict election results based on past voting patterns.
- **Biometric Authentication:** Integrate facial recognition and fingerprint authentication for voter verification.
- **Government Integration:** Direct link with national identity databases for voter authentication.

## Contributors
- **Kewal B Nanavati**
- **Dhairya A Mehra**

