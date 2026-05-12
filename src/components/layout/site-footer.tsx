import Link from "next/link";
import { Logo } from "@/components/layout/logo";

const cols = [
  {
    title: "Producto",
    items: [
      { href: "/#caracteristicas", label: "Características" },
      { href: "/#herramientas", label: "Herramientas" },
      { href: "/login", label: "Acceso" },
    ],
  },
  {
    title: "Legal (demo)",
    items: [
      { href: "#", label: "Privacidad" },
      { href: "#", label: "Términos" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Conectando innovación y logística en una sola experiencia. Contenido educativo y simulaciones — sin
            integraciones reales de transporte.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="mb-3 text-sm font-semibold">{c.title}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.items.map((i) => (
                <li key={i.label}>
                  <Link href={i.href} className="hover:text-foreground transition-colors">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PortGo. MVP demostrativo.
      </div>
    </footer>
  );
}
