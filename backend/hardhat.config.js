require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_URL, // Arbitrum Sepolia RPC URL
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    sepolia: {
        url: process.env.SEPOLIA_URL, // Arbitrum Sepolia RPC URL
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      },


  },
};
