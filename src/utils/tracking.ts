import type { TrackingStageKey } from "@/types/logistics";
import { TRACKING_STAGES } from "@/types/logistics";
import { PORTS } from "@/data/ports";

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export type SimulatedTrackingEvent = {
  stage: TrackingStageKey;
  label: string;
  date: string;
  done: boolean;
};

export type SimulatedTracking = {
  code: string;
  origin: string;
  destination: string;
  originCoords: { lat: number; lon: number };
  destinationCoords: { lat: number; lon: number };
  currentStage: TrackingStageKey;
  events: SimulatedTrackingEvent[];
  etaLabel: string;
};

function addDays(isoDate: string, days: number) {
  const d = new Date(isoDate);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function simulateTracking(rawCode: string, referenceDate = new Date()): SimulatedTracking {
  const code = rawCode.trim().toUpperCase();
  const h = hashString(code);
  const routes = [
    { o: "callao", d: "rotterdam" },
    { o: "cartagena", d: "barcelona" },
    { o: "valparaiso", d: "santos" },
    { o: "veracruz", d: "buenosaires" },
  ];
  const pick = routes[h % routes.length];
  const originPort = PORTS.find((p) => p.id === pick.o)!;
  const destPort = PORTS.find((p) => p.id === pick.d)!;
  const origin = `${originPort.name}, ${originPort.country}`;
  const destination = `${destPort.name}, ${destPort.country}`;
  const currentIndex = Math.min(TRACKING_STAGES.length - 1, h % TRACKING_STAGES.length);
  const currentStage = TRACKING_STAGES[currentIndex].key;
  const start = new Date(referenceDate);
  start.setUTCDate(start.getUTCDate() - (currentIndex + 3));
  const baseIso = start.toISOString().slice(0, 10);
  const events: SimulatedTrackingEvent[] = TRACKING_STAGES.map((s, idx) => {
    const date = addDays(baseIso, idx * 2 + (h % 2));
    return {
      stage: s.key,
      label: s.label,
      date,
      done: idx <= currentIndex,
    };
  });
  const eta = addDays(baseIso, TRACKING_STAGES.length * 2 + 4 + (h % 5));
  return {
    code,
    origin,
    destination,
    originCoords: { lat: originPort.lat, lon: originPort.lon },
    destinationCoords: { lat: destPort.lat, lon: destPort.lon },
    currentStage,
    events,
    etaLabel: eta,
  };
}
