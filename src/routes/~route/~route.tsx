import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LatLng, LatLngExpression, point, routing } from "leaflet";
import { RouteIcon } from "lucide-react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { WaypointsList } from "./~$routeId/components/WaypointsList";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { createControlledLayer } from "react-leaflet/LayersControl";

export const Route = createFileRoute("/route")({
  component: RouteComponent,
});

const points: [number, number][] = [
  [50.95857599800388, 20.25370827892464],
  [50.80904029689233, 20.34840150520644],
  [50.86683508347538, 20.62555240399504],
  [51.010918206658374, 20.802236114093613],
];

const RoutingMachine = ({ waypoints }: { waypoints: LatLng[] }) => {
  const map = useMap();

  const routingControl = routing.control({ addWaypoints: false, waypoints, show: false });

  map.addControl(routingControl);

  return null;
};

function RouteComponent() {
  const summedPosition: [number, number] = points.reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]], [0, 0]);

  const center: [number, number] = [summedPosition[0] / points.length, summedPosition[1] / points.length];

  return (
    <div className="w-[50rem] h-[50rem] bg-red-400">
      Hello "/route"!
      <MapContainer
        className="mapa"
        style={{ height: "100%", width: "40rem" }}
        center={center}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer
          zIndex={0}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine waypoints={points.map(L.latLng)} />
        {points.map((point) => (
          <Marker key={point.join("-")} position={point} />
        ))}
      </MapContainer>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="rounded-full absolute right-8 bottom-8">
            <RouteIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Waypoints</SheetTitle>
            <SheetDescription>
              <WaypointsList
                waypointActions={[
                  { action: (waypoint) => alert(waypoint.title), description: "desc", title: "action 1" },
                  { action: (waypoint) => alert(waypoint.title), description: "desc", title: "action 2" },
                ]}
                waypoints={[
                  { id: "1", title: "Waypoint 1", status: "passed" },
                  { id: "2", title: "Waypoint 2", status: "current" },
                  { id: "3", title: "Waypoint 3", status: "upcoming" },
                ]}
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Outlet />
    </div>
  );
}
