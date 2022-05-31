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

import { Modal } from '.'
import happyHolidays from '../public/lottie/happy-holidays.json'

const Hero = () => {
  const options = {
    animationData: happyHolidays,
    loop: true,
    autoplay: true,
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  const { View } = useLottie(options)

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
      </div>

      {/* Modal */}
      <Modal open={open} setOpen={setOpen} />
    </>
  )
}

export default Hero
