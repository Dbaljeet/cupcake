import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'
type Data = { message: string } | IProduct[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)
    default:
      return res.status(400).json({
        message: 'Bad request',
      })
  }
}
async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect()

  const { type = 'all' } = req.query

  let condition = {}

  if (type != 'all' && SHOP_CONSTANTS.TYPES.includes(`${type}`)) {
    condition = { type }
  }

  const products = await Product.find(condition)
    .select('title images inStock price sizes slug title tags type -_id')
    .lean()

  await db.disconnect()

  return res.status(200).json(products)
}
