"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LessonBlock } from "@/types/lesson-content";
import { cn } from "@/lib/utils";
import { BookOpen, Lightbulb, AlertTriangle, Info, CheckCircle2, ClipboardCheck, GitBranch, HelpCircle } from "lucide-react";

function CalloutIcon({ variant }: { variant: "info" | "tip" | "warning" }) {
  if (variant === "tip") return <Lightbulb className="size-4 shrink-0 text-amber-600" aria-hidden />;
  if (variant === "warning") return <AlertTriangle className="size-4 shrink-0 text-amber-700" aria-hidden />;
  return <Info className="size-4 shrink-0 text-sky-600" aria-hidden />;
}

function CheckpointBlock({
  question,
  options,
  answer,
  explanation,
}: {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Card className="border-amber-200/70 bg-amber-50/40 shadow-sm dark:border-amber-500/25 dark:bg-amber-950/20">
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="size-5 text-amber-700 dark:text-amber-300" aria-hidden />
          <h3 className="font-semibold">Checkpoint de aprendizaje</h3>
        </div>
        <p className="text-sm font-medium">{question}</p>
        <div className="grid gap-2">
          {options.map((option) => {
            const active = selected === option;
            const correct = selected && option === answer;
            const wrong = active && option !== answer;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                className={cn(
                  "flex gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60",
                  correct && "border-emerald-300 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/25 dark:text-emerald-50",
                  wrong && "border-amber-400 bg-amber-100/70 text-amber-950 dark:bg-amber-950/35 dark:text-amber-50",
                  !correct && !wrong && "border-border/70 bg-card"
                )}
              >
                {correct ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                ) : (
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                )}
                {option}
              </button>
            );
          })}
        </div>
        {selected && (
          <p className="rounded-lg border border-border/70 bg-card px-3 py-2 text-sm leading-relaxed text-muted-foreground">
            {selected === answer ? "Correcto. " : "Todavía no. "}
            {explanation}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function Block({ block }: { block: LessonBlock }) {
  if (block.type === "heading") {
    return <h2 className="text-xl font-semibold tracking-tight text-foreground">{block.text}</h2>;
  }
  if (block.type === "paragraph") {
    return <p className="text-base leading-relaxed text-muted-foreground">{block.text}</p>;
  }
  if (block.type === "list") {
    return (
      <div className="space-y-2">
        {block.title && <p className="text-sm font-medium text-foreground">{block.title}</p>}
        <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.type === "process") {
    return (
      <Card className="border-border/80 shadow-sm">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center gap-2">
            <GitBranch className="size-5 text-sky-600" aria-hidden />
            <h3 className="font-semibold">{block.title}</h3>
          </div>
          <ol className="space-y-4">
            {block.steps.map((step, index) => (
              <li key={step.label} className="grid gap-3 rounded-lg border border-border/70 bg-muted/20 p-3 sm:grid-cols-[2.5rem_1fr]">
                <span className="flex size-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-800 dark:bg-sky-950/50 dark:text-sky-200">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{step.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    );
  }
  if (block.type === "conceptGrid") {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold">{block.title}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.term} className="rounded-lg border border-border/80 bg-card p-4 shadow-sm">
              <p className="font-medium">{item.term}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.explanation}</p>
              <p className="mt-3 rounded-md bg-muted/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                Ejemplo: {item.example}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (block.type === "caseStudy") {
    return (
      <Card className="border-emerald-200/70 bg-emerald-50/40 shadow-sm dark:border-emerald-500/25 dark:bg-emerald-950/20">
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="size-5 text-emerald-700 dark:text-emerald-300" aria-hidden />
            <h3 className="font-semibold">{block.title}</h3>
          </div>
          <div className="grid gap-3 text-sm md:grid-cols-3">
            <div>
              <p className="font-medium text-foreground">Situación</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">{block.situation}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Decisión</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">{block.decision}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Resultado esperado</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">{block.result}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (block.type === "checkpoint") {
    return (
      <CheckpointBlock
        question={block.question}
        options={block.options}
        answer={block.answer}
        explanation={block.explanation}
      />
    );
  }
  const styles = {
    info: "border-sky-200/80 bg-sky-50/80 text-sky-950 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-50",
    tip: "border-amber-200/80 bg-amber-50/80 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/35 dark:text-amber-50",
    warning: "border-orange-200/80 bg-orange-50/80 text-orange-950 dark:border-orange-500/30 dark:bg-orange-950/35 dark:text-orange-50",
  };
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed",
        styles[block.variant]
      )}
    >
      <CalloutIcon variant={block.variant} />
      <p>{block.text}</p>
    </div>
  );
}

export function LessonContentBody({
  blocks,
  objectives,
  durationMin,
}: {
  blocks: LessonBlock[];
  objectives: string[];
  durationMin: number;
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1">
          <BookOpen className="size-3.5" aria-hidden />
          {durationMin} min lectura
        </Badge>
        {objectives.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {objectives.length} objetivo{objectives.length === 1 ? "" : "s"} de aprendizaje
          </span>
        )}
      </div>
      {objectives.length > 0 && (
        <Card className="border-sky-200/60 bg-sky-50/40 dark:border-sky-500/25 dark:bg-sky-950/25">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold text-foreground">Objetivos</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {objectives.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sky-600" />
                  {o}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      <Separator />
      <div className="space-y-6">
        {blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </div>
  );
}
