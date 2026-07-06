"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import {
  LayoutDashboard, Receipt, Package, Users, Wallet,
  HandCoins, Factory, Truck, BarChart3, Settings, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", key: "dashboard", icon: LayoutDashboard },
  { href: "/dashboard/invoicing", key: "invoicing", icon: Receipt },
  { href: "/dashboard/stock", key: "stock", icon: Package },
  { href: "/dashboard/clients", key: "clients", icon: Users },
  { href: "/dashboard/suppliers", key: "suppliers", icon: Users },
  { href: "/dashboard/cash", key: "cashRegister", icon: Wallet },
  { href: "/dashboard/debts", key: "debts", icon: HandCoins },
  { href: "/dashboard/production", key: "production", icon: Factory },
  { href: "/dashboard/distribution", key: "distribution", icon: Truck },
  { href: "/dashboard/reports", key: "reports", icon: BarChart3 },
  { href: "/dashboard/settings", key: "settings", icon: Settings },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { t } = useLang();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 md:hidden no-print" onClick={onClose} />}
      <aside
        className={cn(
          "fixed md:sticky top-0 z-50 h-screen w-64 bg-white border-r border-gray-100 flex flex-col transition-transform no-print",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2 font-bold text-primary">
            <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center">T</div>
            <span className="text-sm">Trans Pile à l&apos;Heure</span>
          </Link>
          <button onClick={onClose} className="md:hidden"><X size={20} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition",
                  active ? "bg-primary-light text-primary" : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <Icon size={18} />
                {t(item.key as any)}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
