import { type Waypoint } from "@/types/Waypoint";
import { WaypointAction, Waypoint as WaypointComponent } from "./Waypoint";

interface WaypointsListProps {
  waypoints: Waypoint[];
  hidePassed?: boolean;
  waypointActions?: WaypointAction[];
}

export function WaypointsList({ waypoints, hidePassed, waypointActions }: WaypointsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {(hidePassed ? waypoints.filter((waypoint) => waypoint.status !== "passed") : waypoints).map((waypoint) => (
        <WaypointComponent
          actions={waypointActions}
          data={waypoint}
          key={waypoint.id}
          {...waypoint}
          index={waypoint.index}
        />
      ))}
    </div>
  );
}
