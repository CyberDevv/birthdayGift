import React from 'react'
import tw from 'twin.macro'
import Head from 'next/head'
import { Navbar, Hero } from '../components'

const App = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const handleOpen: () => void = () => setOpen(true)
  
  return (
    <>
      <Head>
        <title>Happy Birthday</title>
      </Head>

      <div tw="bg-primary max-h-screen">
        <div tw="container mx-auto h-screen px-8 xl:(px-16)">
          <Navbar open={open} setOpen={setOpen} handleOpen={handleOpen} />

          <Hero open={open} setOpen={setOpen} handleOpen={handleOpen} />
        </div>
      </div>
    </>
  )
}

export default App
