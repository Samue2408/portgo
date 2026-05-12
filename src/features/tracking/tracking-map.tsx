"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  from: { lat: number; lon: number };
  to: { lat: number; lon: number };
};

export function TrackingMap({ from, to }: Props) {
  useEffect(() => {
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  const center: [number, number] = [(from.lat + to.lat) / 2, (from.lon + to.lon) / 2];
  const positions: [number, number][] = [
    [from.lat, from.lon],
    [to.lat, to.lon],
  ];

  return (
    <div className="h-64 w-full overflow-hidden rounded-lg">
      <MapContainer center={center} zoom={3} scrollWheelZoom={false} className="h-full w-full" attributionControl>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
        <Polyline positions={positions} pathOptions={{ color: "#0284c7", weight: 3, dashArray: "6 8" }} />
        <Marker position={[from.lat, from.lon]}>
          <Popup>Origen (simulado)</Popup>
        </Marker>
        <Marker position={[to.lat, to.lon]}>
          <Popup>Destino (simulado)</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
