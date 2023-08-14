import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { IProduct } from '../../../../interfaces'
import { Product } from '../../../../models'
type Data = { message: string } | IProduct[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getSearchProducts(req, res)
    default:
      return res.status(400).json({
        message: 'Bad request',
      })
  }
}
async function getSearchProducts(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { q = '' } = req.query

  console.log(q)
  if (q.length === 0) {
    return res
      .status(400)
      .json({ message: 'Debe escribir algo en su búsuqeda' })
  }

  q = q.toString().toLocaleLowerCase()

  await db.connect()

  const products = await Product.find({ $text: { $search: `\"${q}\"` } })
    .select('title images inStock price sizes slug title tags type -_id')
    .lean()

  await db.disconnect()

  return res.status(200).json(products)
}
