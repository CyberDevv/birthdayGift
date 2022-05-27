import React from 'react'
import tw from 'twin.macro'
import Head from 'next/head'
import { Navbar, Hero } from '../components'

const App = () => (
  <>
    <Head>
      <title>Happy Birthday</title>
    </Head>

    <div tw="bg-primary max-h-screen">
      <div tw="container mx-auto h-screen px-8 py-8 lg:(px-16 py-20)">
        <Navbar />

        <Hero />
      </div>
    </div>
  </>
)

export default App
