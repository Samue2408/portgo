"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LessonRowModel = {
  id: string;
  slug: string;
  title: string;
  preview: string;
  durationMin: number;
};

export function CourseLessonsList({ courseSlug, lessons }: { courseSlug: string; lessons: LessonRowModel[] }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Lecciones</h2>
      {lessons.map((l, index) => (
        <motion.div
          key={l.id}
          initial={reduce ? false : { opacity: 0, x: -12 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="group border-border/80 shadow-sm transition-all hover:border-sky-300/50 hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-1 font-normal">
                    <Clock className="size-3" aria-hidden />
                    {l.durationMin} min
                  </Badge>
                  <span className="text-xs text-muted-foreground">Lección {index + 1}</span>
                </div>
                <h3 className="text-base font-semibold leading-snug group-hover:text-sky-800 dark:group-hover:text-sky-200">
                  {l.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{l.preview}</p>
              </div>
              <Link
                href={`/courses/${courseSlug}/${l.slug}`}
                className={cn(buttonVariants({ size: "sm" }), "shrink-0 gap-1 self-start sm:self-center")}
              >
                Abrir
                <ArrowRight className="size-3.5 opacity-70 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
