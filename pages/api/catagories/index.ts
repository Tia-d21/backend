// pages/api/categories/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const categories = await prisma.category.findMany()
      return res.status(200).json(categories)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Failed to fetch categories' })
    }
  } else if (req.method === 'POST') {
    const decoded = verifyToken(req, res)
    if (!decoded) return

    const { name } = req.body
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' })
    }

    try {
      const newCategory = await prisma.category.create({ data: { name } })
      return res.status(201).json(newCategory)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Failed to create category' })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
