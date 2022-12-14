import type { NextPage } from 'next'
import { Box, Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
//import { initialData } from '../database/products'
import { useProducts } from '../hooks'
import { Loading } from '../components/ui'

const Home: NextPage = () => {
  const { products, isLoading, isError } = useProducts('/products')

  if (isError) return <div>Failed to load</div>

  return (
      <ShopLayout
        title={'Cupcake La Serena'}
        pageDescription={'Encuentra los mejores cupcakes de la cuarta región'}
      >
        <Box sx={{padding:2}}>
        <Typography variant='h1' component='h1'>
          Cupcake
        </Typography>
        <Typography variant='h2'>
          Productos
        </Typography>
        </Box>

        {isLoading ? <Loading/> : <ProductList products={products} />}
      
      </ShopLayout>
  )
}

export default Home
