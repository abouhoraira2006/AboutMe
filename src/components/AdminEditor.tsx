"use client";

import React, { useState, useEffect } from "react";
import type { AboutMeData, Project, SkillCategory } from "@/data/types";
import { FaGithub, FaGooglePlay, FaGlobe, FaPlus, FaTrash, FaSave, FaCloudUploadAlt } from "react-icons/fa";

// Ensure all projects have a unique id
function ensureProjectIds(d: AboutMeData): AboutMeData {
  return {
    ...d,
    projects: d.projects.map((p) =>
      p.id ? p : { ...p, id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2) }
    ),
  };
}

export default function AdminEditor({ initial, onSave, onLoadRemote }: { initial: AboutMeData; onSave: (d: AboutMeData) => Promise<void>; onLoadRemote?: () => Promise<AboutMeData | null> }) {
  const [data, setData] = useState<AboutMeData>(ensureProjectIds(initial));
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function setNested(path: string, value: any) {
    setData((d) => {
      const copy: any = JSON.parse(JSON.stringify(d));
      const parts = path.split('.');
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!(parts[i] in cur)) cur[parts[i]] = {};
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      return copy;
    });
  }

  function addSkillCategory() {
    const next: SkillCategory = { category: { en: "New", ar: "جديد" }, items: [""] };
    setData((d) => ({ ...d, skills: [...d.skills, next] }));
  }

  function removeSkillCategory(i: number) {
    setData((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));
  }

  function addProject() {
    const p: Project = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
      name: "New Project",
      description: { en: "", ar: "" },
      github: "",
      googlePlay: "",
      website: ""
    };
    setData((d) => ({ ...d, projects: [...d.projects, p] }));
  }

  function removeProject(id: string) {
    setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }));
  }

  async function save() {
    setSaving(true);
    setStatus("جاري الحفظ...");
    try {
      await onSave(data);
      setStatus("تم الحفظ بنجاح");
    } catch (e: any) {
      setStatus(String(e));
    } finally {
      setSaving(false);
    }
  }

  async function loadRemote() {
    if (!onLoadRemote) return setStatus("وظيفة التحميل غير متاحة");
    setStatus("جاري التحميل...");
    try {
      const remote = await onLoadRemote();
      if (remote) {
        setData(ensureProjectIds(remote));
        setStatus("تم التحميل من الخادم");
      } else setStatus("لا توجد بيانات على الخادم");
    } catch (e: any) {
      setStatus(String(e));
    }
  }

  // On initial load or when initial changes, ensure all projects have ids
  useEffect(() => {
    setData(ensureProjectIds(initial));
  }, [initial]);

  return (
    <div className="space-y-6">
      {/* Hero header - large editable name & tagline to match main page style */}
      <div className="rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 shadow-lg backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <input aria-label="الاسم" className="w-full text-3xl md:text-4xl font-extrabold bg-transparent border-b border-zinc-700 pb-2 focus:outline-none focus:ring-2 focus:ring-sky-500" value={data.name} onChange={(e) => setNested('name', e.target.value)} />
          <div className="mt-2 flex gap-2">
            <input aria-label="المسمى بالعربية" className="w-1/2 rounded-lg bg-transparent border px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500" value={data.tagline.ar} onChange={(e) => setNested('tagline.ar', e.target.value)} />
            <input aria-label="المسمى بالانجليزية" className="w-1/2 rounded-lg bg-transparent border px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500" value={data.tagline.en} onChange={(e) => setNested('tagline.en', e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button title="تحميل من الخادم" onClick={loadRemote} className="p-2 rounded-full bg-slate-800/60 hover:bg-slate-700/80 text-zinc-200">
            <FaCloudUploadAlt />
          </button>
          <button title="حفظ" onClick={save} disabled={saving} className="p-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black">
            <FaSave />
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <section className="rounded-lg border p-4 bg-slate-900/40">
            <h3 className="text-sm font-medium mb-2">السيرة</h3>
            <label className="text-xs text-zinc-400">السيرة (AR)</label>
            <textarea rows={4} className="w-full rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-sky-500" value={data.about.ar} onChange={(e) => setNested('about.ar', e.target.value)} />
            <label className="text-xs text-zinc-400 mt-2 block">السيرة (EN)</label>
            <textarea rows={4} className="w-full rounded-lg border px-3 py-2 bg-transparent focus:ring-2 focus:ring-sky-500" value={data.about.en} onChange={(e) => setNested('about.en', e.target.value)} />
          </section>

          <section className="rounded-lg border p-4 bg-slate-900/40">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">المهارات</h3>
              <button title="إضافة فئة" onClick={addSkillCategory} className="p-2 rounded-full bg-sky-500 text-black"><FaPlus /></button>
            </div>
            <div className="mt-3 space-y-3 max-h-72 overflow-auto">
              {data.skills.map((s, idx) => (
                <div key={idx} className="rounded border p-2 bg-slate-900/60">
                  <div className="flex items-center gap-2 mb-2">
                    <input className="flex-1 rounded border px-2 py-1 text-sm" value={s.category.ar} onChange={(e) => setNested(`skills.${idx}.category.ar`, e.target.value)} />
                    <input className="flex-1 rounded border px-2 py-1 text-sm" value={s.category.en} onChange={(e) => setNested(`skills.${idx}.category.en`, e.target.value)} />
                    <button title="حذف الفئة" onClick={() => removeSkillCategory(idx)} className="p-2 rounded-full text-red-400"><FaTrash /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((it, i2) => (
                      <div key={i2} className="flex items-center gap-2">
                        <input className="rounded border px-2 py-1 text-sm" value={it} onChange={(e) => { const arr = [...s.items]; arr[i2] = e.target.value; setNested(`skills.${idx}.items`, arr); }} />
                        <button title="حذف" onClick={() => { const arr = [...s.items]; arr.splice(i2, 1); setNested(`skills.${idx}.items`, arr); }} className="text-red-400"><FaTrash /></button>
                      </div>
                    ))}
                    <button onClick={() => { const arr = [...s.items, '']; setNested(`skills.${idx}.items`, arr); }} className="rounded bg-emerald-500 px-3 py-1 text-black"><FaPlus /> إضافة</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-lg border p-4 bg-slate-900/40">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">المشاريع</h3>
              <button title="إضافة مشروع" onClick={addProject} className="p-2 rounded-full bg-sky-500 text-black"><FaPlus /></button>
            </div>
            <div className="mt-3 space-y-3">
              {data.projects.map((p, idx) => (
                <div key={p.id} className="rounded border p-3 bg-slate-900/60">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <input className="w-full rounded border px-2 py-1 mb-2" value={p.name} onChange={(e) => setNested(`projects.${idx}.name`, e.target.value)} />
                      <div className="grid gap-2 md:grid-cols-2">
                        <input placeholder="الوصف AR" className="rounded border px-2 py-1" value={p.description?.ar || ''} onChange={(e) => setNested(`projects.${idx}.description.ar`, e.target.value)} />
                        <input placeholder="الوصف EN" className="rounded border px-2 py-1" value={p.description?.en || ''} onChange={(e) => setNested(`projects.${idx}.description.en`, e.target.value)} />
                      </div>
                      <div className="mt-2 grid gap-2 md:grid-cols-3">
                        <input placeholder="GitHub URL" className="rounded border px-2 py-1" value={p.github || ''} onChange={(e) => setNested(`projects.${idx}.github`, e.target.value)} />
                        <input placeholder="Google Play URL" className="rounded border px-2 py-1" value={p.googlePlay || ''} onChange={(e) => setNested(`projects.${idx}.googlePlay`, e.target.value)} />
                        <input placeholder="موقع الويب" className="rounded border px-2 py-1" value={p.website || ''} onChange={(e) => setNested(`projects.${idx}.website`, e.target.value)} />
                      </div>
                      <div className="mt-3 flex gap-2">
                        {p.github ? <a title="GitHub" href={p.github} target="_blank" className="inline-flex items-center justify-center rounded-full bg-slate-800/60 p-2"><FaGithub /></a> : null}
                        {p.googlePlay ? <a title="Google Play" href={p.googlePlay} target="_blank" className="inline-flex items-center justify-center rounded-full bg-slate-800/60 p-2"><FaGooglePlay /></a> : null}
                        {p.website ? (
                          <a title="موقع ويب" href={p.website} target="_blank" className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white px-4 py-2">
                            <FaGlobe className="mr-2" /> موقع ويب
                          </a>
                        ) : null}
                        <button title="حذف المشروع" onClick={() => removeProject(p.id)} className="ml-auto p-2 rounded-full bg-red-600 text-white"><FaTrash /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border p-4 bg-slate-900/40">
            <h3 className="text-sm font-medium">الحسابات</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <input placeholder="Instagram" className="rounded border px-2 py-1" value={data.social.instagram || ''} onChange={(e) => setNested('social.instagram', e.target.value)} />
              <input placeholder="Facebook" className="rounded border px-2 py-1" value={data.social.facebook || ''} onChange={(e) => setNested('social.facebook', e.target.value)} />
              <input placeholder="LinkedIn" className="rounded border px-2 py-1" value={data.social.linkedin || ''} onChange={(e) => setNested('social.linkedin', e.target.value)} />
              <input placeholder="GitHub 1" className="rounded border px-2 py-1" value={data.social.github1 || ''} onChange={(e) => setNested('social.github1', e.target.value)} />
              <input placeholder="GitHub 2" className="rounded border px-2 py-1" value={data.social.github2 || ''} onChange={(e) => setNested('social.github2', e.target.value)} />
              <input placeholder="Discord" className="rounded border px-2 py-1" value={data.social.discord || ''} onChange={(e) => setNested('social.discord', e.target.value)} />
              <input placeholder="YouTube" className="rounded border px-2 py-1" value={data.social.youtube || ''} onChange={(e) => setNested('social.youtube', e.target.value)} />
              <input placeholder="Email (mailto:)" className="rounded border px-2 py-1" value={data.social.email || ''} onChange={(e) => setNested('social.email', e.target.value)} />
            </div>

            <div className="mt-3">
              <h4 className="text-xs text-zinc-300">حسابات إضافية</h4>
              <div className="mt-2 space-y-2">
                {(data.social.extraAccounts ? Object.entries(data.social.extraAccounts) : []).map(([k, v], i) => (
                  <div key={i} className="flex gap-2">
                    <input className="w-1/3 rounded border px-2 py-1" value={k} readOnly />
                    <input className="flex-1 rounded border px-2 py-1" value={v} onChange={(e) => {
                      const copy = { ...(data.social.extraAccounts || {}) };
                      copy[k] = e.target.value;
                      setNested('social.extraAccounts', copy);
                    }} />
                    <button className="p-2 rounded-full text-red-400" onClick={() => {
                      const copy = { ...(data.social.extraAccounts || {}) };
                      delete copy[k];
                      setNested('social.extraAccounts', copy);
                    }}><FaTrash /></button>
                  </div>
                ))}

                <AddExtraAccount onAdd={(key, url) => {
                  const copy = { ...(data.social.extraAccounts || {}) };
                  copy[key] = url;
                  setNested('social.extraAccounts', copy);
                }} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {status && <div className="rounded p-2 bg-slate-800/60">{status}</div>}
    </div>
  );
}

    function AddExtraAccount({ onAdd }: { onAdd: (key: string, url: string) => void }) {
      const [key, setKey] = React.useState("");
      const [url, setUrl] = React.useState("");
      return (
        <div className="flex gap-2">
          <input placeholder="اسم الحساب (مثال: tiktok)" className="w-1/3 rounded border px-2 py-1" value={key} onChange={(e) => setKey(e.target.value)} />
          <input placeholder="رابط الحساب" className="flex-1 rounded border px-2 py-1" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button onClick={() => { if (key && url) { onAdd(key, url); setKey(''); setUrl(''); } }} className="rounded bg-sky-500 px-3 py-1 text-black">إضافة</button>
        </div>
      );
    }
