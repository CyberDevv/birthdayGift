const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory('GiftMe')
  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  console.log('Contract address: ', waveContract.address)

  const giftTxn = await waveContract.sendGift('Niuce', 23)
  await giftTxn.wait()

  let allGifts = await waveContract.getAllGifts()
  console.log(allGifts)
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