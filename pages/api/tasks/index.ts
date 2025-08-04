import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const decoded = verifyToken(req, res)
  if (!decoded) return

  if (req.method === 'GET') {
    const { category, status } = req.query

    try {
      const filters: any = {
        userId: decoded.userId,
      }

      if (category) {
        filters.category = {
          name: category as string
        }
      }

      if (status === 'completed') {
        filters.completed = true
      } else if (status === 'pending') {
        filters.completed = false
      }

      const tasks = await prisma.task.findMany({
        where: filters,
        include: {
          category: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return res.status(200).json(tasks)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Failed to fetch tasks' })
    }
  }

  res.status(405).json({ message: 'Method not allowed' })
}
