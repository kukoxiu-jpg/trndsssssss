import { LucideIcon } from "lucide-react";
export default function KpiCard({ label, value, icon: Icon, tone = "text-primary bg-primary-light" }: { label: string; value: string; icon: LucideIcon; tone?: string; }) {
  return <div className="card flex items-center justify-between"><div><p className="text-xs text-gray-500 mb-1">{label}</p><p className="text-xl font-bold">{value}</p></div><div className={`w-11 h-11 rounded-lg flex items-center justify-center ${tone}`}><Icon size={20} /></div></div>;
}
