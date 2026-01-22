"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuwvezR1IgM-N-TlCsrilL4q6LbsfH9G8",
  authDomain: "aboutme-9f1c3.firebaseapp.com",
  projectId: "aboutme-9f1c3",
  storageBucket: "aboutme-9f1c3.firebasestorage.app",
  messagingSenderId: "986028055417",
  appId: "1:986028055417:web:3df5128cc37821a68c2da8",
};

let app: FirebaseApp | null = null;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export const db = getFirestore(app!);
