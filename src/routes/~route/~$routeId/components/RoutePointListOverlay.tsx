import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RoutePoint } from "@/types/routePoints";
import { RouteIcon } from "lucide-react";
import { RoutePointAction } from "./RoutePoint";
import { RoutePointList } from "./RoutePointList";

interface RoutePointListOverlayProps<R extends RoutePoint> {
  routePoints: R[];
  routePointActions: RoutePointAction<R>[];
}

export function RoutePointListOverlay<R extends RoutePoint>({
  routePoints,
  routePointActions,
}: RoutePointListOverlayProps<R>) {
  return (
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
            <RoutePointList routePoints={routePoints} routePointActions={routePointActions} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
