"use client";

import React from "react";
import data from "@/data/aboutme.json";
import AdminEditor from "@/components/AdminEditor";
import { useRemoteData } from "@/lib/useRemoteData";
import { useEffect, useState } from "react";
import type { AboutMeData } from "@/data/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AdminPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(typeof window !== "undefined" ? sessionStorage.getItem("admin_token") : null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function saveToken(t: string) {
    sessionStorage.setItem("admin_token", t);
    setToken(t);
  }

  async function seed() {
    setStatus("Seeding...");
    try {
      const res = await fetch("/api/seed", { method: "POST", headers: { "x-admin-token": token || "" } });
      const json = await res.json();
      setStatus(JSON.stringify(json));
    } catch (e: any) {
      setStatus(String(e));
    }
  }

  async function update() {
    setStatus("Updating...");
    try {
      const res = await fetch("/api/update", { method: "POST", headers: { "x-admin-token": token || "", "content-type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      setStatus(JSON.stringify(json));
    } catch (e: any) {
      setStatus(String(e));
    }
  }


  // Always use remote data if available, fallback to local JSON
  const { data: remote, loading, reload } = useRemoteData();
  const [initial, setInitial] = useState<AboutMeData>(remote ?? (data as AboutMeData));
  useEffect(() => {
    if (remote) setInitial(remote as AboutMeData);
  }, [remote]);

  async function handleSave(newData: AboutMeData): Promise<void> {
    setStatus("Saving...");
    try {
      const res = await fetch("/api/update", { method: "POST", headers: { "x-admin-token": token || "", "content-type": "application/json" }, body: JSON.stringify(newData) });
      const json = await res.json();
      setStatus(JSON.stringify(json));
      await reload(); // reload remote data after save
    } catch (e: any) {
      setStatus(String(e));
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_token");
    setToken(null);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      <Navbar name={(data as AboutMeData).name} />
      <main className="pt-16">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-800/40 p-6 shadow-lg backdrop-blur-md">
            <h1 className="text-2xl font-bold mb-4">لوحة التحكم</h1>
            {!token ? (
              <div className="mt-4">
                <p className="text-sm text-zinc-400">تسجيل الدخول للوصول للوحة</p>
                <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                  <input className="w-full md:w-64 rounded border px-3 py-2 bg-transparent" placeholder="اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <input className="w-full md:w-64 rounded border px-3 py-2 bg-transparent" placeholder="كلمة المرور" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <div>
                    <button
                      onClick={async () => {
                        setStatus("Logging in...");
                        try {
                          const res = await fetch("/api/admin-login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ username, password }) });
                          const json = await res.json();
                          if (res.ok && json.token) {
                            saveToken(json.token);
                            setStatus("تم تسجيل الدخول");
                          } else {
                            setStatus(String(json.error || "فشل تسجيل الدخول"));
                          }
                        } catch (e: any) {
                          setStatus(String(e));
                        }
                      }}
                      className="rounded bg-emerald-500 px-4 py-2 text-black"
                    >
                      تسجيل
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <button onClick={seed} className="rounded bg-emerald-500 px-4 py-2 text-black">استعادة من JSON</button>
                  <button onClick={update} className="rounded bg-sky-500 px-4 py-2 text-black">رفع JSON الحالي</button>
                  <button onClick={logout} className="rounded bg-zinc-700 px-4 py-2 text-white">تسجيل الخروج</button>
                </div>
                <div className="mt-6">
                  <AdminEditor initial={initial} onSave={handleSave} onLoadRemote={reload} />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">الحالة:</p>
                  <pre className="whitespace-pre-wrap">{status}</pre>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">معاينة JSON محلي</h2>
            <pre className="mt-2 max-h-64 overflow-auto bg-slate-900 p-3 text-sm rounded">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </main>
      <Footer data={data as AboutMeData} />
    </div>
  );
}
