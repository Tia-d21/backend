import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
import { taskSchema } from "@/lib/validation"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const decoded = verifyToken(req, res)
  if (!decoded) return

  const userId = decoded.userId
  const { id } = req.query

  if (req.method === "PUT") {
    const parsed = taskSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors })
    }

    try {
      const updated = await prisma.task.updateMany({
        where: { id: String(id), userId },
        data: parsed.data,
      })
      return res.status(200).json({ message: "Task updated", updated })
    } catch (err) {
      return res.status(500).json({ error: "Failed to update task" })
    }
  }

  if (req.method === "DELETE") {
    try {
      const deleted = await prisma.task.deleteMany({
        where: { id: String(id), userId },
      })
      return res.status(200).json({ message: "Task deleted", deleted })
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete task" })
    }
  }

  res.status(405).json({ error: "Method not allowed" })
}
