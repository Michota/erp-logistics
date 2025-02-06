import { RoutePointStatus } from "@/types/routePoints";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { RoutePointListOverlay } from "./~$routeId/components/RoutePointListOverlay";
import { NavigationIcon, PhoneCallIcon, NotebookPenIcon, AlertOctagonIcon } from "lucide-react";

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


function RouteComponent() {
  const [waypoints, setWaypoints] = useState(points);
  return (
    <div className="w-full h-full bg-red-400">
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
      <RoutePointListOverlay
        routePointActions={[
          {
            action: (point) => alert(point.title),
            title: "Navigate to customer",
            icon: NavigationIcon,
          },
          {
            action: (point) => alert(point.customer.contactInformation.phone),
            title: "Call to customer",
            icon: PhoneCallIcon,
          },
          {
            action: (point) => alert(point.title),
            title: "Manage visit",
            icon: NotebookPenIcon,
          },
          {
            action: (point) => alert(point.title),
            title: "Report problem",
            icon: AlertOctagonIcon,
          },
        ]}
        routePoints={[
          {
            id: "1",
            title: "Waypoint 1",
            status: RoutePointStatus.PASSED,
            customer: { contactInformation: { phone: 123456789 } },
          },
          {
            id: "2",
            title: "Waypoint 2",
            status: RoutePointStatus.CURRENT,
            customer: { contactInformation: { phone: 123456789 } },
          },
          {
            id: "3",
            title: "Waypoint 3",
            status: RoutePointStatus.UPCOMING,
            customer: { contactInformation: { phone: 123456789 } },
          },
        ]}
      />
      <Outlet />
    </div>
  );
}
