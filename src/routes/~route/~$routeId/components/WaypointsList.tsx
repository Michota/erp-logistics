import { type Waypoint } from "@/types/Waypoint";
import { Waypoint as WaypointComponent } from "./Waypoint";

interface WaypointsListProps {
  waypoints: Waypoint[];
}

export function WaypointsList({ waypoints }: WaypointsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {waypoints.map((waypoint) => (
        <WaypointComponent key={waypoint.id} {...waypoint} index={waypoint.index} />
      ))}
    </div>
  );
}
