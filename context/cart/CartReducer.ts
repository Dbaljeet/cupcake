import { CartState } from '.'
import { ICartProduct } from '../../interfaces'

type CartActionType =
  | { type: '[Cart] - LoadCart from cookies'; payload: ICartProduct[] }
  | { type: '[Cart] - Update products in cart'; payload: ICartProduct[] }
  | {
      type: '[Cart] - Update quantity products in cart'
      payload: ICartProduct[]
    }

export const CartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies':
      return {
        ...state,
        cart: [...action.payload],
      }

    case '[Cart] - Update products in cart':
      return {
        ...state,
        cart: [...action.payload],
      }

    case '[Cart] - Update quantity products in cart':
      return {
        ...state,
        cart: [...action.payload],
      }

    default:
      return state
  }
}
