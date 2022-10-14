import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import { UiProvider } from '../context'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UiProvider>
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UiProvider>
  )
}

export default MyApp
