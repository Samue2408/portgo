"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartPoint } from "@/utils/dashboard-chart-data";

const fallback: ChartPoint[] = [
  { mes: "Ene", actividad: 0 },
  { mes: "Feb", actividad: 0 },
  { mes: "Mar", actividad: 0 },
  { mes: "Abr", actividad: 0 },
  { mes: "May", actividad: 0 },
  { mes: "Jun", actividad: 0 },
];

type Props = {
  data: ChartPoint[];
  useRealData?: boolean;
};

export function DashboardActivityChart({ data, useRealData = false }: Props) {
  const chart = data.length > 0 ? data : fallback;
  const gradientId = useRealData ? "colorActividadReal" : "colorActividad";
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.55 0.14 250)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="oklch(0.55 0.14 250)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
          <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" allowDecimals={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
            labelFormatter={(l) => `Mes: ${l}`}
            formatter={(value) => [`${Number(value ?? 0)}`, "Cuestionarios completados"]}
          />
          <Area
            type="monotone"
            dataKey="actividad"
            stroke="oklch(0.45 0.12 250)"
            fillOpacity={1}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
