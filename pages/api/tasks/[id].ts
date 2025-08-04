// pages/api/tasks/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, description, categoryId } = req.body;

    try {
      const updatedTask = await prisma.task.update({
        where: { id: String(id), userId: token.sub },
        data: { title, description, categoryId },
      });
      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to update task' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.task.delete({
        where: { id: String(id), userId: token.sub },
      });
      return res.status(204).end(); // No content
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to delete task' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
