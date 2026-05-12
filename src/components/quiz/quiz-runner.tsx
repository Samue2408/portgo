"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Award, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { QuizDefinition } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { recordQuizCompletion } from "@/features/courses/course-actions";

type Props = {
  quiz: QuizDefinition;
  courseId: string;
  courseSlug: string;
  lessonSlug: string;
};

export function QuizRunner({ quiz, courseId, courseSlug, lessonSlug }: Props) {
  const reduce = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const question = quiz.questions[step];
  const progress = Math.round(((step + (finished ? 1 : 0)) / quiz.questions.length) * 100);
  const isLast = step === quiz.questions.length - 1;
  const xp = score * 15;

  const feedback = useMemo(() => {
    if (!selected) return null;
    return { correct: selected === question.correctOptionId };
  }, [question.correctOptionId, selected]);

  async function handleNext() {
    if (!selected) return;
    const correct = selected === question.correctOptionId;
    const nextScore = score + (correct ? 1 : 0);
    if (!isLast) {
      setScore(nextScore);
      setStep((s) => s + 1);
      setSelected(null);
      return;
    }
    setScore(nextScore);
    setFinished(true);
    setSubmitting(true);
    const res = await recordQuizCompletion({
      courseId,
      courseSlug,
      lessonSlug,
      quizId: quiz.id,
      score: nextScore,
      maxScore: quiz.questions.length,
    });
    setSubmitting(false);
    if (!res.ok) {
      toast.error("result" in res && res.error ? String(res.error) : "No se pudo guardar el resultado");
    } else if ("offline" in res && res.offline) {
      toast.message("Modo sin Supabase", { description: "El puntaje no se guardó en servidor." });
    } else {
      toast.success("Progreso actualizado", { description: `Ganaste ${nextScore * 15} XP de práctica.` });
    }
  }

  function reset() {
    setStep(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setSubmitting(false);
  }

  if (finished) {
    return (
      <Card className="overflow-hidden border-border/80 shadow-sm">
        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-sky-500 to-cyan-400" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="size-5 text-amber-600" />
            Resultado del cuestionario
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{quiz.title}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-base">
              {score} / {quiz.questions.length}
            </Badge>
            <span className="text-sm text-muted-foreground">respuestas correctas</span>
            <Badge className="bg-amber-500 text-amber-950 hover:bg-amber-500">+{xp} XP</Badge>
          </div>
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/25 dark:text-emerald-50">
            Completaste una práctica guiada. La meta es que puedas explicar el concepto con tus propias palabras.
          </p>
          <Button type="button" variant="outline" onClick={reset}>
            <RotateCcw className="mr-2 size-4" />
            Reiniciar práctica
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">{quiz.title}</CardTitle>
          <Badge variant="outline">
            Pregunta {step + 1} de {quiz.questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          key={question.id}
          initial={reduce ? false : { opacity: 0, x: 12 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-base font-medium leading-relaxed">{question.prompt}</p>
          <div className="mt-4 grid gap-2">
            {question.options.map((option) => {
              const active = selected === option.id;
              const correct = selected && option.id === question.correctOptionId;
              const wrong = active && selected !== question.correctOptionId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelected(option.id)}
                  className={`flex items-start justify-between gap-3 rounded-lg border px-3 py-3 text-left text-sm transition-all hover:-translate-y-0.5 ${
                    correct
                      ? "border-emerald-400 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-50"
                      : wrong
                        ? "border-amber-400 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-50"
                        : active
                          ? "border-sky-500 bg-sky-50 text-foreground dark:bg-sky-950/40"
                          : "border-border bg-card hover:bg-muted/60"
                  }`}
                >
                  <span>{option.label}</span>
                  {correct ? <CheckCircle2 className="size-4 shrink-0 text-emerald-600" /> : null}
                  {wrong ? <XCircle className="size-4 shrink-0 text-amber-600" /> : null}
                </button>
              );
            })}
          </div>
          {feedback && selected && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              className={`mt-3 rounded-lg border px-3 py-2 text-sm font-medium ${
                feedback.correct
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/25 dark:text-emerald-300"
                  : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/25 dark:text-amber-300"
              }`}
            >
              {feedback.correct
                ? "Correcto. Esa decisión refleja el concepto clave."
                : "Aún no. Revisa la explicación y compara el caso con el ejemplo de la lección."}
            </motion.p>
          )}
        </motion.div>
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={handleNext} disabled={!selected || submitting}>
            {isLast ? (submitting ? "Guardando..." : "Finalizar") : "Siguiente"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
