import { Box, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'

export default function Address() {
  return (
    <ShopLayout
      title={'Dirección envío'}
      pageDescription={'No hay nada que mostrar aquí'}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <Typography variant="h1" component="h1" fontSize={100}>
          Agregue su dirección para el envío|
        </Typography>
      </Box>
    </ShopLayout>
  )
}
