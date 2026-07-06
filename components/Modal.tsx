"use client";
import { X } from "lucide-react";
export default function Modal({ open, onClose, title, children }: any) { if (!open) return null; return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 no-print"><div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"><div className="flex items-center justify-between px-5 py-4 border-b border-gray-100"><h3 className="font-semibold">{title}</h3><button onClick={onClose}><X size={18} /></button></div><div className="p-5">{children}</div></div></div>; }
