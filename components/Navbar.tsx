import React from 'react'
import tw from 'twin.macro'
import { Button } from '@mui/material'

const Navbar = () => {
  return (
    <div tw="flex items-center justify-between ">
      <h4 tw="text-2xl font-bold tracking-wider z-10">John James</h4>

      <button tw="bg-black text-gray-100 px-6 py-2 z-10 rounded-full font-medium hover:(bg-[#181818] text-white)">
        Send your gift
      </button>
    </div>
  )
}

export default Navbar
