import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuwvezR1IgM-N-TlCsrilL4q6LbsfH9G8",
  authDomain: "aboutme-9f1c3.firebaseapp.com",
  projectId: "aboutme-9f1c3",
  storageBucket: "aboutme-9f1c3.firebasestorage.app",
  messagingSenderId: "986028055417",
  appId: "1:986028055417:web:3df5128cc37821a68c2da8",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  // Simple token protection: expects header x-admin-token
  const provided = (req.headers["x-admin-token"] as string) || (req.headers["authorization"] as string);
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dev-secret-123";
  if (!provided || provided !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized - missing or invalid admin token" });
  }

  try {
    if (!getApps().length) initializeApp(firebaseConfig as any);
    const db = getFirestore();

    const file = path.resolve(process.cwd(), "src/data/aboutme.json");
    const raw = fs.readFileSync(file, "utf-8");
    const json = JSON.parse(raw);

    // write to doc aboutme/data
    await setDoc(doc(db, "aboutme", "data"), json as any);

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
