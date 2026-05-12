import { createClient } from "@/lib/supabase/server";
import type { ProfileRow } from "@/types/database";

export async function getProfile(userId: string): Promise<ProfileRow | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (error) return null;
    return data as ProfileRow | null;
  } catch {
    return null;
  }
}
