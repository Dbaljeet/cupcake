import { CartState } from '.'
import { ICartProduct, IOrderSummary, ShippingAddress } from '../../interfaces'

type CartActionType =
  | { type: '[Cart] - LoadCart from cookies'; payload: ICartProduct[] }
  | { type: '[Cart] - Update products in cart'; payload: ICartProduct[] }
  | {
      type: '[Cart] - Update quantity products in cart'
      payload: ICartProduct[]
    }
  | {
      type: '[Cart] - Delete product in cart'
      payload: ICartProduct
    }
  | {
      type: '[Cart] - Update order summary'
      payload: IOrderSummary
    }
  | { type: '[Cart] - Update Address'; payload: ShippingAddress }

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
    case '[Cart] - Delete product in cart':
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      }
    case '[Cart] - Update order summary':
      return {
        ...state,
        ...action.payload,
      }
    case '[Cart] - Update Address':
    default:
      return state
  }
}
