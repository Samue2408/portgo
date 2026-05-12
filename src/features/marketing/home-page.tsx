"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  Compass,
  LineChart,
  MapPinned,
  Sparkles,
  Waves,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { landingStats, testimonials } from "@/data/landing";
import { cn } from "@/lib/utils";

const fade = (reduce: boolean) => ({
  initial: reduce ? false : { opacity: 0, y: 16 },
  whileInView: reduce ? undefined : { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
});

export function MarketingHome() {
  const reduce = useReducedMotion() ?? false;

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200/40 via-transparent to-transparent dark:from-sky-500/15" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="space-y-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
            >
              <Sparkles className="size-3.5 text-sky-600" />
              Plataforma educativa + herramientas simuladas
            </motion.div>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.55 }}
              className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Aprende logística marítima con el estilo de un producto tech real
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="max-w-xl text-pretty text-lg text-muted-foreground"
            >
              PortGo combina rutas de aprendizaje, cuestionarios y simuladores de cotización y rastreo — todo en
              español, listo para demo y sin integraciones enterprise.
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/login?tab=register"
                className={cn(buttonVariants({ size: "lg" }), "inline-flex gap-2")}
              >
                Empezar gratis <ArrowRight className="size-4" />
              </Link>
              <Link href="/login" className={buttonVariants({ size: "lg", variant: "outline" })}>
                Ver panel
              </Link>
            </motion.div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Waves className="size-4 text-sky-600" /> Enfoque marítimo y portuario
              </div>
              <div className="flex items-center gap-2">
                <Compass className="size-4 text-sky-600" /> Simulaciones determinísticas
              </div>
            </div>
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="relative"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl border border-border/80 bg-card/90 p-6 shadow-xl shadow-sky-900/10 backdrop-blur"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Cotización simulada</p>
                  <p className="text-lg font-semibold">Callao → Róterdam</p>
                </div>
                <BarChart3 className="size-6 text-sky-600" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card className="border-border/80 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Precio estimado</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-semibold">USD 4.280</CardContent>
                </Card>
                <Card className="border-border/80 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Tránsito</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-semibold">28–36 días</CardContent>
                </Card>
              </div>
              <div className="mt-6 rounded-xl border border-dashed border-sky-300/60 bg-sky-50/50 p-4 text-sm text-muted-foreground dark:border-sky-500/30 dark:bg-sky-950/30">
                Los valores son ilustrativos. Ajusta peso, tipo de carga y contenedor en el simulador.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="caracteristicas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <motion.div {...fade(reduce)} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Diseñado para aprender haciendo</h2>
          <p className="mt-3 text-muted-foreground">
            Interfaz minimalista inspirada en productos premium: clara, rápida y lista para presentar a inversores o
            clase.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Rutas de aprendizaje",
              desc: "Microcursos sobre importación, puertos y contenedores con progreso visible.",
              icon: BookOpen,
            },
            {
              title: "Cotizador simulado",
              desc: "Fórmulas transparentes basadas en distancia y factores de carga — sin APIs externas.",
              icon: LineChart,
            },
            {
              title: "Rastreo ficticio",
              desc: "Códigos generan una historia coherente de etapas portuarias y aduaneras.",
              icon: MapPinned,
            },
          ].map((f) => (
            <motion.div key={f.title} {...fade(reduce)}>
              <Card className="h-full border-border/80 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <f.icon className="mb-2 size-8 text-sky-600" />
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{f.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="border-y border-border/60 bg-muted/25 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.h2 {...fade(reduce)} className="text-center text-3xl font-semibold tracking-tight">
            Cómo funciona
          </motion.h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Crea tu cuenta", body: "Autenticación con Supabase. Perfil listo en segundos." },
              {
                step: "02",
                title: "Explora el panel",
                body: "Ve métricas simuladas, noticias y accesos rápidos a herramientas.",
              },
              {
                step: "03",
                title: "Aprende y practica",
                body: "Cursos, quizzes y simuladores con feedback inmediato en español.",
              },
            ].map((s) => (
              <motion.div key={s.step} {...fade(reduce)} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="text-xs font-bold text-sky-600">{s.step}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="educacion" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <motion.div {...fade(reduce)} className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Beneficios educativos</h2>
            <p className="mt-3 text-muted-foreground">
              Lenguaje claro para estudiantes y emprendedores. Cada módulo cierra con evaluación corta y sensación de
              logro.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                "Progreso por curso y reintentos sin fricción",
                "Insignias al completar quizzes clave",
                "Contenido alineado a operaciones portuarias reales (nivel introductorio)",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Boxes className="mt-0.5 size-4 shrink-0 text-sky-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <motion.div {...fade(reduce)} className="rounded-2xl border border-border bg-gradient-to-br from-card to-muted p-8 shadow-inner">
            <p className="text-sm font-medium text-sky-700 dark:text-sky-300">Vista previa</p>
            <p className="mt-2 text-2xl font-semibold">Panel de progreso</p>
            <div className="mt-6 space-y-4">
              {["Importación", "Puertos", "Contenedores"].map((c, i) => (
                <div key={c}>
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>{c}</span>
                    <span>{[42, 68, 24][i]}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={reduce ? false : { width: 0 }}
                      whileInView={reduce ? undefined : { width: `${[42, 68, 24][i]}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 * i }}
                      className="h-full rounded-full bg-sky-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="herramientas" className="border-y border-border/60 bg-muted/20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.h2 {...fade(reduce)} className="text-center text-3xl font-semibold tracking-tight">
            Herramientas logísticas (simuladas)
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle>Cotización</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Selecciona puertos, peso y tipo de contenedor. Obtén un rango de precio y tiempo para pitch o taller.
              </CardContent>
            </Card>
            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle>Rastreo</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Ingresa un código (incluso inventado). La línea de tiempo mantiene consistencia para demos repetibles.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="estadisticas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {landingStats.map((s) => (
            <motion.div key={s.label} {...fade(reduce)} className="text-center">
              <p className="text-3xl font-semibold text-foreground">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="testimonios" className="border-t border-border/60 bg-muted/15 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.h2 {...fade(reduce)} className="text-center text-3xl font-semibold tracking-tight">
            Testimonios (demo)
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div key={t.name} {...fade(reduce)}>
                <Card className="h-full border-border/80 shadow-sm">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">“{t.quote}”</p>
                    <p className="mt-4 text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <motion.div
          {...fade(reduce)}
          className="rounded-3xl border border-sky-200/70 bg-gradient-to-br from-sky-50 via-card to-card p-10 text-center shadow-lg dark:border-sky-500/30 dark:from-sky-950/40"
        >
          <h2 className="text-3xl font-semibold tracking-tight">¿Listo para tu demo?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Crea una cuenta y recorre el panel, cursos y simuladores. Ideal para ferias de emprendimiento o pitch en
            español.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/login?tab=register" className={buttonVariants({ size: "lg" })}>
              Crear cuenta
            </Link>
            <Link href="/login" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Ya tengo cuenta
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
