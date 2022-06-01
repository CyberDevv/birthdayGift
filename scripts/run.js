// Returns the Ether balance of a given address
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balanceBigInt)
}

// logs the ether balances for a list of addresses
async function printBalances(addresses) {
  let idx = 0
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address))
    idx++
  }
}

// logs the gifts stored on-chain from gift sent
async function printGifts(gifts) {
  for (const gift of gifts) {
    const timestamp = gift.timestamp
    const sender = gift.name
    const senderAddress = gift.from
    const message = gift.message
    console.log(
      `At ${timestamp}, ${sender} (${senderAddress}) said: "${message}"`,
    )
  }
}

const main = async () => {
  // Get example sender
  const [owner, sender] = await hre.ethers.getSigners()

  // Get tje contract to deploy & deploy
  const giftContractFactory = await hre.ethers.getContractFactory('GiftMe')
  const giftContract = await giftContractFactory.deploy()
  await giftContract.deployed()

  console.log('GiftMe deployed to: ', giftContract.address)

  // check balances before gifting
  const addresses = [owner.address, sender.address, giftContract.address]
  console.log('== start ==')
  await printBalances(addresses)

  // send owner your gift
  const tip = { value: hre.ethers.utils.parseEther('1') }
  await giftContract
    .connect(sender)
    .sendGift('Happy Birthday boy!', 'Carolinah', tip)

  // check balances after gift sent
  console.log('== Gift Sent ==')
  await printBalances(addresses)

  // withdraw funds
  await giftContract.connect(owner).withdrawTips()

  // check balances after withdraw
  console.log('== WithdrawTips ==')
  await printBalances(addresses)

  // Read all the gifts sent to the owner
  console.log("== Gifts ==")
  const gifts = await giftContract.getAllGifts()
  printGifts(gifts)

  // let allGifts = await giftContract.getAllGifts()
  // console.log(allGifts)
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
