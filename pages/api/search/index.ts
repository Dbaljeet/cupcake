import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function hanlder(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return res.status(400).json({ message: 'Debe escribir algo en su búsuqeda1' })
}
