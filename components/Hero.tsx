import React from 'react'
import tw from 'twin.macro'
import Image from 'next/image'
import { useLottie } from 'lottie-react'
import {
  Button,
  Dialog,
  InputAdornment,
  SvgIcon,
  TextField,
} from '@mui/material'

import gift from '../public/lottie/gift.json'
import happyHolidays from '../public/lottie/happy-holidays.json'

const Hero = () => {
  const options = {
    animationData: happyHolidays,
    loop: true,
    autoplay: true,
  }

  const options2 = {
    animationData: gift,
    loop: true,
    autoplay: true,
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { View } = useLottie(options)
  const { View: view2 } = useLottie(options2)

  return (
    <>
      <div tw="mt-20 text-center lg:(text-left flex items-center justify-between space-x-4 h-[calc(100vh - 280px)])">
        <div tw="z-10">
          <h1 tw="text-4xl font-bold lg:(text-6xl)">
            It&apos;s my Birthday!!!
          </h1>
          <p tw="text-gray-700 text-lg mt-4 lg:(text-xl mt-8 leading-8) ">
            Two decades minus a year.
            <br /> I was born somewhere on the earth. <br />
            Say something nice, make me smile, I deserve it.
          </p>

          <Button
            onClick={handleOpen}
            tw="mt-8 bg-black text-gray-100 px-6 py-2 normal-case text-base rounded-full font-medium hover:(bg-[#181818] text-white) tracking-wider lg:(mt-16 px-12 py-4)"
          >
            Send your gift
          </Button>
        </div>

        {/* image */}
        <div tw="mt-16 lg:(mt-0)">
          <Image
            src="/svg/birthday_cake.svg"
            alt="dief"
            height={500.90726}
            width={827.13}
          />
          <div tw="absolute -bottom-20 zIndex[1] -left-14 lg:(-bottom-60 -left-40)">
            {View}
          </div>
        </div>
        {view2}
      </div>

      {/* Modal */}
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{ '& .MuiDialog-paper': { borderRadius: '20px' } }}
      >
        <div tw="w-[400px] bg-white">
          <div tw="bg-pink-300 w-full">{view2}</div>

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
        </div>
      </Dialog>
    </>
  )
}

export default Hero
