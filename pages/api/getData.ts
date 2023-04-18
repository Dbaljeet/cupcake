import type { NextApiRequest, NextApiResponse } from 'next'
import { dbOrders } from '../../database'
import { getSession } from 'next-auth/react'
import { IOrder } from '../../interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IOrder[]>
) {
  const session: any = await getSession({ req })
  const orders = await dbOrders.getOrdersByUser(session.user._id)

  res.status(200).json(orders)
}
