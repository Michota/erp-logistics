import { type RoutePoint as RoutePointType } from "@/types/routePoints";
import { RoutePoint, RoutePointAction } from "./RoutePoint";

interface RoutePointList<RPT extends RoutePointType> {
  routePoints: RPT[];
  hidePassed?: boolean;
  routePointActions?: RoutePointAction<RPT>[];
}

export function RoutePointList<RPT extends RoutePointType>({
  routePoints,
  hidePassed,
  routePointActions,
}: RoutePointList<RPT>) {
  return (
    <div className="flex flex-col gap-4">
      {(hidePassed ? routePoints.filter((point) => point.status !== "passed") : routePoints).map((point) => (
        <RoutePoint actions={routePointActions} data={point} key={point.id} {...point} index={point.index} />
      ))}
    </div>
  );
}
