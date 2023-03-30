import { FC, useContext } from 'react'
import { ProductCart } from './ProductCart'
import { CartContext } from '../../context'
import { ICartProduct } from '../../interfaces'

interface Props {
  editable?: boolean
  products?: ICartProduct[]
}

export const CartList: FC<Props> = ({ editable = false, products = [] }) => {
  let { cart } = useContext(CartContext)
  if (!editable) cart = products
  return (
    <>
      {cart.map((product) => (
        <ProductCart
          key={product.slug + product.size}
          product={product}
          editable={editable}
        />
      ))}
    </>
  )
}
