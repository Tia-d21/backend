import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/utils/validation'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues })

  }

  const { email, password } = parsed.data

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    })

    return res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email } })
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}
