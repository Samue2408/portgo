"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Boxes,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Menu,
  UserRound,
  Calculator,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@/components/layout/logo";

const nav = [
  { href: "/dashboard", label: "Panel principal", icon: LayoutDashboard },
  { href: "/courses", label: "Cursos", icon: BookOpen },
  { href: "/tracking", label: "Rastreo", icon: MapPinned },
  { href: "/quote", label: "Cotización", icon: Calculator },
  { href: "/simulator", label: "Simulador", icon: Boxes },
  { href: "/profile", label: "Perfil", icon: UserRound },
];

export function AppShell({
  displayName,
  email,
  children,
}: {
  displayName: string;
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={cn("flex gap-1", mobile ? "flex-col" : "flex-col px-2")}>
      {nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex md:flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <LogoIcon />
          <div>
            <p className="text-sm font-semibold leading-tight">PortGo</p>
            <p className="text-xs text-sidebar-foreground/70">MVP educativo</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <NavLinks />
        </div>
        <div className="border-t border-sidebar-border p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent/60"
            onClick={logout}
          >
            <LogOut className="size-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger
                className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
                aria-label="Menú"
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-0 text-sidebar-foreground">
                <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
                  <LogoIcon />
                  <span className="font-semibold">PortGo</span>
                </div>
                <div className="p-4">
                  <NavLinks mobile />
                  <Separator className="my-4 bg-sidebar-border" />
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
                    <LogOut className="size-4" />
                    Cerrar sesión
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <span className="text-sm font-semibold text-foreground md:hidden">PortGo</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">Hola,</p>
            <p className="text-sm font-semibold leading-tight">{displayName}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right text-xs text-muted-foreground sm:block">
              <p className="font-medium text-foreground">{email}</p>
              <p>Sesión activa</p>
            </div>
            <Link href="/profile" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:inline-flex")}>
              Mi perfil
            </Link>
          </div>
        </header>
        <main className="flex-1 bg-muted/20 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
