import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material"
import { NextPage } from "next"
import { ShopLayout } from "../../components/layouts"
import { initialData } from "../../database/products"
import { ItemCounter } from "../../components/ui"
import { SizeSelector } from "../../components/products"
import { useState } from "react"
const product = initialData.products[0]

const Slug: NextPage = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  return (
    <>
      <ShopLayout title={product.title} pageDescription={product.description}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <CardActionArea>
              <CardMedia
                height='1000'
                className='fadeIn'
                component='img'
                image={`../products/${product.images[0]}`}
                alt={product.title}
              />
            </CardActionArea>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h1' component='h1'>
                {product.title}
              </Typography>
              <Typography variant='subtitle2'>{`$${product.price}`}</Typography>
              <Box sx={{ my: 2 }}>
                <Typography variant='subtitle2'>
                  {`Cantidad máxima que puede pedir: ${product.inStock}`}
                </Typography>
                <ItemCounter limit={product.inStock} />
                <SizeSelector
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  sizes={product.sizes}
                />
              </Box>
              <Button color='secondary' className='circular-btn'>
                Agregar compra
              </Button>
              {/*<Chip label='No hay productos' color='error' variant='outlined' />*/}
              <Box sx={{ mt: 3 }}>
                <Typography variant='subtitle2'>Descripción</Typography>
                <Typography variant='subtitle2'>
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
export default Slug
