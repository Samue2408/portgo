"use server";

import { createClient } from "@/lib/supabase/server";
import { saveShipment } from "@/services/shipments.service";

export async function saveTrackedShipment(input: {
  trackingCode: string;
  origin: string;
  destination: string;
  status: string;
  metadata: Record<string, unknown>;
}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { ok: false as const, offline: true as const };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "No autenticado" };
  return saveShipment({
    userId: user.id,
    trackingCode: input.trackingCode,
    origin: input.origin,
    destination: input.destination,
    status: input.status,
    metadata: input.metadata,
  });
}
