import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#caracteristicas", label: "Características" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#herramientas", label: "Herramientas" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Iniciar sesión
          </Link>
          <Link href="/login?tab=register" className={buttonVariants()}>
            Crear cuenta
          </Link>
        </div>
        <Sheet>
          <SheetTrigger
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "md:hidden")}
            aria-label="Abrir menú"
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-4">
            <Logo />
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-lg font-medium">
                {l.label}
              </Link>
            ))}
            <Link href="/login" className={cn(buttonVariants(), "w-full text-center")}>
              Iniciar sesión
            </Link>
            <Link href="/login?tab=register" className={cn(buttonVariants({ variant: "secondary" }), "w-full text-center")}>
              Crear cuenta
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
