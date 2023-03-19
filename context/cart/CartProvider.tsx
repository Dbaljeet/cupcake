import { FC, useEffect, useReducer, useRef } from 'react'
import { ICartProduct } from '../../interfaces'
import { CartContext, CartReducer } from './index'
import Cookie from 'js-cookie'

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
  const firstTimeLoad = useRef(true)

  useEffect(() => {
    if (firstTimeLoad.current) {
      firstTimeLoad.current = false
      try {
        const cookieCart = Cookie.get('cart')
          ? JSON.parse(Cookie.get('cart')!)
          : []
        dispatch({
          type: '[Cart] - LoadCart from cookies',
          payload: cookieCart,
        })
      } catch (err) {
        dispatch({
          type: '[Cart] - LoadCart from cookies',
          payload: [],
        })
      }
    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

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

  const updateQuantityProduct = (product: ICartProduct, quantity: number) => {
    const PRODUCTS = state.cart.map((productAux) => {
      if (productAux._id !== product._id) return productAux
      if (productAux.size !== product.size) return productAux
      productAux.quantity = quantity
      return productAux
    })
    dispatch({
      type: '[Cart] - Update quantity products in cart',
      payload: PRODUCTS,
    })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProductToCart,
        updateQuantityProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
