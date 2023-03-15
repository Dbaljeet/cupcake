import {
  Box,
  Button,
  Grid,
  Typography,
  CardActionArea,
  CardMedia,
  Chip,
} from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ItemCounter } from '../../components/ui'
import { SizeSelector } from '../../components/products'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { dbProducts } from '../../database'
import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { CartContext } from '../../context'

interface Props {
  product: IProduct
}

const Slug: NextPage<Props> = ({ product }) => {
  const router = useRouter()
  const [selectedCount, setSelectedCount] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    inStock: product.inStock,
    price: product.price,
    size: 'Pequeño',
    slug: product.slug,
    title: product.title,
    type: product.type,
    quantity: 1,
  })

  const updateSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }))
  }

  useEffect(() => {
    updateSize(selectedSize)
    onUpdateQuantity(selectedCount)
  }, [selectedSize, selectedCount])

  const handleCart = () => {
    addProductToCart(tempCartProduct)
    //router.push('/cart')
  }
  return (
    <>
      <ShopLayout title={product.title} pageDescription={product.description}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <CardActionArea>
              {product.inStock < 1 && (
                <Chip
                  label="No quedan disponibles"
                  sx={{
                    position: 'absolute',
                    zIndex: 3,
                    top: '10px',
                    left: '10px',
                    backgroundColor: '#F7F9F9',
                  }}
                />
              )}
              <CardMedia
                height="1000"
                className="fadeIn"
                component="img"
                image={`../products/${product.images[0]}`}
                alt={product.title}
              />
            </CardActionArea>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h1" component="h1">
                {product.title}
              </Typography>
              <Typography variant="subtitle2">{`$${product.price}`}</Typography>
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle2">
                  {`Cantidad máxima que puede pedir: ${product.inStock}`}
                </Typography>
                <ItemCounter
                  limit={product.inStock}
                  selectedCount={selectedCount}
                  setSelectedCount={setSelectedCount}
                />
                <SizeSelector
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  sizes={product.sizes}
                />
              </Box>
              <Button
                disabled={product.inStock === 0}
                onClick={() => handleCart()}
                color="secondary"
                className="circular-btn"
              >
                Agregar compra
              </Button>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2">Descripción</Typography>
                <Typography variant="subtitle2">
                  {product.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ShopLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)
  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default Slug
