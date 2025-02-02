import { RoutePointStatus } from "@/types/routePoints";
import { STATUS_POINT_COLOR } from "../consts/statusPointColors";

export function getPointStatusColor(status: RoutePointStatus) {
  return STATUS_POINT_COLOR[status.toUpperCase() as Uppercase<typeof status>];
}
