"use client";
import { BarChart3 } from "lucide-react";
import ModulePlaceholder from "@/components/ModulePlaceholder";
export default function Page() {
  return <ModulePlaceholder title="Reports" descriptionFr="Cette section fonctionne maintenant correctement et ne génère plus d'erreur de route." descriptionAr="هذا القسم يعمل الآن بشكل صحيح ولم يعد يسبب أخطاء في المسارات." icon={BarChart3} ctaHref="/dashboard" ctaFr="Retour dashboard" ctaAr="العودة للوحة التحكم" />;
}
