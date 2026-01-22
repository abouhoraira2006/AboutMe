import type { NextApiRequest, NextApiResponse } from "next";
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

  const provided = (req.headers["x-admin-token"] as string) || (req.headers["authorization"] as string);
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dev-secret-123";
  if (!provided || provided !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized - missing or invalid admin token" });
  }

  try {
    if (!getApps().length) initializeApp(firebaseConfig as any);
    const db = getFirestore();
    const payload = req.body;
    if (!payload) return res.status(400).json({ error: "Missing JSON payload" });

    await setDoc(doc(db, "aboutme", "data"), payload as any);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
