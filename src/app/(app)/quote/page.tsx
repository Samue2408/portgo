import { Calculator, DollarSign, Route, ShipWheel } from "lucide-react";
import { ModulePurpose } from "@/components/module-purpose";
import { QuotePanel } from "@/features/quote/quote-panel";

export default function QuotePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Cotización logística</h1>
        <p className="mt-1 text-muted-foreground">
          Simula costos, rutas y tiempos para entender qué mueve el precio de un envío internacional.
        </p>
      </div>
      <ModulePurpose
        items={[
          {
            title: "Por qué existe",
            text: "Ayuda a visualizar cómo origen, destino, peso, carga y contenedor cambian una cotización.",
            icon: Calculator,
          },
          {
            title: "Qué aprendes",
            text: "Factores de costo: distancia, tipo de carga, equipo, tránsito y supuestos operativos.",
            icon: DollarSign,
          },
          {
            title: "Uso real",
            text: "Permite comparar escenarios antes de pedir una oferta formal a un operador logístico.",
            icon: Route,
          },
          {
            title: "Por qué importa",
            text: "Una mala estimación puede afectar margen, inventario y promesa de entrega al cliente.",
            icon: ShipWheel,
          },
        ]}
      />
      <QuotePanel />
    </div>
  );
}
