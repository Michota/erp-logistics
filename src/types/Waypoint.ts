import { RoutePointStatus } from "./route";
import { RoutePoint } from "./routePoints";

export interface Waypoint extends RoutePoint {
  coordinates: [lat: number, lng: number];
}
