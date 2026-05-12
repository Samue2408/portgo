"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CourseCardModel = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  progress: number;
  lessonCount: number;
  estMinutes: number;
};

export function CoursesGrid({ courses }: { courses: CourseCardModel[] }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((c, index) => (
        <motion.div
          key={c.id}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="group flex h-full flex-col overflow-hidden border-border/80 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="h-1.5 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 opacity-90 transition-opacity group-hover:opacity-100" />
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex size-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-200">
                  <BookOpen className="size-5" aria-hidden />
                </div>
                {c.category && (
                  <Badge variant="secondary" className="shrink-0">
                    {c.category}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl leading-snug transition-colors group-hover:text-sky-800 dark:group-hover:text-sky-200">
                {c.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">{c.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-4">
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>{c.lessonCount} lecciones</span>
                <span>·</span>
                <span>~{c.estMinutes} min contenido</span>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>Tu progreso</span>
                  <span>{c.progress}%</span>
                </div>
                <Progress value={c.progress} className="h-2" />
              </div>
              <Link
                href={`/courses/${c.slug}`}
                className={cn(buttonVariants(), "group/btn w-full justify-between gap-2")}
              >
                Entrar al curso
                <ChevronRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
