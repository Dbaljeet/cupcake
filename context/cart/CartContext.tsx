import { createContext } from 'react'
import { ICartProduct, ShippingAddress } from '../../interfaces'
interface ContextProps {
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number

  shippingAddress?: ShippingAddress

  addProductToCart: (product: ICartProduct) => void
  updateQuantityProduct: (product: ICartProduct, quantity: number) => void
  deleteProduct: (product: ICartProduct) => void

  updateAddress: (address: ShippingAddress) => void
}

export const CartContext = createContext({} as ContextProps)
