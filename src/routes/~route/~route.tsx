import { GoogleMapsMap } from "@/components/maps/GoogleMapsMap";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RoutePointStatus } from "@/types/routePoints";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { APIProvider } from "@vis.gl/react-google-maps";
import { RouteIcon } from "lucide-react";
import { useState } from "react";
import { RoutePointList } from "./~$routeId/components/RoutePointList";

export const Route = createFileRoute("/route")({
  component: RouteComponent,
});

const points = [
  [50.95857599800388, 20.25370827892464],
  [50.80904029689233, 20.34840150520644],
  [50.86683508347538, 20.62555240399504],
  [51.010918206658374, 20.802236114093613],
].map((w, i) => ({
  coordinates: { lat: w[0], lng: w[1] },
  id: i.toString(),
  title: Math.random().toString(),
  status: i > 0 ? RoutePointStatus.UPCOMING : RoutePointStatus.PASSED,
}));

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function RouteComponent() {
  const [waypoints, setWaypoints] = useState(points);
  return (
    <div className="w-full h-full bg-red-400">
      <APIProvider apiKey={apiKey}>
        <GoogleMapsMap
          waypoints={waypoints}
          onWaypointChange={(updatedWaypoint) =>
            setWaypoints((currentWaypoints) => {
              const newWaypoints = [...currentWaypoints];
              console.log("🚀 ~ setWaypoints ~ newWaypoints:", newWaypoints);
              const updatedWaypointIndex = newWaypoints.findIndex((waypoint) => waypoint.id === updatedWaypoint.id);
              if (updatedWaypointIndex === -1) {
                throw new Error("There is no updated index");
              }

              newWaypoints[updatedWaypointIndex] = updatedWaypoint;
              return newWaypoints;
            })
          }
        />
      </APIProvider>
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
              <RoutePointList
                routePointActions={[
                  { action: (waypoint) => alert(waypoint.title), description: "desc", title: "action 1" },
                  { action: (waypoint) => alert(waypoint.title), description: "desc", title: "action 2" },
                ]}
                routePoints={[
                  { id: "1", title: "Waypoint 1", status: RoutePointStatus.PASSED },
                  { id: "2", title: "Waypoint 2", status: RoutePointStatus.CURRENT },
                  { id: "3", title: "Waypoint 3", status: RoutePointStatus.UPCOMING },
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
