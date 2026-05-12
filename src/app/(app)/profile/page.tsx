import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/services/profile.service";
import { getCoursesWithLessons } from "@/services/courses.service";
import { getProgressForUser } from "@/services/progress.service";
import { getRecentQuizResults } from "@/services/quiz-results.service";
import { getShipmentsForUser } from "@/services/shipments.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = user?.id ? await getProfile(user.id) : null;
  const courses = await getCoursesWithLessons();
  const progress = user?.id ? await getProgressForUser(user.id) : [];
  const quizzes = user?.id ? await getRecentQuizResults(user.id) : [];
  const shipments = user?.id ? await getShipmentsForUser(user.id) : [];

  const initial = (profile?.full_name ?? user?.email ?? "U").slice(0, 2).toUpperCase();
  const avg =
    progress.length === 0
      ? 0
      : Math.round(progress.reduce((a, p) => a + p.progress_percentage, 0) / progress.length);

  const badges: { label: string; desc: string }[] = [];
  if (avg >= 25) badges.push({ label: "Explorador portuario", desc: "Progreso promedio ≥ 25%" });
  if (quizzes.length >= 1) badges.push({ label: "Practicante", desc: "Completaste al menos un quiz" });
  if (shipments.length >= 1) badges.push({ label: "Rastreador", desc: "Guardaste un envío simulado" });

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Perfil</h1>
        <p className="mt-1 text-muted-foreground">Tu información, insignias y actividad reciente en PortGo.</p>
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <Avatar className="size-16">
            <AvatarFallback className="text-lg">{initial}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{profile?.full_name ?? "Usuario"}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
            <p className="mt-2 text-xs text-muted-foreground">
              Progreso promedio en cursos: <span className="font-semibold text-foreground">{avg}%</span>
            </p>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle>Insignias</CardTitle>
          <CardDescription>Desbloqueadas automáticamente según tu actividad (MVP).</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {badges.length === 0 ? (
            <p className="text-sm text-muted-foreground">Completa cursos o guarda un rastreo para ganar insignias.</p>
          ) : (
            badges.map((b) => (
              <Badge key={b.label} variant="secondary" className="px-3 py-2 text-sm">
                {b.label}: {b.desc}
              </Badge>
            ))
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Progreso por curso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {courses.map((c) => {
              const pct = progress.find((p) => p.course_id === c.id)?.progress_percentage ?? 0;
              return (
                <div key={c.id} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{c.title}</span>
                  <span className="font-medium">{pct}%</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Quizzes recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {quizzes.length === 0 ? (
              <p className="text-muted-foreground">Aún no registramos resultados en la base de datos.</p>
            ) : (
              quizzes.map((q) => (
                <div key={q.id} className="flex justify-between gap-2">
                  <span className="truncate text-muted-foreground">{q.quiz_id}</span>
                  <span className="font-medium">
                    {q.score}/{q.max_score}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle>Envíos guardados (simulación)</CardTitle>
          <CardDescription>Aparecen cuando usas “Guardar en mi perfil” en Rastreo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {shipments.length === 0 ? (
            <p className="text-muted-foreground">No hay envíos guardados todavía.</p>
          ) : (
            shipments.map((s) => (
              <div key={s.id}>
                <div className="flex flex-wrap justify-between gap-2">
                  <span className="font-medium">{s.tracking_code}</span>
                  <Badge variant="outline">{s.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {s.origin} → {s.destination}
                </p>
                <Separator className="my-3" />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
