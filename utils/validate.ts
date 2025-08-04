// utils/validate.ts
import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  status: z.enum(['pending', 'completed']),
  categoryId: z.string().optional(),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
})
