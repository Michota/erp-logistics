import Leaflet from "@/lib/leafletWithPlugins";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useMemo } from "react";
import { RoutingDrawer } from "./RoutingDrawer";

type Coordinates = [number, number];

interface RouteMapProps {
  mapPoints: Coordinates[];
}

export function RouteMap({ mapPoints }: RouteMapProps) {
  const summedPosition: [number, number] = useMemo(
    () => mapPoints.reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]], [0, 0]),
    [mapPoints],
  );
  const center: [number, number] = [summedPosition[0] / mapPoints.length, summedPosition[1] / mapPoints.length];

  return (
    <MapContainer style={{ height: "100%", width: "100%" }} center={center} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingDrawer waypoints={mapPoints.map(Leaflet.latLng)} />
      {mapPoints.map((point) => (
        <Marker key={point.join("-")} position={point} />
      ))}
    </MapContainer>
  );
}
