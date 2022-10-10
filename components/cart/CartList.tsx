import {
  Link,
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Box,
  Button,
} from '@mui/material'
import { initialData } from '../../database/products'
import NextLink from 'next/link'
import { FC } from 'react'
import { ItemCounter } from '../ui'
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
]
interface Props {
  editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href='/product/slug'>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`products/${product.images[0]}`}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Tallas: {product.sizes.map((size) => size + ' ')}
              </Typography>
              {editable ? (
                <ItemCounter limit={product.inStock} />
              ) : (
                <Typography variant='h5'>3 items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display='flex'
            alignItems='center'
            flexDirection='column'
          >
            <Typography>{`$${product.price} c/u`}</Typography>
            {editable && (
              <Button variant='text' color='secondary'>
                Eliminar
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
