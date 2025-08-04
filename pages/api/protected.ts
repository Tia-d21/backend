import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = verifyToken(req, res);

  if (!user) return; // Already handled error in middleware

  res.status(200).json({
    message: "You are authenticated!",
    user,
  });
}
