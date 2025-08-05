import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { taskSchema } from '@/utils/validation'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const decoded = verifyToken(req, res)
  if (!decoded) return

  if (req.method === 'GET') {
    const { status, category } = req.query

    try {
      const tasks = await prisma.task.findMany({
        where: {
          userId: decoded.userId,
          ...(status && typeof status === 'string' ? { status } : {}),
          ...(category && typeof category === 'string'
            ? {
                category: {
                  name: {
                    equals: category,
                    mode: 'insensitive'
                  }
                }
              }
            : {})
        },
        include: {
          category: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return res.status(200).json(tasks)
    } catch (err) {
      return res.status(500).json({ message: 'Failed to fetch tasks' })
    }
  }

  if (req.method === 'POST') {
    const parsed = taskSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues })
    }

    const { title, description, status, categoryId } = parsed.data

    try {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          status,
          categoryId,
          userId: decoded.userId
        }
      })

      return res.status(201).json(task)
    } catch (err) {
      return res.status(500).json({ message: 'Failed to create task' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
