import { createClient } from "@/lib/supabase/server";
import type { QuizResultRow } from "@/types/database";

export async function insertQuizResult(input: {
  userId: string;
  quizId: string;
  courseId: string | null;
  score: number;
  maxScore: number;
}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { ok: false as const };
  const supabase = await createClient();
  const { error } = await supabase.from("quiz_results").insert({
    user_id: input.userId,
    quiz_id: input.quizId,
    course_id: input.courseId,
    score: input.score,
    max_score: input.maxScore,
  });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}

export async function getRecentQuizResults(userId: string, limit = 8) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as QuizResultRow[];
}

/** Para el gráfico del panel: resultados desde una fecha ISO. */
export async function getQuizResultsSince(userId: string, sinceIso: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", userId)
    .gte("completed_at", sinceIso)
    .order("completed_at", { ascending: true });
  if (error) return [];
  return (data ?? []) as QuizResultRow[];
}

export async function getQuizResultsCount(userId: string): Promise<number> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return 0;
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("quiz_results")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) return 0;
  return count ?? 0;
}
