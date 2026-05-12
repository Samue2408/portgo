"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  CheckCircle2,
  CircleDotDashed,
  Container,
  FileSearch,
  GripVertical,
  RotateCcw,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const correctOrder = [
  "Cotización y reserva de equipamiento",
  "Preparación documental y embalaje",
  "Transporte terrestre hacia puerto",
  "Gate-in y recepción en terminal",
  "VGM, embarque y emisión de BL",
  "Zarpe y tránsito marítimo",
  "Descarga en puerto de destino",
  "Aduana de importación y retiro",
  "Entrega al almacén del importador",
];

const cargoMatches = [
  { cargo: "Banano fresco", answer: "Reefer", hint: "Necesita temperatura controlada durante el viaje." },
  { cargo: "Camisetas empacadas", answer: "Dry container", hint: "Carga seca general, estable y embalada." },
  { cargo: "Maquinaria sobredimensionada", answer: "Open top", hint: "Puede requerir carga superior por altura." },
  { cargo: "Aceite vegetal a granel", answer: "Tank container", hint: "Líquido a granel bajo manejo especializado." },
];

const containerOptions = ["Dry container", "Reefer", "Open top", "Tank container"];

const customsScenarios = [
  {
    title: "Factura y packing list coinciden",
    detail: "La descripción, cantidades y pesos son consistentes. No hay alerta documental.",
    answer: "Liberar con revisión estándar",
  },
  {
    title: "Descripción: 'repuestos varios'",
    detail: "La descripción es demasiado vaga para clasificar con confianza.",
    answer: "Solicitar aclaración documental",
  },
  {
    title: "Carga sensible sin certificado",
    detail: "El producto requiere permiso sanitario y no aparece adjunto.",
    answer: "Revisión documental y posible inspección",
  },
];

const customsOptions = [
  "Liberar con revisión estándar",
  "Solicitar aclaración documental",
  "Revisión documental y posible inspección",
];

