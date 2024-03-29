import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { IPaypal } from '../../../interfaces'
import { db } from '../../../database'
import { Order } from '../../../models'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const body = new URLSearchParams('grant_type=client_credentials')
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64')
  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    return data.access_token
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data)
    } else {
      console.log(err)
    }
    return null
  }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const bearerToken = await getBearerToken()
  if (!bearerToken) return res.status(400).json({ message: 'Error token' })
  //
  const { transactionId = '', orderId = '' } = req.body
  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }
  )

  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: 'Orden no reconocida' })
  }

  await db.connect()
  const dbOrder = await Order.findById(orderId)

  if (!dbOrder) {
    await db.disconnect()
    return res
      .status(400)
      .json({ message: 'Orden no existe en nuestra base de datos' })
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect()
    return res
      .status(400)
      .json({ message: 'Los montos (Paypal y orden) no coinciden' })
  }

  //guardamos estado transacción completada
  dbOrder.transactionId = transactionId
  dbOrder.isPaid = true
  await dbOrder.save()
  await db.disconnect()

  return res.status(200).json({ message: bearerToken })
}
