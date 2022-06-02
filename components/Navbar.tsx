import React from 'react'
import tw from 'twin.macro'
import { Modal } from '.'
import { Button } from '@mui/material'

export interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleOpen: () => void
}

const Navbar = ({ open, setOpen, handleOpen }: Props) => {
  return (
    <div tw="flex items-center justify-between ">
      <h4 tw="text-2xl font-bold tracking-wider z-10">John James</h4>

      <Button
        onClick={handleOpen}
        tw="bg-black text-gray-100 px-6 py-2 z-10 normal-case text-base rounded-full font-medium hover:(bg-[#181818] text-white) tracking-wider"
      >
        Send yoaur gift
      </Button>
    </div>
  )
}

export default Navbar
