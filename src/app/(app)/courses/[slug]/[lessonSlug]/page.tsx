import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLessonBySlugs } from "@/services/courses.service";
import { getLessonQuizKey, lessonQuizzes } from "@/data/quizzes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import { mergeLessonContent } from "@/lib/merge-lesson-content";
import { LessonContentBody } from "@/features/courses/lesson-content-body";

type Props = { params: { slug: string; lessonSlug: string } };

export default async function LessonPage({ params }: Props) {
  const res = await getLessonBySlugs(params.slug, params.lessonSlug);
  if (!res) notFound();
  const { course, lesson } = res;
  const key = getLessonQuizKey(course.slug, lesson.slug);
  const quiz = lessonQuizzes[key];

  const merged = mergeLessonContent(lesson, course.slug);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <Link
        href={`/courses/${course.slug}`}
        className={cn(buttonVariants({ variant: "ghost" }), "inline-flex w-fit gap-2 px-0")}
      >
        <ArrowLeft className="size-4" />
        Volver al curso
      </Link>
      <div>
        <p className="text-sm text-muted-foreground">{course.title}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">{lesson.title}</h1>
          <Badge variant="secondary">Lección</Badge>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{merged.summary}</p>
      </div>

      <LessonContentBody
        blocks={merged.blocks}
        objectives={merged.objectives}
        durationMin={merged.durationMin}
      />

      <Card className="border-border/80 bg-muted/20 shadow-sm">
        <CardContent className="pt-6 text-sm leading-relaxed text-muted-foreground">
          Contenido educativo de demostración. No sustituye asesoría legal, aduanera ni contratación con transportistas
          reales.
        </CardContent>
      </Card>
      {quiz ? (
        <QuizRunner quiz={quiz} courseId={course.id} courseSlug={course.slug} lessonSlug={lesson.slug} />
      ) : (
        <Card className="border-dashed border-border/80">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No hay cuestionario publicado para esta lección todavía.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
