// lib/auth.ts
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret'

export function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(req: NextApiRequest, res: NextApiResponse): any {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ message: 'Missing Authorization header' })
    return null
  }

  const token = authHeader.split(' ')[1]
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
    return null
  }
}
