"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { CalendarClock, CheckCircle2, MapPinned, Save, Search } from "lucide-react";
import { simulateTracking, type SimulatedTracking } from "@/utils/tracking";
import { TRACKING_STAGES } from "@/types/logistics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { saveTrackedShipment } from "@/features/tracking/tracking-actions";

const TrackingMap = dynamic(
  () => import("@/features/tracking/tracking-map").then((m) => m.TrackingMap),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-xl bg-muted" /> }
);

export function TrackingPanel() {
  const [code, setCode] = useState("DEMO-PORTGO-1024");
  const [result, setResult] = useState<SimulatedTracking | null>(null);
  const [saving, setSaving] = useState(false);

  const run = useCallback(() => {
    setResult(simulateTracking(code || "DEMO"));
  }, [code]);

  const currentLabel = useMemo(() => {
    if (!result) return "";
    return TRACKING_STAGES.find((s) => s.key === result.currentStage)?.label ?? "";
  }, [result]);

  const doneCount = result?.events.filter((event) => event.done).length ?? 0;
  const progress = result ? Math.round((doneCount / result.events.length) * 100) : 0;

  async function save() {
    if (!result) return;
    setSaving(true);
    const res = await saveTrackedShipment({
      trackingCode: result.code,
      origin: result.origin,
      destination: result.destination,
      status: currentLabel,
      metadata: { events: result.events, eta: result.etaLabel },
    });
    setSaving(false);
    if (!res.ok) {
      if ("offline" in res && res.offline) {
        toast.message("Sin conexión a Supabase", { description: "Configura variables de entorno para guardar." });
      } else {
        toast.error("No se pudo guardar el envío");
      }
    } else {
      toast.success("Rastreo guardado", { description: "Lo verás en tu panel principal." });
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
      <Card className="border-border/80 shadow-sm lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="size-5 text-sky-600" />
            <CardTitle>Consulta educativa</CardTitle>
          </div>
          <CardDescription>
            Ingresa cualquier código y PortGo generará una historia logística coherente para practicar estados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Código de seguimiento</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ej. DEMO-PORTGO-1024"
            />
          </div>
          <Button className="w-full gap-2" type="button" onClick={run}>
            <Search className="size-4" />
            Consultar estado
          </Button>
          <Button className="w-full gap-2" variant="outline" type="button" disabled={!result || saving} onClick={save}>
            <Save className="size-4" />
            {saving ? "Guardando..." : "Guardar en mi perfil"}
          </Button>
          <div className="rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground">
            Lee el estado como una señal operativa: si está en aduana, prepara documentos; si fue descargado, coordina retiro.
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6 lg:col-span-3">
        {result ? (
          <>
            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-xl">Envío {result.code}</CardTitle>
                  <Badge>{currentLabel}</Badge>
                </div>
                <CardDescription>
                  Origen: {result.origin} · Destino: {result.destination}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border/80 bg-muted/30 p-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarClock className="size-4" />
                      Llegada estimada
                    </div>
                    <p className="mt-1 font-medium">{result.etaLabel}</p>
                  </div>
                  <div className="rounded-lg border border-border/80 bg-muted/30 p-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="size-4" />
                      Avance del proceso
                    </div>
                    <Progress value={progress} className="mt-3 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle>Línea de tiempo</CardTitle>
                <CardDescription>Cada evento representa una decisión logística posible.</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="relative space-y-6 border-l border-border pl-6">
                  {result.events.map((ev) => (
                    <li key={ev.stage} className="relative">
                      <span
                        className={`absolute -left-[9px] top-1.5 size-3 rounded-full border-2 ${
                          ev.done ? "border-sky-600 bg-sky-600" : "border-muted bg-background"
                        }`}
                      />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-medium">{ev.label}</p>
                        <span className="text-xs text-muted-foreground">{ev.date}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPinned className="size-5 text-sky-600" />
                  <CardTitle>Mapa ilustrativo</CardTitle>
                </div>
                <CardDescription>Marcadores de origen y destino. No usa AIS ni ubicación real del buque.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-hidden rounded-xl">
                <TrackingMap from={result.originCoords} to={result.destinationCoords} />
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="border-dashed border-border/80">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Consulta un código para construir una línea de tiempo logística de práctica.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
