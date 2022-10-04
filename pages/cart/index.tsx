import { Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
export default function Cart() {
  return (
    <>
      <ShopLayout
        title={'Carro (n)'}
        pageDescription={'Verifique su carro y finalice su compra'}
      >
        <Typography variant='h1' component='h1'>
          Carro
        </Typography>
      </ShopLayout>
    </>
  )
}
