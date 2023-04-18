import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'
type Data = { message: string } | IProduct

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res)
    default:
      return res.status(400).json({
        message: 'Bad request',
      })
  }
}
async function getProductBySlug(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect()

  const { slug = 'all' } = req.query

  const product = await Product.findOne({ slug })
    .select('title images inStock price sizes slug title tags type -_id')
    .lean()

  await db.disconnect()

  if (!product) {
    return res.status(404).json({
      message: 'Bad request',
    })
  }

  return res.status(200).json(product)
}
