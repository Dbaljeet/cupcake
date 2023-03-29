import { ICartProduct } from './cart'
import { ShippingAddress } from './ShippingAddress'
import { IUser } from './user'

export interface IOrder {
  _id?: string
  user?: IUser | string
  orderItems: ICartProduct[]
  shippingAddress: ShippingAddress
  paymentResult?: string

  numberOfItems: number
  subTotal: number
  tax: number
  total: number

  isPaid: boolean
  paidAt?: string

  transactionId?: string

  createdAt?: string
  updatedAt?: string
}
