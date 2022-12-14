import mongoose, { Schema, model, Model } from 'mongoose'
import { IProduct } from '../interfaces'

const productSchema = new Schema(
  {
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        required: true,
        enum: {
          values: ['Pequeño', 'Mediano', 'Grande'],
          message: '{VALUE} no es un tamaño válido',
        },
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String, required: true }],
    title: { type: String, default: 'Sin titulo' },
    type: {
      type: String,
      required: true,
      enum: {
        values: [
          'San Valentín',
          'Cumpleaños',
          'Halloween',
          'Sin gluten',
          'Sin huevo',
          'Rellenos',
          'Sin relleno',
        ],
        message: '{VALUE} no es un tipo válido',
      },
    },
  },
  {
    timestamps: true,
  }
)

productSchema.index({ title: 'text', tags: 'text', type: 'text' })

const Product: Model<IProduct> =
  mongoose.models.Product || model('Product', productSchema)

export default Product
