import { createClient } from "@/lib/supabase/server";
import type { ProgressRow } from "@/types/database";

export async function getProgressForUser(userId: string): Promise<ProgressRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", userId);
    if (error || !data) return [];
    return data as ProgressRow[];
  } catch {
    return [];
  }
}

export async function upsertCourseProgress(
  userId: string,
  courseId: string,
  progressPercentage: number
) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { ok: false as const };
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("progress")
    .select("progress_percentage")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();
  const merged = Math.max(
    existing?.progress_percentage ?? 0,
    Math.min(100, Math.max(0, progressPercentage))
  );
  const { error } = await supabase.from("progress").upsert(
    {
      user_id: userId,
      course_id: courseId,
      progress_percentage: merged,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,course_id" }
  );
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}
