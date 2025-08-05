import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
})

export const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]),
  categoryId: z.string().uuid({ message: "Valid categoryId is required" }),
})
