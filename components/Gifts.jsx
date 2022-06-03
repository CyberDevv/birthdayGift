import React from 'react'
import tw from 'twin.macro'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { Dialog } from '@mui/material'
import { LoadingButton as Button } from '@mui/lab'

import abi from '../utils/sendGift.json'

const Modal = ({ setOpen, open, currentAccount, setCurrentAccount }) => {
  const [gifts, setGifts] = React.useState([])

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  const contranctABI = abi.abi

  const handleClose = () => setOpen(false)

  // connect wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        toast.error('No web3? You should consider trying MetaMask!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      // const accounts = await ethereum.enable()
      setCurrentAccount(accounts[0])
      toast.success('Wallet Connected!')
    } catch (error) {
      console.log(error)
      toast.error('An error occured!')
    }
  }

  React.useEffect(() => {
    const getAllGifts = async () => {
      try {
        const { ethereum } = window

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const giftMeContract = new ethers.Contract(
            contractAddress,
            contranctABI,
            signer,
          )

          console.log('fetching gifts from the blockchain..')
          const gifts = await giftMeContract.getAllGifts()

          console.log('fetched!')
          setGifts(gifts)
        } else {
          console.log('Metamask is not connected')
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAllGifts()

    let giftMeContract

    // Create an event handler function for when someone sends
    // us a new gift.
    const onNewGift = (from, timestamp, name, message, amount) => {
      // console.log('Gift received: ', from, timestamp, name, message, amount)
      setGifts(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name,
          amount,
        },
      ])
    }

    const { ethereum } = window

    // Listen for new gift events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, 'any')
      const signer = provider.getSigner()
      giftMeContract = new ethers.Contract(
        contractAddress,
        contranctABI,
        signer,
      )

      giftMeContract.on('NewGift', onNewGift)
    }

    return () => {
      if (giftMeContract) {
        giftMeContract.off('NewGift', onNewGift)
      }
    }
  }, [contractAddress, contranctABI])

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{ '& .MuiDialog-paper': { borderRadius: '20px' } }}
    >
      <div tw=" w-[320px] sm:(w-[420px]) bg-[#1d1f20] text-white overflow-x-hidden max-h-[calc(100vh - 20px)] overflow-y-auto lg:(max-h-[calc(100vh - 40px)]) xl:(max-h-[calc(100vh - 80px)])">
        {/* UI to shaow when account is linked */}
        {currentAccount && (
          <div tw="py-10 px-5">
            <h2 tw="text-center">All Birthday Gifts 🎁</h2>

            <div tw="space-y-8 mt-8">
              {gifts.length === 0 && (
                <div tw="text-center">
                  <h3>No gifts yet!</h3>
                </div>
              )}

              {gifts.length > 0 &&
                gifts.map((gift, index) => {
                  return (
                    <div className="quote" key={index}>
                      <div tw=" border border-[#f1c40f] text-center relative p-4">
                        <div className="corner " id="left_top"></div>
                        <div className="corner" id="left_bottom"></div>
                        <div className="corner" id="right_top"></div>
                        <div className="corner" id="right_bottom"></div>
                        <span className="span">{gift.name}</span>
                        <blockquote tw="font-medium tracking-wide">
                          <i>&ldquo;{gift.message}&rdquo; </i>
                        </blockquote>
                        <span tw="flex justify-end mt-3">
                          =&gt; ⟠ {ethers.utils.formatEther(gift.amount)}
                        </span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* UI to connect wallet */}
        {!currentAccount && (
          <div tw="p-8 text-white">
            <h1 tw="text-xl font-bold tracking-wide text-center">
              Connect your wallet
            </h1>

            <div tw="mt-8 space-y-6 flex flex-col items-center">
              <Button
                tw="normal-case bg-white text-black hover:(bg-[#dddddd])"
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
}

export default Modal
