import React from 'react'
import tw from 'twin.macro'
import Image from 'next/image'
import Lottie, { useLottie } from 'lottie-react'
import {
  Button,
  Dialog,
  InputAdornment,
  SvgIcon,
  TextField,
} from '@mui/material'

import gift from '../public/lottie/gift.json'

const Modal = ({ setOpen, open }) => {
  const [currentAccount, setCurrentAccount] = React.useState('')

  const handleClose = () => setOpen(false)

  // check if wallet is connected
  const checkWalletIsConnected = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('No web3? You should consider trying MetaMask!')
        return
      }

      // check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        setCurrentAccount(account)
      } else {
        console.log('No authorized account found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // connect wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('No web3? You should consider trying MetaMask!')
        return
      }

      // const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      const accounts = await ethereum.enable()
      setCurrentAccount(accounts[0])
      
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    checkWalletIsConnected()
  }, [])

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
              <TextField label="Message" variant="standard" fullWidth />

              <TextField
                label="Send me ether"
                variant="standard"
                fullWidth
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

              <Button tw="normal-case bg-black text-white hover:(bg-[#181818])">
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
