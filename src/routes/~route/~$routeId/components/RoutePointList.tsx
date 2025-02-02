import { type Waypoint } from "@/types/waypoint";
import { RoutePointAction, RoutePoint } from "./RoutePoint";
import { type RoutePoint as RoutePointType } from "@/types/routePoints";

interface RoutePointList {
  routePoints: RoutePointType[];
  hidePassed?: boolean;
  routePointActions?: RoutePointAction[];
}

export function RoutePointList({ routePoints, hidePassed, routePointActions }: RoutePointList) {
  return (
    <div className="flex flex-col gap-4">
      {(hidePassed ? routePoints.filter((point) => point.status !== "passed") : routePoints).map((point) => (
        <RoutePoint actions={routePointActions} data={point} key={point.id} {...point} index={point.index} />
      ))}
    </div>
  );
}
