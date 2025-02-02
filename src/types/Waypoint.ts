export enum WaypointStatus {
  PASSED = "passed",
  UPCOMING = "upcoming",
  CURRENT = "current",
}

export interface Waypoint {
  id: string;
  title: string;
  status: WaypointStatus;
  index?: number;
}
