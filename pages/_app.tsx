import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import { UiProvider } from '../context'
import { SWRConfig } from 'swr'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
        value={{
          //refreshInterval: 3000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
    <UiProvider>
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UiProvider>
    </SWRConfig>
  )
}

export default MyApp
