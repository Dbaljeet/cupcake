import { useContext } from 'react'
import { ProductCart } from './ProductCart'
import { CartContext } from '../../context'

interface Props {
  editable?: boolean
}

export const CartList = ({ editable = false }) => {
  const { cart } = useContext(CartContext)

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
