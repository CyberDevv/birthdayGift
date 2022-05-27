import React from 'react'
import tw from 'twin.macro'

const Navbar = () => {
  return (
    <div tw="flex items-center justify-between ">
      <h4 tw="text-2xl font-bold tracking-wider z-10">John James</h4>

      <div tw="lg:(flex items-center space-x-4)  z-10">
        <button tw="bg-black text-gray-100 px-6 py-2 rounded-full transition-colors duration-300 font-medium hover:(bg-gray-900 text-white)">
          Send your gift
        </button>
        <button tw="bg-black text-gray-100 px-6 py-2 rounded-full transition-colors duration-300 font-medium hover:(bg-gray-900 text-white) hidden lg:(block)">
          Send your message
        </button>
      </div>
    </div>
  )
}

export default Navbar
