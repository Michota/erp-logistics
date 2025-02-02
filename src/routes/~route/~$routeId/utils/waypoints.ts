import { cn } from "@/lib/utils";
import { WaypointStatus } from "@/types/Waypoint";

export function getWaypointColor(status: WaypointStatus) {
  return  cn({
    "gray": status === WaypointStatus.PASSED,
    "yellow": status === WaypointStatus.CURRENT,
    "blue": status === WaypointStatus.UPCOMING,
  });
}
