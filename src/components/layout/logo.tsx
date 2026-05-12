import Link from "next/link";
import { Anchor, Ship } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Ship className="size-4" aria-hidden />
      </span>
      <span className="text-lg">
        Port<span className="text-sky-600 dark:text-sky-400">Go</span>
      </span>
      <span className="sr-only">PortGo inicio</span>
    </Link>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground",
        className
      )}
    >
      <Anchor className="size-4" aria-hidden />
    </span>
  );
}
