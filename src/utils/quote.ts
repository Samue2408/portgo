import type { Port } from "@/types/logistics";
import type { CargoType, ContainerType } from "@/types/logistics";

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

/** Great-circle distance in km (educational / simulated). */
export function distanceKm(a: Port, b: Port) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

const containerFactor: Record<ContainerType, number> = {
  "20dc": 1,
  "40dc": 1.45,
  "40hc": 1.55,
};

const cargoFactor: Record<CargoType, number> = {
  general: 1,
  refrigerated: 1.35,
  hazardous: 1.6,
};

export type QuoteInput = {
  origin: Port;
  destination: Port;
  weightKg: number;
  cargoType: CargoType;
  containerType: ContainerType;
};

export type QuoteResult = {
  distanceKm: number;
  estimatedUsd: number;
  transitDaysMin: number;
  transitDaysMax: number;
  suggestedRouteLabel: string;
};

export function simulateQuote(input: QuoteInput): QuoteResult {
  const d = Math.round(distanceKm(input.origin, input.destination));
  const w = Math.max(1, input.weightKg);
  const base = (w / 1000) * (d / 100) * 120;
  const price =
    base *
    containerFactor[input.containerType] *
    cargoFactor[input.cargoType] *
    1.08;
  const estimatedUsd = Math.round(price + 180);
  const speedFactor =
    (containerFactor[input.containerType] + cargoFactor[input.cargoType]) / 2;
  const transitDaysMin = Math.max(5, Math.round((d / 900) * speedFactor));
  const transitDaysMax = Math.round(transitDaysMin * 1.35);
  const suggestedRouteLabel = `${input.origin.name} → ${input.destination.name} (corredor educativo simulado)`;
  return {
    distanceKm: d,
    estimatedUsd,
    transitDaysMin,
    transitDaysMax,
    suggestedRouteLabel,
  };
}
