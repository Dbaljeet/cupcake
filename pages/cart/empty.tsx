import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Typography, Link } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'
export default function Empty() {
  return (
    <ShopLayout
      title={'Carro vacío'}
      pageDescription={'No hay productos en el carro'}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' alignItems='center'>
          <Typography variant='h1' component='h1' fontSize={100}>
            Carro vacio|
          </Typography>
          <div>
            <Typography variant='h2' component='h2'>
              No ha agregado productos
            </Typography>
            <NextLink href='/'>
              <Link className='pointer' typography='h5' color='secondary'>
                Volver a la página principal
              </Link>
            </NextLink>
          </div>
        </Box>
      </Box>
    </ShopLayout>
  )
}
