import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function KpiCard({
  label, value, icon: Icon, tone = "default",
}: { label: string; value: string; icon: LucideIcon; tone?: "default" | "danger" | "warning" | "success" }) {
  const toneClasses: Record<string, string> = {
    default: "bg-primary-light text-primary",
    danger: "bg-red-50 text-accent",
    warning: "bg-amber-50 text-amber-600",
    success: "bg-emerald-50 text-emerald-600",
  };
  return (
    <div className="card flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className={cn("w-11 h-11 rounded-lg flex items-center justify-center", toneClasses[tone])}>
        <Icon size={20} />
      </div>
    </div>
  );
}
