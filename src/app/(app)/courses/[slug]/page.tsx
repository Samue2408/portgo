import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getCourseBySlug } from "@/services/courses.service";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mergeLessonContent, getLessonPreview } from "@/lib/merge-lesson-content";
import { estimateCourseDurationMin } from "@/data/lesson-library";
import { CourseLessonsList } from "@/features/courses/course-lessons-list";

type Props = { params: { slug: string } };

export default async function CourseDetailPage({ params }: Props) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();
  const lessons = [...course.lessons].sort((a, b) => a.order_index - b.order_index);
  const totalMin = estimateCourseDurationMin(
    course.slug,
    lessons.map((l) => l.slug)
  );

  const lessonModels = lessons.map((l) => {
    const m = mergeLessonContent(l, course.slug);
    return {
      id: l.id,
      slug: l.slug,
      title: l.title,
      preview: getLessonPreview(l, course.slug, 200),
      durationMin: m.durationMin,
    };
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <Link
        href="/courses"
        className={cn(buttonVariants({ variant: "ghost" }), "inline-flex w-fit gap-2 px-0")}
      >
        <ArrowLeft className="size-4" />
        Volver a cursos
      </Link>

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-sky-50/30 p-6 shadow-sm dark:to-sky-950/20">
        <div className="flex flex-wrap items-center gap-2">
          {course.category && <Badge>{course.category}</Badge>}
          <Badge variant="outline" className="gap-1">
            <BookOpen className="size-3.5" aria-hidden />
            {lessons.length} lecciones
          </Badge>
          <Badge variant="secondary">~{totalMin} min de contenido</Badge>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{course.title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{course.description}</p>
      </div>

      <Card className="border-dashed border-sky-200/60 bg-sky-50/25 dark:border-sky-500/25 dark:bg-sky-950/20">
        <CardContent className="pt-6 text-sm leading-relaxed text-muted-foreground">
          Recorre las lecciones en orden o salta a la que necesites. Cada bloque con cuestionario actualiza tu progreso
          al enviar respuestas.
        </CardContent>
      </Card>

      <CourseLessonsList courseSlug={course.slug} lessons={lessonModels} />
    </div>
  );
}
