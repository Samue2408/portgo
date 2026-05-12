"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Info, Ship, TrendingUp } from "lucide-react";
import { PORTS } from "@/data/ports";
import { simulateQuote } from "@/utils/quote";
import type { CargoType, ContainerType } from "@/types/logistics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const cargoLabels: Record<CargoType, string> = {
  general: "Carga general",
  refrigerated: "Refrigerada",
  hazardous: "Peligrosa (demo)",
};

const containerLabels: Record<ContainerType, string> = {
  "20dc": "20' dry",
  "40dc": "40' dry",
  "40hc": "40' high cube",
};

export function QuotePanel() {
  const reduce = useReducedMotion() ?? false;
  const [originId, setOriginId] = useState(PORTS[0].id);
  const [destId, setDestId] = useState(PORTS[7].id);
  const [cargo, setCargo] = useState<CargoType>("general");
  const [container, setContainer] = useState<ContainerType>("40hc");
  const [weight, setWeight] = useState("12000");

  const origin = useMemo(() => PORTS.find((p) => p.id === originId)!, [originId]);
  const destination = useMemo(() => PORTS.find((p) => p.id === destId)!, [destId]);

  const result = useMemo(() => {
    const w = Number(weight.replace(",", ".")) || 0;
    return simulateQuote({
      origin,
      destination,
      weightKg: w,
      cargoType: cargo,
      containerType: container,
    });
  }, [origin, destination, weight, cargo, container]);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Ship className="size-5 text-sky-600" />
            <CardTitle>Cotización simulada</CardTitle>
          </div>
          <CardDescription>
            Ajusta variables y observa cómo cambia el costo. Es una herramienta educativa, no una oferta comercial.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Puerto de origen</Label>
              <Select value={originId} onValueChange={setOriginId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona origen" />
                </SelectTrigger>
                <SelectContent>
                  {PORTS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Puerto de destino</Label>
              <Select value={destId} onValueChange={setDestId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona destino" />
                </SelectTrigger>
                <SelectContent>
                  {PORTS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tipo de carga</Label>
              <Select value={cargo} onValueChange={(value) => setCargo(value as CargoType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de carga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">{cargoLabels.general}</SelectItem>
                  <SelectItem value="refrigerated">{cargoLabels.refrigerated}</SelectItem>
                  <SelectItem value="hazardous">{cargoLabels.hazardous}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de contenedor</Label>
              <Select value={container} onValueChange={(value) => setContainer(value as ContainerType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de contenedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20dc">{containerLabels["20dc"]}</SelectItem>
                  <SelectItem value="40dc">{containerLabels["40dc"]}</SelectItem>
                  <SelectItem value="40hc">{containerLabels["40hc"]}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Peso estimado (kg)</Label>
            <Input id="weight" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-3 text-sm text-sky-950 dark:border-sky-500/30 dark:bg-sky-950/25 dark:text-sky-50">
            <div className="flex gap-2">
              <Info className="mt-0.5 size-4 shrink-0" />
              <p>Tip educativo: compara una carga general con una refrigerada para ver cómo el equipo especializado aumenta el costo.</p>
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setWeight(String(8000 + Math.round(Math.random() * 8000)))}
          >
            Aleatorizar peso de práctica
          </Button>
        </CardContent>
      </Card>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card className="h-full border-border/80 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Resumen del envío</CardTitle>
              <Badge variant="secondary">Demo</Badge>
            </div>
            <CardDescription>Valores orientativos calculados en el navegador.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-sm">
            <div>
              <p className="text-muted-foreground">Ruta sugerida</p>
              <p className="mt-1 flex flex-wrap items-center gap-2 text-lg font-semibold">
                {origin.code}
                <ArrowRight className="size-4 text-muted-foreground" />
                {destination.code}
              </p>
              <p className="mt-1 text-muted-foreground">{result.suggestedRouteLabel}</p>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border/80 bg-muted/30 p-4">
                <p className="text-muted-foreground">Distancia aproximada</p>
                <p className="mt-1 text-2xl font-semibold">{result.distanceKm.toLocaleString("es")} km</p>
              </div>
              <div className="rounded-lg border border-border/80 bg-muted/30 p-4">
                <p className="text-muted-foreground">Precio estimado</p>
                <p className="mt-1 text-2xl font-semibold">USD {result.estimatedUsd.toLocaleString("es")}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border/80 bg-card p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-sky-600" />
                <p className="font-medium">Lectura logística</p>
              </div>
              <p className="mt-2 text-muted-foreground">
                Para {cargoLabels[cargo].toLowerCase()} en contenedor {containerLabels[container]}, el tránsito estimado es de{" "}
                <span className="font-medium text-foreground">
                  {result.transitDaysMin}-{result.transitDaysMax} días
                </span>
                . En una operación real se sumarían recargos, impuestos, gastos portuarios y disponibilidad de equipo.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
