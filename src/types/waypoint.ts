import { RoutePoint } from "./routePoints";

// TODO: this should be named Point actually...
// The waypoint suggest, that its a point within a order of points
export interface Waypoint extends RoutePoint {
  coordinates: { lat: number; lng: number };
}
