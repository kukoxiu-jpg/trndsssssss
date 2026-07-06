"use client";
import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/lib/db";
export default function SettingsPage() {
  const [form, setForm] = useState(getSettings()); const [saved, setSaved] = useState(false);
  useEffect(() => { setForm(getSettings()); }, []);
  const save = () => { updateSettings(form); setSaved(true); setTimeout(() => setSaved(false), 1500); };
  const fields = [['companyName','Nom entreprise'],['address','Adresse'],['phone','Téléphone'],['RC','RC'],['NIF','NIF'],['AI','AI'],['taxId','Tax ID'],['currency','Devise']];
  return <div className="space-y-6"><div className="card"><h2 className="text-xl font-bold mb-2">Paramètres généraux</h2><p className="text-gray-600">Ces données sont enregistrées dans le cache/localStorage du navigateur pour les tests.</p></div><div className="card grid md:grid-cols-2 gap-4">{fields.map(([key,label]) => <div key={key} className="space-y-2"><label className="text-sm font-medium text-gray-700">{label}</label><input value={(form as any)[key] ?? ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" /></div>)}</div><div className="flex items-center gap-3"><button onClick={save} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium">Enregistrer</button>{saved && <span className="text-sm text-emerald-600">Enregistré localement</span>}</div></div>;
}
