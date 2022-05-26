require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: __dirname + '/.env.local' })

module.exports = {
  solidity: '0.8.14',
  networks: {
    rinkeby: {
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: process.env.PROD_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
}