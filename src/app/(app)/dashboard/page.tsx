import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { dashboardNews, shipmentOverview } from "@/data/dashboard-mock";
import { getDashboardSnapshot } from "@/services/dashboard.service";
import { DashboardActivityChart } from "@/features/dashboard/dashboard-activity-chart";
import { DashboardHero } from "@/features/dashboard/dashboard-hero";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return (
      <div className="mx-auto max-w-lg text-center text-muted-foreground">
        No hay sesión activa.{" "}
        <Link href="/login" className="text-primary underline">
          Inicia sesión
        </Link>
      </div>
    );
  }

  const snap = await getDashboardSnapshot(user.id, user.email ?? null, user.created_at);
  const showRealShipments = snap.shipments.length > 0;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <DashboardHero
        displayName={snap.displayName}
        email={snap.email}
        memberSinceLabel={snap.memberSinceLabel}
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Resumen</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Datos vinculados a tu cuenta: progreso, cuestionarios y envíos guardados. Listo para demo con stakeholders.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/quote" className={buttonVariants()}>
            Nueva cotización
          </Link>
          <Link href="/tracking" className={buttonVariants({ variant: "outline" })}>
            Rastrear envío
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Progreso promedio", value: `${snap.avgProgress}%`, hint: "Sobre todos los cursos" },
          { label: "Cuestionarios hechos", value: `${snap.quizTotal}`, hint: "Total en tu cuenta" },
          { label: "Lecciones disponibles", value: `${snap.lessonTotal}`, hint: "Catálogo actual" },
          { label: "Envíos guardados", value: `${snap.shipmentCount}`, hint: "Desde Rastreo (simulación)" },
        ].map((s) => (
          <Card key={s.label} className="border-border/80 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold">{s.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">{s.hint}</CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/80 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Tu actividad de aprendizaje</CardTitle>
            <CardDescription>
              {snap.chartHasRealData
                ? "Cuestionarios completados por mes (últimos 6 meses)."
                : "Completa un cuestionario en Cursos para ver barras reales; el eje muestra los últimos 6 meses."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardActivityChart data={snap.chartData} useRealData={snap.chartHasRealData} />
          </CardContent>
        </Card>
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Noticias y tips</CardTitle>
            <CardDescription>Contenido curado para el prototipo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardNews.map((n) => (
              <div
                key={n.title}
                className="rounded-lg border border-border/70 bg-card p-3 transition-colors hover:bg-muted/40"
              >
                <Badge variant="secondary" className="mb-2">
                  {n.tag}
                </Badge>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.excerpt}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>{showRealShipments ? "Tus envíos guardados" : "Ejemplo de envíos (demo)"}</CardTitle>
            <CardDescription>
              {showRealShipments
                ? "Registros desde la página de Rastreo."
                : "Vista previa del widget; guarda un rastreo para ver datos reales aquí."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {showRealShipments
              ? snap.shipments.map((row) => (
                  <div
                    key={row.id}
                    className="flex flex-col gap-2 rounded-lg border border-border/70 bg-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground">{row.tracking_code}</p>
                      <p className="text-sm font-medium">
                        {(row.origin ?? "—") + " → " + (row.destination ?? "—")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      {row.status && <Badge>{row.status}</Badge>}
                      <span className="text-xs text-muted-foreground">
                        {new Date(row.created_at).toLocaleDateString("es")}
                      </span>
                    </div>
                  </div>
                ))
              : shipmentOverview.map((s) => (
                  <div
                    key={s.code}
                    className="flex flex-col gap-2 rounded-lg border border-dashed border-border/80 bg-muted/20 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground">{s.code}</p>
                      <p className="text-sm font-medium">{s.route}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      <Badge variant="secondary">{s.status}</Badge>
                      <span className="text-xs text-muted-foreground">ETA: {s.eta}</span>
                    </div>
                  </div>
                ))}
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Progreso por curso</CardTitle>
            <CardDescription>Según tus registros en la base de datos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {snap.courses.map((c) => {
              const pct = snap.progressByCourseId[c.id] ?? 0;
              return (
                <div key={c.id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <Link href={`/courses/${c.slug}`} className="font-medium hover:underline">
                      {c.title}
                    </Link>
                    <span className="text-muted-foreground">{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle>Actividad reciente</CardTitle>
          <CardDescription>Cuestionarios y actualizaciones de progreso.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border/80">
          {snap.activities.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Aún no hay actividad. Abre un curso, lee la lección y completa el cuestionario al final.
            </p>
          ) : (
            snap.activities.map((a) => (
              <div key={a.id} className="flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:justify-between">
                <p className="text-sm">{a.text}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
