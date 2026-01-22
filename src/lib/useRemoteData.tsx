"use client";

import { useEffect, useState } from "react";
import data from "@/data/aboutme.json";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBuwvezR1IgM-N-TlCsrilL4q6LbsfH9G8",
  authDomain: "aboutme-9f1c3.firebaseapp.com",
  projectId: "aboutme-9f1c3",
  storageBucket: "aboutme-9f1c3.firebasestorage.app",
  messagingSenderId: "986028055417",
  appId: "1:986028055417:web:3df5128cc37821a68c2da8",
};

export function useRemoteData() {
  const [remote, setRemote] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      if (!getApps().length) initializeApp(firebaseConfig as any);
      const db = getFirestore();
      const snap = await getDoc(doc(db, "aboutme", "data"));
      if (snap.exists()) {
        setRemote(snap.data());
      } else {
        setRemote(null);
      }
    } catch (e) {
      setRemote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  return { data: remote ?? data, loading, reload: load };
}
