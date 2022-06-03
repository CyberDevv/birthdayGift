import React from 'react'
import tw from 'twin.macro'
import { Modal } from '.'
import { Button } from '@mui/material'

export interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleOpen: () => void
}

const Navbar = ({ handleOpen }: Props) => {
  return (
    <div tw="flex items-center justify-between py-4 lg:(pt-10 pb-0)">
      <h4 tw="text-xl font-bold tracking-wider z-10 lg:(text-2xl)">
        John James
      </h4>

      <Button
        onClick={handleOpen}
        tw="bg-black text-gray-100 px-6 py-2 z-10 normal-case rounded-full font-medium hover:(bg-[#181818] text-white) tracking-wider lg:(text-base)"
      >
        Send yoaur gift
      </Button>
    </div>
  )
}

export default Navbar
