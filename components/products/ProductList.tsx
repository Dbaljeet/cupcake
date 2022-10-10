import { Grid } from "@mui/material"
import { FC } from "react"
import { IProduct } from "../../interfaces"
import { ProductCard } from "."
interface Props {
  products: IProduct[]
}
export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4} justifyContent='center'>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Grid>
  )
}
