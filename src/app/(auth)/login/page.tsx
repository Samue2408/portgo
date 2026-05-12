import { Suspense } from "react";
import { AuthCard } from "@/features/auth/auth-card";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center text-sm text-muted-foreground">Cargando…</div>}>
      <AuthCard />
    </Suspense>
  );
}
