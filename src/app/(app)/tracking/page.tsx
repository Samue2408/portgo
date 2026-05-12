import { BellRing, MapPinned, PackageCheck, Timer } from "lucide-react";
import { ModulePurpose } from "@/components/module-purpose";
import { TrackingPanel } from "@/features/tracking/tracking-panel";

export default function TrackingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Rastreo de carga</h1>
        <p className="mt-1 text-muted-foreground">
          Simulación educativa para interpretar estados, eventos y tiempos de una operación marítima.
        </p>
      </div>
      <ModulePurpose
        items={[
          {
            title: "Por qué existe",
            text: "Enseña a leer eventos de tracking sin depender de un portal real de naviera.",
            icon: MapPinned,
          },
          {
            title: "Qué aprendes",
            text: "Booking, gate-in, embarque, tránsito, descarga, aduana y entrega final.",
            icon: PackageCheck,
          },
          {
            title: "Uso real",
            text: "Las empresas monitorean carga para preparar camiones, documentos y comunicación.",
            icon: BellRing,
          },
          {
            title: "Por qué importa",
            text: "Un estado entendido a tiempo evita demoras, almacenajes y promesas incumplidas.",
            icon: Timer,
          },
        ]}
      />
      <TrackingPanel />
    </div>
  );
}
