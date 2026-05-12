export type Port = {
  id: string;
  code: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export type TrackingStageKey =
  | "registered"
  | "port_processing"
  | "in_transit"
  | "customs"
  | "destination_port"
  | "delivered";

export type TrackingStage = {
  key: TrackingStageKey;
  label: string;
};

export const TRACKING_STAGES: TrackingStage[] = [
  { key: "registered", label: "Registrado" },
  { key: "port_processing", label: "Procesamiento portuario" },
  { key: "in_transit", label: "En tránsito" },
  { key: "customs", label: "Aduanas" },
  { key: "destination_port", label: "Puerto de destino" },
  { key: "delivered", label: "Entregado" },
];

export type CargoType = "general" | "refrigerated" | "hazardous";
export type ContainerType = "20dc" | "40hc" | "40dc";
