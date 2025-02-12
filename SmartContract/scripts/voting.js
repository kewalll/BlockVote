const hre = require("hardhat");

async function main() {
  const VotingFactory = await hre.ethers.getContractFactory("VotingFactory");
  const voters = ["0xVoter1...", "0xVoter2..."]; // Replace with actual addresses
  const votingFactory = await VotingFactory.deploy(voters);

  await votingFactory.deployed();
  console.log(`VotingFactory deployed at: ${votingFactory.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
