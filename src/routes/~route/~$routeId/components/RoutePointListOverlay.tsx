import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RoutePointStatus } from "@/types/routePoints";
import { RouteIcon, PhoneCallIcon } from "lucide-react";
import { RoutePointList } from "./RoutePointList";

export function RoutePointListOverlay() {
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
              <RoutePointList
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
    );
}