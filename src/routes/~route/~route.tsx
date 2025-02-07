import { RoutePointStatus } from "@/types/routePoints";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { RoutePointListOverlay } from "./~$routeId/components/RoutePointListOverlay";
import { NavigationIcon, PhoneCallIcon, NotebookPenIcon, AlertOctagonIcon } from "lucide-react";
import { openExternalMaps } from "./~$routeId/utils/openExternalMaps";
import { callToNumber } from "./~$routeId/utils/callToNumber";

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
  customer: { contactInformation: { phone: 123456789 } },
}));


function RouteComponent() {
  const [waypoints, setWaypoints] = useState(points);
  return (
    <div className="w-full h-full bg-red-400">
      <RoutePointListOverlay
        routePointActions={[
          {
            action: ({ coordinates: { lat, lng } }) => openExternalMaps([lat, lng]),
            title: "Navigate to customer",
            icon: NavigationIcon,
          },
          {
            action: (point) => callToNumber(point.customer.contactInformation.phone),
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
        routePoints={waypoints}
      />
      <Outlet />
    </div>
  );
}
