import { type Waypoint } from "@/types/Waypoint";
import { Waypoint as WaypointComponent } from "./Waypoint";

interface WaypointsListProps {
  waypoints: Waypoint[];
  hidePassed?: boolean;
}

export function WaypointsList({ waypoints, hidePassed }: WaypointsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {(hidePassed ? waypoints.filter((waypoint) => waypoint.status !== "passed") : waypoints).map((waypoint) => (
        <WaypointComponent key={waypoint.id} {...waypoint} index={waypoint.index} />
      ))}
    </div>
  );
}
