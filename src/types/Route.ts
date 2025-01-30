import { Waypoint } from "./Waypoint";

export interface Route {
    id: string,
    name: string,
    date: Date,
    waypoints: Waypoint[]
}