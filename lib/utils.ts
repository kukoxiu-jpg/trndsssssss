import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatCurrency(amount: number, currency = "DZD") {
  return new Intl.NumberFormat("fr-DZ", { maximumFractionDigits: 2 }).format(amount) + " " + currency;
}
