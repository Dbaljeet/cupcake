import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import { CartProvider, UiProvider } from '../context'
import { SWRConfig } from 'swr'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../context/auth'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
        }}
      >
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
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
