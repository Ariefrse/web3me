const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const CommuniCryptDonation = await hre.ethers.getContractFactory("CommuniCryptDonation");
  
  // Deploy the contract
  const donationContract = await CommuniCryptDonation.deploy();
  
  // Wait for the contract to be deployed
  await donationContract.deployed();
  
  console.log("CommuniCryptDonation deployed to:", donationContract.address);

  // Verify contract (optional, requires Etherscan API)
  try {
    await hre.run("verify:verify", {
      address: donationContract.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.log("Verification failed:", error);
  }
}

// Recommended pattern to handle async errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
