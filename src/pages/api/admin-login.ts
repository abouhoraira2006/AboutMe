import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body || {};

  const ADMIN_USER = process.env.ADMIN_USER || "Admin";
  const ADMIN_PASS = process.env.ADMIN_PASS || "HammiAdmin2026";
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dev-secret-123";

  if (!username || !password) return res.status(400).json({ error: "Missing credentials" });

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({ ok: true, token: ADMIN_TOKEN });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}
