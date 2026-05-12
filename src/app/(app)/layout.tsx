import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { getProfile } from "@/services/profile.service";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-lg font-semibold">Configura Supabase</p>
        <p className="max-w-md text-sm text-muted-foreground">
          Añade NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en <code className="rounded bg-muted px-1">.env.local</code> para usar autenticación y datos.
        </p>
      </div>
    );
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const profile = await getProfile(user.id);
  const displayName = profile?.full_name ?? user.email?.split("@")[0] ?? "Usuario";
  const email = user.email ?? "";

  return (
    <AppShell displayName={displayName} email={email}>
      {children}
    </AppShell>
  );
}
