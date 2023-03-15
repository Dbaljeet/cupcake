import { FC, useReducer } from 'react'
import { ICartProduct } from '../../interfaces'
import { CartContext, CartReducer } from './index'

export interface CartState {
  cart: ICartProduct[]
}

const CART_INITIAL_STATE = {
  cart: [],
}

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE)

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id)
    if (!productInCart)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      })

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    )
    if (!productInCartButDifferentSize)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      })

    // Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p

      // Actualizar la cantidad
      p.quantity += product.quantity
      return p
    })

    dispatch({
      type: '[Cart] - Update products in cart',
      payload: updatedProducts,
    })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}