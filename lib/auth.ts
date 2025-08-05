import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "yourSuperSecretKey123!"

export function verifyToken(req: NextApiRequest, res: NextApiResponse): any {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" })
    return null
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" })
    return null
  }
}
