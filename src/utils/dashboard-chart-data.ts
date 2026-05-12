import type { QuizResultRow } from "@/types/database";

export type ChartPoint = { mes: string; actividad: number };

/** Últimos 6 meses con conteo de cuestionarios completados (para gráfico del panel). */
export function buildQuizActivityByMonth(results: QuizResultRow[]): ChartPoint[] {
  const now = new Date();
  const buckets: { key: string; mes: string; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    const mes = d
      .toLocaleDateString("es", { month: "short" })
      .replace(".", "")
      .replace(/^./, (c) => c.toUpperCase());
    buckets.push({ key, mes, count: 0 });
  }
  for (const r of results) {
    const d = new Date(r.completed_at);
    if (Number.isNaN(d.getTime())) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    const b = buckets.find((x) => x.key === key);
    if (b) b.count += 1;
  }
  return buckets.map((b) => ({ mes: b.mes, actividad: b.count }));
}

export function sixMonthsAgoIso(): string {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  return d.toISOString();
}
