import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { initialData } from '../database/products'
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ShopLayout
        title={'Cupcake La Serena'}
        pageDescription={'Encuentra los mejores cupcakes de la cuarta región'}
      >
        <Typography variant='h1' component='h1'>
          Cupcake
        </Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>
          Productos
        </Typography>

        <ProductList products={initialData.products as any} />
      </ShopLayout>
    </div>
  )
}

export default Home
