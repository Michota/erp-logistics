import Leaflet from "@/lib/leafletWithPlugins";
import { createLeafletIcon } from "@/routes/~route/~$routeId/consts/WaypointIcons";
import { Waypoint } from "@/types/Waypoint";
import { useMemo } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { RoutingDrawer } from "./RoutingDrawer";

type Coordinates = [number, number];

interface RoutePoint extends Waypoint {
  coordinates: Coordinates;
}

interface RouteMapProps {
  points: RoutePoint[];
}

export function RouteMap({ points }: RouteMapProps) {
  const summedPosition: [number, number] = useMemo(
    () => points.reduce((acc, cur) => [acc[0] + cur.coordinates[0], acc[1] + cur.coordinates[1]], [0, 0]),
    [points],
  );
  const center: [number, number] = [summedPosition[0] / points.length, summedPosition[1] / points.length];

  return (
    <MapContainer style={{ height: "100%", width: "100%" }} center={center} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingDrawer waypoints={points.map((point) => Leaflet.latLng(point.coordinates))} />
      {points.map(({ coordinates, status, title }: RoutePoint) => (
        <Marker
          title={title}
          alt={title}
          icon={createLeafletIcon(status)}
          key={coordinates.join("-")}
          position={coordinates}
        />
      ))}
    </MapContainer>
  );
}
