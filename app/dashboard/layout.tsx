"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { seedIfEmpty } from "@/lib/seed";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { seedIfEmpty(); }, []);
  return <div className="flex min-h-screen bg-bg"><Sidebar open={open} onClose={() => setOpen(false)} /><div className="flex-1 flex flex-col min-w-0"><Topbar onMenuClick={() => setOpen(true)} /><main className="flex-1 p-4 md:p-6">{children}</main></div></div>;
}
