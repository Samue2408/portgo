import Link from "next/link";
import { BookOpenCheck, Boxes, Globe2, Trophy } from "lucide-react";
import { getCoursesWithLessons } from "@/services/courses.service";
import { createClient } from "@/lib/supabase/server";
import { getProgressForUser } from "@/services/progress.service";
import { buttonVariants } from "@/components/ui/button";
import { estimateCourseDurationMin } from "@/data/lesson-library";
import { CoursesGrid, type CourseCardModel } from "@/features/courses/courses-grid";
import { ModulePurpose } from "@/components/module-purpose";

export default async function CoursesPage() {
  const courses = await getCoursesWithLessons();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const progress = user?.id ? await getProgressForUser(user.id) : [];
  const map = new Map(progress.map((p) => [p.course_id, p.progress_percentage]));

  const models: CourseCardModel[] = courses.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    category: c.category,
    progress: map.get(c.id) ?? 0,
    lessonCount: c.lessons.length,
    estMinutes: estimateCourseDurationMin(
      c.slug,
      c.lessons.map((l) => l.slug)
    ),
  }));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Cursos</h1>
          <p className="mt-1 text-muted-foreground">
            Academia logística en español con lecciones guiadas, ejemplos visuales, quizzes y retos para aprender haciendo.
          </p>
        </div>
        <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
          Volver al panel
        </Link>
      </div>
      <ModulePurpose
        items={[
          {
            title: "Por qué existe",
            text: "Convierte temas complejos de comercio internacional en rutas cortas y fáciles de seguir.",
            icon: BookOpenCheck,
          },
          {
            title: "Qué aprendes",
            text: "Puertos, contenedores, aduanas, tracking, documentos y decisiones logísticas básicas.",
            icon: Boxes,
          },
          {
            title: "Uso real",
            text: "Te prepara para conversar con forwarders, proveedores, agentes y clientes con más claridad.",
            icon: Globe2,
          },
          {
            title: "Gamificación",
            text: "Cada quiz y simulación refuerza conceptos con progreso, XP y práctica inmediata.",
            icon: Trophy,
          },
        ]}
      />
      <CoursesGrid courses={models} />
    </div>
  );
}
