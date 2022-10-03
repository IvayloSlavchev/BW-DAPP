require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.REACT_APP_ALCHEMY_KEY,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    }
  }
};
