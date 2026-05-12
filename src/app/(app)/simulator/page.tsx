import { BrainCircuit, Gamepad2, ListChecks, Workflow } from "lucide-react";
import { ModulePurpose } from "@/components/module-purpose";
import { ExportStepsGame } from "@/features/simulator/export-steps-game";

export default function SimulatorPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Simulador logístico</h1>
        <p className="mt-1 text-muted-foreground">
          Practica decisiones reales en retos cortos: ordenar procesos, elegir contenedores y evaluar casos aduaneros.
        </p>
      </div>
      <ModulePurpose
        items={[
          {
            title: "Por qué existe",
            text: "Aprender logística es más fácil cuando puedes probar decisiones y ver consecuencias.",
            icon: Gamepad2,
          },
          {
            title: "Qué aprendes",
            text: "Secuencias operativas, selección de equipo y criterios básicos de control documental.",
            icon: ListChecks,
          },
          {
            title: "Uso real",
            text: "Entrena el pensamiento que usan equipos de operaciones para priorizar y coordinar.",
            icon: Workflow,
          },
          {
            title: "Por qué importa",
            text: "Las buenas decisiones reducen costos, retrasos y errores antes de que lleguen al puerto.",
            icon: BrainCircuit,
          },
        ]}
      />
      <ExportStepsGame />
    </div>
  );
}
