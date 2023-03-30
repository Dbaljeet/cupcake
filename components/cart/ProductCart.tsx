import {
  Link,
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Box,
  Button,
} from '@mui/material'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import NextLink from 'next/link'

import { ICartProduct } from '../../interfaces'
import ItemCounter from '../ui/itemCounter'
import { CartContext } from '../../context'

interface Props {
  product?: ICartProduct
  editable?: boolean
}

export const ProductCart: FC<Props> = ({ product, editable }) => {
  const firstTimeLoad = useRef(true)
  const [selectedCount, setSelectedCount] = useState(1)
  const { updateQuantityProduct, deleteProduct } = useContext(CartContext)

  useEffect(() => {
    if (firstTimeLoad.current && product) {
      firstTimeLoad.current = false
      setSelectedCount(product.quantity)
    }
  }, [])

  useEffect(() => {
    if (product) {
      updateQuantityProduct(product, selectedCount)
    }
  }, [selectedCount])

  return product ? (
    <Grid container spacing={2} key={product._id} sx={{ mb: 1 }}>
      <Grid item xs={3}>
        <NextLink href={`/product/${product.slug}`}>
          <Link>
            <CardActionArea>
              <CardMedia
                image={`/products/${product.image}`}
                component="img"
                sx={{ borderRadius: '5px' }}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Grid>
      <Grid item xs={7}>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{product.title}</Typography>
          <Typography variant="body1">Tamaño: {product.size + ' '}</Typography>
          {editable ? (
            <ItemCounter
              limit={product.inStock}
              selectedCount={selectedCount}
              setSelectedCount={setSelectedCount}
            />
          ) : (
            <Typography variant="h5">3 items</Typography>
          )}
        </Box>
      </Grid>
      <Grid
        item
        xs={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Typography>{`$${product.price} c/u`}</Typography>
        {editable && (
          <Button
            variant="text"
            color="secondary"
            onClick={() => deleteProduct(product)}
          >
            Eliminar
          </Button>
        )}
      </Grid>
    </Grid>
  ) : (
    <></>
  )
}
