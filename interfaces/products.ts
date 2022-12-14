export interface IProduct {
  _id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: ISize[]
  slug: string
  tags: string[]
  title: string
  type: IType

  createdAt: string
  updatedAt: string
}

export type ISize = 'Pequeño' | 'Mediano' | 'Grande'
export type IType =
  | 'San Valentín'
  | 'Cumpleaños'
  | 'Halloween'
  | 'Sin gluten'
  | 'Sin huevo'
  | 'Rellenos'
  | 'Sin relleno'
