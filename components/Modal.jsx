import React from 'react'
import tw from 'twin.macro'
import { ethers } from 'ethers'
import Lottie from 'lottie-react'
import { toast } from 'react-toastify'
import { LoadingButton as Button } from '@mui/lab'
import { Dialog, InputAdornment, SvgIcon, TextField } from '@mui/material'

import abi from '../utils/sendGift.json'
import gift from '../public/lottie/gift.json'

const Modal = ({ setOpen, open, currentAccount, setCurrentAccount }) => {
  const [message, setMessage] = React.useState('')
  const [name, setName] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  const contranctABI = abi.abi

  // console.log(contractAddress)

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

  // handle send gift
  const sendGift = async () => {
    setIsLoading(true)

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

        const txn = await giftMeContract.sendGift(
          message ? message : 'Happy Birthday Default!',
          name ? name : 'Anonymous Default',
          amount ? ethers.utils.parseEther(amount) : 0,
          {
            value: ethers.utils.parseEther(amount ? amount : '0'),
          },
        )

        console.log('Mining...', txn.hash)
        const giftToast = toast.loading('Please wait...your gift is being sent')

        await txn.wait()
        console.log('Mined -- ', txn.hash)
        toast.update(giftToast, {
          render: 'Your gift has been sent! 🎉',
          type: 'success',
          isLoading: false,
          autoClose: true,
          closeButton: true,
        })
        setIsLoading(false)

        // clear inputs
        setName('')
        setMessage('')
        setAmount('')
      } else {
        setIsLoading(false)
        toast.error('No web3? You should consider trying MetaMask!')
      }
    } catch (error) {
      setIsLoading(false)

      if (error.code === 4001) {
        toast.error('Transaction was cancelled')
        return
      }

      console.log(error)
      toast.error(error.reason)
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{ '& .MuiDialog-paper': { borderRadius: '20px' } }}
    >
      <div tw="w-[400px] bg-white">
        <div tw="bg-pink-300 w-full">
          <Lottie animationData={gift} />
        </div>

        {/* UI to shaow when account is linked */}
        {currentAccount && (
          <div tw="p-8">
            <h1 tw="text-xl font-bold tracking-wide text-center">
              Send your gift
            </h1>

            <div tw="mt-8 space-y-6 flex flex-col items-center">
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                variant="standard"
                fullWidth
                type="text"
                disabled={isLoading}
              />

              <TextField
                label="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                variant="standard"
                fullWidth
                type="text"
                disabled={isLoading}
              />

              <TextField
                label="Send me ether"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                variant="standard"
                fullWidth
                disabled={isLoading}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        // xmlns="http://www.w3.org/2000/svg"
                        // xmlnsXlink="http://www.w3.org/1999/xlink"
                        // xmlnsXodm="http://www.corel.com/coreldraw/odm/2003"
                        xmlSpace="preserve"
                        width="100%"
                        height="100%"
                        version="1.1"
                        shapeRendering="geometricPrecision"
                        textRendering="geometricPrecision"
                        imageRendering="optimizeQuality"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        viewBox="0 0 784.37 1277.39"
                      >
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer" />
                          <g id="_1421394342400">
                            <g>
                              <polygon
                                fill="#343434"
                                fillRule="nonzero"
                                points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                              />
                              <polygon
                                fill="#8C8C8C"
                                fillRule="nonzero"
                                points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                              />
                              <polygon
                                fill="#3C3C3B"
                                fillRule="nonzero"
                                points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                              />
                              <polygon
                                fill="#8C8C8C"
                                fillRule="nonzero"
                                points="392.07,1277.38 392.07,956.52 -0,724.89 "
                              />
                              <polygon
                                fill="#141414"
                                fillRule="nonzero"
                                points="392.07,882.29 784.13,650.54 392.07,472.33 "
                              />
                              <polygon
                                fill="#393939"
                                fillRule="nonzero"
                                points="0,650.54 392.07,882.29 392.07,472.33 "
                              />
                            </g>
                          </g>
                        </g>
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                tw="normal-case bg-black fill-current stroke-current text-white hover:(bg-[#181818])"
                onClick={sendGift}
                loading={isLoading}
              >
                Send
              </Button>
            </div>
          </div>
        )}

        {/* UI to connect wallet */}
        {!currentAccount && (
          <div tw="p-8">
            <h1 tw="text-xl font-bold tracking-wide text-center">
              Connect your wallet
            </h1>

            <div tw="mt-8 space-y-6 flex flex-col items-center">
              <Button
                tw="normal-case bg-black text-white hover:(bg-[#181818])"
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
