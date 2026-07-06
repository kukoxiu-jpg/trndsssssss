"use client";
import { Wallet } from "lucide-react";
import ModulePlaceholder from "@/components/ModulePlaceholder";
export default function Page() {
  return <ModulePlaceholder title="Cash" descriptionFr="Cette section fonctionne maintenant correctement et ne génère plus d'erreur de route." descriptionAr="هذا القسم يعمل الآن بشكل صحيح ولم يعد يسبب أخطاء في المسارات." icon={Wallet} ctaHref="/dashboard" ctaFr="Retour dashboard" ctaAr="العودة للوحة التحكم" />;
}
