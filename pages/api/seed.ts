import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDataBase } from '../../database'
import { Order, Product, User } from '../../models'
type Data = { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV === 'production') {
    return res
      .status(401)
      .json({ message: 'Authorization error, no tiene acceso' })
  }

  await db.connect()

  await Product.deleteMany()
  await Product.insertMany(seedDataBase.initialData.products)

  await User.deleteMany()

  await Order.deleteMany()

  await db.disconnect()

  res.status(200).json({ message: 'Todo ok' })
}
