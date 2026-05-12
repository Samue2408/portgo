export type LessonBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "callout"; variant: "info" | "tip" | "warning"; text: string }
  | { type: "process"; title: string; steps: { label: string; detail: string }[] }
  | { type: "conceptGrid"; title: string; items: { term: string; explanation: string; example: string }[] }
  | { type: "caseStudy"; title: string; situation: string; decision: string; result: string }
  | { type: "checkpoint"; question: string; options: string[]; answer: string; explanation: string };

export type LessonEnrichment = {
  durationMin: number;
  objectives: string[];
  blocks: LessonBlock[];
};
