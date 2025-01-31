import { createFileRoute, Outlet } from "@tanstack/react-router";
import { WaypointsList } from "./~$routeId/components/WaypointsList";
import { Button } from "@/components/ui/button";
import { RouteIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/route")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/route"!
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
                waypointActions={[{ action: (waypoint) => alert(waypoint.title), description: "desc", title: "action 1" }, { action: (waypoint) => alert(waypoint.title), description: "desc", title: "action 2" }]}
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
