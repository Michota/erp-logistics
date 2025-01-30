type WaypointStatus = "passed" | "upcoming" | "current";

export interface Waypoint {
  id: string;
  title: string;
  status: WaypointStatus;
  index?: number;
}
