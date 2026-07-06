"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { add, getAll } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]); const load = () => setSuppliers(getAll<any>("suppliers")); useEffect(() => { load(); }, []);
  return <div className="space-y-4"><div className="flex justify-between gap-3"><h2 className="text-lg font-semibold">Fournisseurs</h2><button onClick={() => { add<any>('suppliers',{ name:`Fournisseur ${suppliers.length+1}`, phone:'', address:'', balance:0 }); load(); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium"><Plus size={16} /> Ajouter un fournisseur</button></div><div className="grid gap-3">{suppliers.map((s)=><div key={s.id} className="card flex items-center justify-between"><div><p className="font-semibold">{s.name}</p><p className="text-sm text-gray-500">{s.phone || '—'} • {s.address || '—'}</p></div><div className="font-semibold text-accent">{formatCurrency(s.balance)}</div></div>)}</div></div>;
}
