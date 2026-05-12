"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { insertQuizResult } from "@/services/quiz-results.service";
import { upsertCourseProgress } from "@/services/progress.service";

export async function recordQuizCompletion(input: {
  courseId: string;
  courseSlug: string;
  lessonSlug: string;
  quizId: string;
  score: number;
  maxScore: number;
}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { ok: true as const, offline: true as const };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "No autenticado" };

  const quizRes = await insertQuizResult({
    userId: user.id,
    quizId: input.quizId,
    courseId: input.courseId,
    score: input.score,
    maxScore: input.maxScore,
  });
  if (!quizRes.ok) {
    return {
      ok: false as const,
      error: "error" in quizRes ? quizRes.error : "No se pudo guardar el resultado",
    };
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("slug,order_index")
    .eq("course_id", input.courseId)
    .order("order_index", { ascending: true });

  const list = lessons ?? [];
  const total = Math.max(1, list.length);
  const idx = Math.max(0, list.findIndex((l) => l.slug === input.lessonSlug));
  const suggested = Math.round(((idx + 1) / total) * 100);
  await upsertCourseProgress(user.id, input.courseId, suggested);

  revalidatePath(`/courses/${input.courseSlug}`);
  revalidatePath(`/courses/${input.courseSlug}/${input.lessonSlug}`);
  revalidatePath("/dashboard");
  revalidatePath("/profile");
  return { ok: true as const };
}
