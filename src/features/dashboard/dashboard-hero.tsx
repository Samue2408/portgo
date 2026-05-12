"use client";

import { motion, useReducedMotion } from "framer-motion";

export function DashboardHero({
  displayName,
  email,
  memberSinceLabel,
}: {
  displayName: string;
  email: string;
  memberSinceLabel: string | null;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-sky-50/40 p-6 shadow-sm dark:to-sky-950/20"
    >
      <p className="text-sm font-medium text-sky-800 dark:text-sky-200">Hola de nuevo</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{displayName}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {email}
        {memberSinceLabel ? (
          <>
            {" "}
            · En PortGo desde <span className="font-medium text-foreground">{memberSinceLabel}</span>
          </>
        ) : null}
      </p>
    </motion.div>
  );
}
