import { cache } from '@emotion/css'
import type { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react'
import GlobalStyles from './../styles/GlobalStyles'

const App = ({ Component, pageProps }: AppProps) => {
  const AnyComponent = Component as any
  return (
    <CacheProvider value={cache}>
      <GlobalStyles />
      <AnyComponent {...pageProps} />
    </CacheProvider>
  )
}

export default App
