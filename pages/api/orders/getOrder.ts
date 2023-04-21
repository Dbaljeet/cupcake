import type { NextApiRequest, NextApiResponse } from 'next'
import { dbOrders } from '../../../database'
import { getSession } from 'next-auth/react'
import { IOrder } from '../../../interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IOrder>
) {
  const { orderId } = req.body
  const session: any = await getSession({ req })
  const order = await dbOrders.getOrderById(orderId)

  if (!order) {
    return res.status(400).json({
      _id: 'error',
      user: '',
      orderItems: [],
      shippingAddress: {
        firstName: '',
        lastName: '',
        zone: '',
        address: '',
        phone: '',
      },
      paymentResult: '',
      numberOfItems: 0,
      subTotal: 0,
      tax: 0,
      total: 0,
      isPaid: false,
      transactionId: '',

      createdAt: '',
      updatedAt: '',
    })
  }

  if (order.user !== session.user._id) {
    return res.status(401).json({
      _id: 'error',
      user: '',
      orderItems: [],
      shippingAddress: {
        firstName: '',
        lastName: '',
        zone: '',
        address: '',
        phone: '',
      },
      paymentResult: '',
      numberOfItems: 0,
      subTotal: 0,
      tax: 0,
      total: 0,
      isPaid: false,
      transactionId: '',

      createdAt: '',
      updatedAt: '',
    })
  }

  res.status(200).json(order)
}
