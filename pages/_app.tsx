import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import { CartProvider, UiProvider } from '../context'
import { SWRConfig } from 'swr'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../context/auth'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <SWRConfig
          value={{
            //refreshInterval: 3000,
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </SWRConfig>
      </AuthProvider>
    </SessionProvider>
  )
}

export default MyApp
