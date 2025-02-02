import { cn } from "@/lib/utils";
import { RoutePointStatus } from "@/types/routePoints";

export function getPointStatusColor(status: RoutePointStatus) {
  return cn({
    gray: status === RoutePointStatus.PASSED,
    yellow: status === RoutePointStatus.CURRENT,
    blue: status === RoutePointStatus.UPCOMING,
  });
}
