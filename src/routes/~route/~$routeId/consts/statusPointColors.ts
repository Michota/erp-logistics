import { RoutePointStatus } from "@/types/routePoints";

export const STATUS_POINT_COLOR: Record<keyof typeof RoutePointStatus, string> = {
  PASSED: "gray",
  CURRENT: "yellow",
  UPCOMING: "blue",
} as const;