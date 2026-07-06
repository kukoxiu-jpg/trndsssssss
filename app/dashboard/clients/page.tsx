"use client";
import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { add, getAll } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]); const [search, setSearch] = useState("");
  const load = () => setClients(getAll<any>("clients")); useEffect(() => { load(); }, []);
  return <div className="space-y-4"><div className="flex justify-between gap-3"><h2 className="text-lg font-semibold">Clients</h2><button onClick={() => { add<any>('clients',{ name:`Client ${clients.length+1}`, phone:'', address:'', balance:0 }); load(); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium"><Plus size={16} /> Ajouter un client</button></div><div className="relative max-w-sm"><Search size={16} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm" /></div><div className="grid gap-3">{clients.filter((c)=>c.name.toLowerCase().includes(search.toLowerCase())).map((c)=><div key={c.id} className="card flex items-center justify-between"><div><p className="font-semibold">{c.name}</p><p className="text-sm text-gray-500">{c.phone || '—'} • {c.address || '—'}</p></div><div className="font-semibold text-accent">{formatCurrency(c.balance)}</div></div>)}</div></div>;
}
