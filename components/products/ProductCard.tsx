import { Box, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import { FC, useState, useMemo } from "react"
import { IProduct } from "../../interfaces"
import NextLink from "next/link"

interface Props {
  product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imgLoaded, setImageLoaded] = useState(false)

  const productImage = useMemo(() => {
    return isHovered
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`
  }, [isHovered, product.images])

  return (
    <>
      <Grid
        item
        minWidth={310}
        xs={6}
        sm={4}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <NextLink href='/product/slug' passHref prefetch={false}>
          <CardActionArea>
            <CardMedia
              height='440'
              className='fadeIn'
              component='img'
              image={productImage}
              alt={product.title}
              onLoad={() => setImageLoaded(true)}
            />
          </CardActionArea>
        </NextLink>
        <Box sx={{ mt: 1 , display: imgLoaded? 'block':'none'}} className='fadeIn'>
          <Typography fontWeight={700}>{product.title}</Typography>
          <Typography fontWeight={500}>{`$${product.price}`}</Typography>
        </Box>
      </Grid>
    </>
  )
}
