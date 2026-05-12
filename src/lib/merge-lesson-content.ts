import type { LessonRow } from "@/types/database";
import type { LessonBlock } from "@/types/lesson-content";
import { getLessonEnrichment } from "@/data/lesson-library";

export type MergedLessonContent = {
  summary: string;
  durationMin: number;
  objectives: string[];
  blocks: LessonBlock[];
};

type ContentJson = {
  summary?: string;
  blocks?: LessonBlock[];
  durationMin?: number;
  objectives?: string[];
};

function isBlockArray(x: unknown): x is LessonBlock[] {
  return Array.isArray(x) && x.length > 0 && typeof x[0] === "object" && x[0] !== null && "type" in (x[0] as object);
}

export function mergeLessonContent(lesson: LessonRow, courseSlug: string): MergedLessonContent {
  const j = lesson.content_json as ContentJson;
  const enrich = getLessonEnrichment(courseSlug, lesson.slug);
  const summary =
    typeof j.summary === "string" && j.summary.length > 0
      ? j.summary
      : enrich?.objectives?.[0] ??
        "Contenido introductorio para operaciones logísticas y comercio exterior.";
  let blocks: LessonBlock[] = [];
  if (isBlockArray(j.blocks)) {
    blocks = j.blocks;
  } else if (enrich?.blocks?.length) {
    blocks = enrich.blocks;
  } else {
    blocks = [{ type: "paragraph", text: summary }];
  }
  const objectives =
    Array.isArray(j.objectives) && j.objectives.length > 0
      ? (j.objectives as string[])
      : enrich?.objectives ?? [];
  const durationMin =
    typeof j.durationMin === "number" && j.durationMin > 0
      ? j.durationMin
      : enrich?.durationMin ?? 12;
  return { summary, durationMin, objectives, blocks };
}

export function getLessonPreview(lesson: LessonRow, courseSlug: string, maxLen = 160): string {
  const m = mergeLessonContent(lesson, courseSlug);
  const first = m.blocks.find((b) => b.type === "paragraph");
  const text = first && first.type === "paragraph" ? first.text : m.summary;
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trim()}…`;
}
