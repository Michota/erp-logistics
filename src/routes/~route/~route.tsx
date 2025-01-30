import { createFileRoute, Outlet } from "@tanstack/react-router";
import { WaypointsList } from "./~$routeId/components/WaypointsList";

export const Route = createFileRoute("/route")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/route"!
      <Outlet />
      <WaypointsList waypoints={[
        { id: "1", title: "waypoint 1", status: "passed" },
        { id: "2", title: "waypoint 2", status: "passed" },
        { id: "3", title: "waypoint 3", status: "current" },
        { id: "4", title: "waypoint 4", status: "upcoming" },
        { id: "5", title: "waypoint 5", status: "upcoming" },
        { id: "6", title: "waypoint 6", status: "upcoming" },
        { id: "7", title: "waypoint 7", status: "upcoming" },
      ]}/>
    </div>
  );
}