function shuffle<T>(arr: T[], seed: number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (seed + i * 31) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ExportStepsGame() {
  const reduce = useReducedMotion() ?? false;
  const [seed, setSeed] = useState(7);
  const steps = useMemo(() => shuffle(correctOrder, seed), [seed]);
  const [order, setOrder] = useState<string[]>(steps);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [sequenceSolved, setSequenceSolved] = useState(false);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [customs, setCustoms] = useState<Record<string, string>>({});

  useEffect(() => {
    setOrder(steps);
    setSequenceSolved(false);
  }, [steps]);

  const matchScore = cargoMatches.filter((item) => matches[item.cargo] === item.answer).length;
  const customsScore = customsScenarios.filter((item) => customs[item.title] === item.answer).length;
  const xp = (sequenceSolved ? 40 : 0) + matchScore * 10 + customsScore * 10;
  const progress = Math.round((xp / 120) * 100);

  function move(idx: number, dir: -1 | 1) {
    const next = idx + dir;
    if (next < 0 || next >= order.length) return;
    const copy = [...order];
    [copy[idx], copy[next]] = [copy[next], copy[idx]];
    setOrder(copy);
  }

  function dropOn(idx: number) {
    if (dragIndex === null || dragIndex === idx) return;
    const copy = [...order];
    const [item] = copy.splice(dragIndex, 1);
    copy.splice(idx, 0, item);
    setOrder(copy);
    setDragIndex(null);
  }

  function checkSequence() {
    const ok = order.every((s, i) => s === correctOrder[i]);
    setSequenceSolved(ok);
    if (ok) {
      toast.success("Secuencia correcta", {
        description: "Ganaste 40 XP por ordenar el flujo exportador.",
      });
    } else {
      toast.error("Aún no coincide", {
        description: "Pista: primero se reserva y documenta; al final se libera y entrega.",
      });
    }
  }

  function validateMatches() {
    if (matchScore === cargoMatches.length) {
      toast.success("Emparejamiento perfecto", { description: "Elegiste el equipo correcto para cada carga." });
    } else {
      toast.message("Buen avance", { description: `${matchScore}/${cargoMatches.length} decisiones correctas.` });
    }
  }

  function validateCustoms() {
    if (customsScore === customsScenarios.length) {
      toast.success("Decisiones aduaneras correctas", { description: "Aplicaste control proporcional al riesgo." });
    } else {
      toast.message("Revisa los casos", { description: `${customsScore}/${customsScenarios.length} decisiones correctas.` });
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/80 shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-sky-600" />
                <CardTitle>Laboratorio de decisiones logísticas</CardTitle>
              </div>
              <CardDescription className="mt-2">
                Gana XP resolviendo retos cortos: ordena procesos, elige contenedores y decide controles aduaneros.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="w-fit gap-1 text-sm">
              <BadgeCheck className="size-4" />
              {xp} XP
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
      </Card>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Route className="size-5 text-sky-600" />
            <CardTitle>Reto 1: ordena la exportación marítima</CardTitle>
          </div>
          <CardDescription>
            Arrastra las etapas o usa las flechas. Es una simplificación educativa de un flujo real.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setSeed((s) => s + 1)}>
              <RotateCcw className="mr-2 size-4" />
              Barajar
            </Button>
            <Button type="button" size="sm" onClick={checkSequence}>
              <CheckCircle2 className="mr-2 size-4" />
              Validar
            </Button>
          </div>
          <ol className="space-y-2">
            {order.map((text, idx) => (
              <motion.li
                key={text}
                layout={!reduce}
                draggable
                onDragStart={() => setDragIndex(idx)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => dropOn(idx)}
                onDragEnd={() => setDragIndex(null)}
                className={cn(
                  "flex items-start gap-2 rounded-lg border border-border/80 bg-card p-3 text-sm shadow-sm transition-colors hover:border-sky-300 hover:bg-sky-50/40 dark:hover:bg-sky-950/20",
                  dragIndex === idx && "opacity-50"
                )}
              >
                <GripVertical className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="mt-0.5 font-mono text-xs text-muted-foreground">{idx + 1}</span>
                <span className="flex-1 leading-snug">{text}</span>
                <div className="flex flex-col gap-1">
                  <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => move(idx, -1)}>
                    <ArrowUp className="size-4" />
                  </Button>
                  <Button type="button" size="icon" variant="ghost" className="size-8" onClick={() => move(idx, 1)}>
                    <ArrowDown className="size-4" />
                  </Button>
                </div>
              </motion.li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Container className="size-5 text-sky-600" />
            <CardTitle>Reto 2: carga vs contenedor</CardTitle>
          </div>
          <CardDescription>Selecciona el equipo más razonable para cada caso y revisa la pista.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            {cargoMatches.map((item) => {
              const selected = matches[item.cargo];
              const correct = selected === item.answer;
              return (
                <div
                  key={item.cargo}
                  className={cn(
                    "rounded-lg border border-border/80 bg-card p-4 transition-colors",
                    selected && (correct ? "border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20" : "border-amber-300 bg-amber-50/50 dark:bg-amber-950/20")
                  )}
                >
                  <p className="font-medium">{item.cargo}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {containerOptions.map((option) => (
                      <Button
                        key={option}
                        type="button"
                        size="sm"
                        variant={selected === option ? "secondary" : "outline"}
                        onClick={() => setMatches((current) => ({ ...current, [item.cargo]: option }))}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <Button type="button" size="sm" onClick={validateMatches}>
            <CheckCircle2 className="mr-2 size-4" />
            Validar contenedores
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-sky-600" />
            <CardTitle>Reto 3: decisión aduanera</CardTitle>
          </div>
          <CardDescription>Elige una acción proporcional al riesgo del caso.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {customsScenarios.map((scenario) => {
            const selected = customs[scenario.title];
            const correct = selected === scenario.answer;
            return (
              <div key={scenario.title} className="rounded-lg border border-border/80 bg-card p-4">
                <div className="flex gap-3">
                  <FileSearch className="mt-0.5 size-5 shrink-0 text-sky-600" />
                  <div>
                    <p className="font-medium">{scenario.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{scenario.detail}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {customsOptions.map((option) => (
                    <Button
                      key={option}
                      type="button"
                      size="sm"
                      variant={selected === option ? "secondary" : "outline"}
                      onClick={() => setCustoms((current) => ({ ...current, [scenario.title]: option }))}
                    >
                      {selected === option && correct ? <CheckCircle2 className="mr-2 size-4 text-emerald-600" /> : null}
                      {selected === option && !correct ? <CircleDotDashed className="mr-2 size-4 text-amber-600" /> : null}
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
          <Button type="button" size="sm" onClick={validateCustoms}>
            <CheckCircle2 className="mr-2 size-4" />
            Validar decisiones
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
