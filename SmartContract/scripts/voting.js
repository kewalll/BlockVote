const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const VotingFactory = await ethers.getContractFactory("VotingFactory");

  const voters = [
    "0x82ea1Dede2b4FAe7B17CdFA6D8036452B20e4c36",
    "0x0FdBF096C566F427b7e8E51EE19cc3D3A7705efd",
    "0xB3A9E25C7C05d2E42e2631489b740D8d08476963",
    "0x0feB454fF9F56feE705A6109cd0bD5e937f9a8CA",
    "0x0bd3A2CBc072C172049b68758abeD7db6d502eC2"
  ]; // Replace with actual addresses

  const votingFactory = await VotingFactory.deploy(voters);
  
  await votingFactory.waitForDeployment();

  console.log("Contract deployed to:", await votingFactory.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
