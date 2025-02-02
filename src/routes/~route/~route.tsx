import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RouteIcon } from "lucide-react";
import { RouteMap } from "../components/maps/RouteMap";
import { RoutePointList } from "./~$routeId/components/RoutePointList";
import { RoutePointStatus } from "@/types/routePoints";

export const Route = createFileRoute("/route")({
  component: RouteComponent,
});

const points: [number, number][] = [
  [50.95857599800388, 20.25370827892464],
  [50.80904029689233, 20.34840150520644],
  [50.86683508347538, 20.62555240399504],
  [51.010918206658374, 20.802236114093613],
];

function RouteComponent() {
  return (
    <div className="w-full h-full bg-red-400">
      <RouteMap
        waypoints={points.map((p, index) => ({
          id: index.toString(),
          status: index > 0 ? RoutePointStatus.CURRENT : RoutePointStatus.UPCOMING,
          coordinates: p,
          title: index.toString(),
        }))}
      />
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
