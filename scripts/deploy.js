const main = async () => {
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contracts with account: ', deployer.address)
  console.log('Account balance: ', accountBalance.toString())

  const giftContractFactory = await hre.ethers.getContractFactory('GiftMe')
  const giftContract = await giftContractFactory.deploy()
  await giftContract.deployed()

  console.log('GiftMe address: ', giftContract.address)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()