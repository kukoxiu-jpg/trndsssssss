import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function formatCurrency(amount: number, currency = "DZD") {
  return new Intl.NumberFormat("fr-DZ", { maximumFractionDigits: 2 }).format(amount) + " " + currency;
}

export function calcTimbreFiscal(totalTTC: number, isCash: boolean): number {
  if (!isCash) return 0;
  if (totalTTC <= 300) return 0;
  const timbre = Math.round(totalTTC * 0.01);
  return Math.min(Math.max(timbre, 5), 2500);
}

export function generateInvoiceNumber(existingCount: number): string {
  const year = new Date().getFullYear();
  return `FAC-${year}-${String(existingCount + 1).padStart(4, "0")}`;
}
