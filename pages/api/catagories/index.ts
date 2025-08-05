import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { categorySchema } from '@/utils/validation'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Categories route working ✅" })
  if (req.method === 'GET') {
    try {
      const categories = await prisma.category.findMany()
      return res.status(200).json(categories)
    } catch (err) {
      return res.status(500).json({ message: 'Failed to fetch categories' })
    }
  }

  if (req.method === 'POST') {
    const decoded = verifyToken(req, res)
    if (!decoded) return

    const parsed = categorySchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues })
    }

    try {
      const category = await prisma.category.create({
        data: { name: parsed.data.name }
      })
      return res.status(201).json(category)
    } catch (err) {
      return res.status(500).json({ message: 'Failed to create category' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
