import { ISize, IType } from './products'

export interface ICartProduct {
  _id: string
  image: string
  inStock: number
  price: number
  size: ISize
  slug: string
  title: string
  type: IType
  quantity: number
}
