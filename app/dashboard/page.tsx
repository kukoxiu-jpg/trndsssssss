"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Wallet, Receipt, AlertTriangle, HandCoins, PlusCircle, PackagePlus, UserPlus } from "lucide-react";
import KpiCard from "@/components/KpiCard";
import { useLang } from "@/lib/i18n";
import { getAll } from "@/lib/db";
import type { Product, Client, Invoice, CashSession, StockMovement } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export default function DashboardHome() {
  const { t, lang } = useLang();
  const [kpis, setKpis] = useState({ todaySales: 0, invoicesCount: 0, stockAlerts: 0, totalDebts: 0, cashBalance: 0 });
  const [chartData, setChartData] = useState<{ day: string; sales: number }[]>([]);
  const [activity, setActivity] = useState<{ label: string; date: string }[]>([]);

  useEffect(() => {
    const products = getAll<Product>("products");
    const clients = getAll<Client>("clients");
    const invoices = getAll<Invoice>("invoices");
    const sessions = getAll<CashSession>("cashSessions");
    const movements = getAll<StockMovement>("stockMovements");

    const today = new Date().toISOString().slice(0, 10);
    const todayInvoices = invoices.filter((i) => i.date === today);
    const todaySales = todayInvoices.reduce((sum, i) => sum + (i.totalTTC || i.totalHT + i.totalTVA), 0);
    const stockAlerts = products.filter((p) => p.quantity <= p.lowStockThreshold).length;
    const totalDebts = clients.reduce((sum, c) => sum + Math.max(c.balance, 0), 0);
    const openSession = sessions.find((s) => s.status === "open");
    const cashBalance = openSession ? openSession.openingBalance : 0;

    setKpis({ todaySales, invoicesCount: todayInvoices.length, stockAlerts, totalDebts, cashBalance });

    const days: { day: string; sales: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString(lang === "fr" ? "fr-FR" : "ar-DZ", { weekday: "short" });
      const sales = invoices.filter((inv) => inv.date === key).reduce((s, inv) => s + (inv.totalTTC || inv.totalHT + inv.totalTVA), 0);
      days.push({ day: label, sales });
    }
    setChartData(days);

    const feed = [
      ...invoices.slice(-5).map((i) => ({ label: `${lang === "fr" ? "Facture" : "فاتورة"} ${i.number}`, date: i.date })),
      ...movements.slice(-5).map((m) => ({ label: `${lang === "fr" ? "Mouvement stock" : "حركة مخزون"} (${m.type})`, date: m.createdAt.slice(0, 10) })),
    ].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);
    setActivity(feed);
  }, [lang]);

  const quickActions = [
    { label: t("newInvoice"), icon: PlusCircle, href: "/dashboard/invoicing" },
    { label: t("newProduct"), icon: PackagePlus, href: "/dashboard/stock" },
    { label: t("addClient"), icon: UserPlus, href: "/dashboard/clients" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label={t("todaySales")} value={formatCurrency(kpis.todaySales)} icon={Wallet} tone="success" />
        <KpiCard label={t("invoicesCount")} value={String(kpis.invoicesCount)} icon={Receipt} />
        <KpiCard label={t("stockAlerts")} value={String(kpis.stockAlerts)} icon={AlertTriangle} tone="warning" />
        <KpiCard label={t("totalDebts")} value={formatCurrency(kpis.totalDebts)} icon={HandCoins} tone="danger" />
        <KpiCard label={t("cashBalance")} value={formatCurrency(kpis.cashBalance)} icon={Wallet} />
      </div>

      <div className="flex flex-wrap gap-3">
        {quickActions.map((qa) => {
          const Icon = qa.icon;
          return (
            <Link key={qa.href} href={qa.href} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium hover:bg-primary-light hover:text-primary hover:border-primary transition">
              <Icon size={16} /> {qa.label}
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <h3 className="font-semibold mb-4">{t("salesChart")}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Line type="monotone" dataKey="sales" stroke="#0f7b3c" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">{t("recentActivity")}</h3>
          <ul className="space-y-3">
            {activity.length === 0 && <p className="text-sm text-gray-400">—</p>}
            {activity.map((a, i) => (
              <li key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0">
                <span>{a.label}</span>
                <span className="text-gray-400">{a.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
