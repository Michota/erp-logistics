/* eslint-disable @typescript-eslint/no-namespace */
import L from "leaflet";
import "leaflet-routing-machine";

/**
 * https://www.liedman.net/leaflet-routing-machine/api/#l-routing-waypoint:~:text=add%20waypoint%20button-,createMarker,-Function
 */
export type CreateMarker = (waypointIndex: number, waypoint: L.Routing.Waypoint, numberOfWaypoints: number) => L.Marker | boolean;

// Extend the type definition for routing.control
declare module "leaflet" {
  namespace Routing {
    interface RoutingControlOptions {
      createMarker?: CreateMarker;
    }

    interface Control {
      createMarker: CreateMarker;
    }
  }
}

export default L;
