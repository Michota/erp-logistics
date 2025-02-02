import { Waypoint } from "./waypoint";

export interface Route {
  id: string;
  name: string;
  date: Date;
  waypoints: Waypoint[];
}

