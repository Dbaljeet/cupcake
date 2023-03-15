import { Box, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { Loading } from '../../components/ui'
import { useProducts } from '../../hooks'
import { useRouter } from 'next/router'

export default function SearchProduct() {
  const router = useRouter()
  const { id } = router.query

  const { products, isLoading, isError } = useProducts(`/search/${id}`)
  return (
    <>
      <ShopLayout
        title={`Cupcake La Serena | ${id}`}
        pageDescription={'Encuentra los mejores cupcakes de la cuarta región'}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h1" component="h1">
            Cupcake
          </Typography>
          <Typography variant="h2">Productos | {id}</Typography>
        </Box>

        {isLoading ? (
          <Loading />
        ) : products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <Typography>No se encontraron productos</Typography>
        )}
      </ShopLayout>
    </>
  )
}
