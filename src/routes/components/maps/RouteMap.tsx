import { Waypoint } from "@/types/waypoint";
import { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { RoutingDrawer } from "./RoutingDrawer";

interface RouteMapProps {
  waypoints: Waypoint[];
}

export function RouteMap({ waypoints }: RouteMapProps) {
  const summedPosition: [number, number] = useMemo(
    () => waypoints.reduce((acc, cur) => [acc[0] + cur.coordinates[0], acc[1] + cur.coordinates[1]], [0, 0]),
    [waypoints],
  );
  const center: [number, number] = [summedPosition[0] / waypoints.length, summedPosition[1] / waypoints.length];

  return (
    <MapContainer style={{ height: "100%", width: "100%" }} center={center} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingDrawer waypoints={waypoints} />
      {/* {points.map(({ coordinates, status, title }: RoutePoint) => (
        <Marker
          title={title}
          alt={title}
          draggable={false}
          interactive={false}
          
          icon={
            new Icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/refs/heads/master/img/marker-icon-yellow.png",
            })
          }
          
          key={coordinates.join("-")}
          position={coordinates}
        />
      ))} */}
    </MapContainer>
  );
}
