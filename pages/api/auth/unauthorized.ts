import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    default:
      return res.status(400).json({ message: 'No autorizado' })
  }
}
