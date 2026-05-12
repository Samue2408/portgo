import { createClient } from "@/lib/supabase/server";
import type { ShipmentRow } from "@/types/database";

export async function getShipmentsForUser(userId: string): Promise<ShipmentRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("shipments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) return [];
  return (data as ShipmentRow[]) ?? [];
}

export async function saveShipment(input: {
  userId: string;
  trackingCode: string;
  origin: string;
  destination: string;
  status: string;
  metadata: Record<string, unknown>;
}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { ok: false as const };
  const supabase = await createClient();
  const { error } = await supabase.from("shipments").insert({
    user_id: input.userId,
    tracking_code: input.trackingCode,
    origin: input.origin,
    destination: input.destination,
    status: input.status,
    metadata: input.metadata,
  });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}
