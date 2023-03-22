import { Box, Button, Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'

export default function Login() {
  return (
    <ShopLayout
      title={'Iniciar sesión'}
      pageDescription={
        'Inicia sesión para comprar los mejores cupcakes de la cuarta región'
      }
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h1" component="h1" fontSize={100}>
            Iniciar sesión
          </Typography>
          <Button>Ingresar con</Button>
        </Box>
      </Box>
    </ShopLayout>
  )
}
