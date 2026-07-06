"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Wallet, Receipt, AlertTriangle, HandCoins, PlusCircle, PackagePlus, UserPlus } from "lucide-react";
import KpiCard from "@/components/KpiCard";
import { useLang } from "@/lib/i18n";
import { getAll } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
export default function DashboardHome() {
  const { t, lang } = useLang();
  const [kpis, setKpis] = useState({ todaySales: 0, invoicesCount: 0, stockAlerts: 0, totalDebts: 0, cashBalance: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  useEffect(() => {
    const products = getAll<any>("products"); const clients = getAll<any>("clients"); const invoices = getAll<any>("invoices"); const sessions = getAll<any>("cashSessions");
    const today = new Date().toISOString().slice(0, 10); const todayInvoices = invoices.filter((i:any)=>i.date===today);
    setKpis({ todaySales: todayInvoices.reduce((s:number,i:any)=>s+(i.totalTTC||0),0), invoicesCount: todayInvoices.length, stockAlerts: products.filter((p:any)=>p.quantity<=p.lowStockThreshold).length, totalDebts: clients.reduce((s:number,c:any)=>s+Math.max(c.balance,0),0), cashBalance: sessions.find((s:any)=>s.status==='open')?.openingBalance || 0 });
    const days = []; for (let i=6;i>=0;i--) { const d=new Date(); d.setDate(d.getDate()-i); const key=d.toISOString().slice(0,10); days.push({ day:d.toLocaleDateString(lang==='fr'?'fr-FR':'ar-DZ',{weekday:'short'}), sales: invoices.filter((inv:any)=>inv.date===key).reduce((s:number,inv:any)=>s+(inv.totalTTC||0),0) }); }
    setChartData(days);
  }, [lang]);
  const quick = [{ label: t('newInvoice'), icon: PlusCircle, href: '/dashboard/invoicing' }, { label: t('newProduct'), icon: PackagePlus, href: '/dashboard/stock' }, { label: t('addClient'), icon: UserPlus, href: '/dashboard/clients' }];
  return <div className="space-y-6"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"><KpiCard label={t('todaySales')} value={formatCurrency(kpis.todaySales)} icon={Wallet} tone="text-emerald-600 bg-emerald-50" /><KpiCard label={t('invoicesCount')} value={String(kpis.invoicesCount)} icon={Receipt} /><KpiCard label={t('stockAlerts')} value={String(kpis.stockAlerts)} icon={AlertTriangle} tone="text-amber-600 bg-amber-50" /><KpiCard label={t('totalDebts')} value={formatCurrency(kpis.totalDebts)} icon={HandCoins} tone="text-accent bg-red-50" /><KpiCard label={t('cashBalance')} value={formatCurrency(kpis.cashBalance)} icon={Wallet} /></div><div className="flex flex-wrap gap-3">{quick.map((qa) => { const Icon = qa.icon; return <Link key={qa.href} href={qa.href} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium hover:bg-primary-light hover:text-primary hover:border-primary transition"><Icon size={16} /> {qa.label}</Link>; })}</div><div className="grid lg:grid-cols-3 gap-4"><div className="card lg:col-span-2"><h3 className="font-semibold mb-4">{t('salesChart')}</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#eee" /><XAxis dataKey="day" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip formatter={(v:number)=>formatCurrency(v)} /><Line type="monotone" dataKey="sales" stroke="#0f7b3c" strokeWidth={2} dot={{ r: 3 }} /></LineChart></ResponsiveContainer></div></div><div className="card"><h3 className="font-semibold mb-4">{t('recentActivity')}</h3><p className="text-sm text-gray-600">Les derniers mouvements et factures apparaîtront ici.</p></div></div></div>;
}
