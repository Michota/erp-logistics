import Leaflet, { CreateMarker } from "@/lib/leafletWithPlugins";
import { createWaypointIcon } from "@/routes/~route/~$routeId/consts/WaypointIcons";
import { Waypoint } from "@/types/waypoint";
import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";

/*
  Behind the UI, Leaflet Routing Machine queries OSRM’s demo servers 
  each time the route is recalculated, unless you tell it to use something else. 
  This is great for a demo, but not for production: 
  the service is free but comes with a usage policy and without any warranties or SLA. 
  For production use, or for any use case were you need control over how routes are calculated 
  (like other means of transport, like bike or foot), you need to use another server, 
  be it OSRM or some other software. 
*/

// TODO: change router: https://www.liedman.net/leaflet-routing-machine/tutorials/alternative-routers/

type MarkerOptions = Parameters<CreateMarker>[1];

interface RoutingDrawerProps {
  waypoints: Waypoint[];
  showHints?: boolean;
  markersOptions?: MarkerOptions;
}

const createMarkerWithTooltip = (waypoint: Waypoint, options?: MarkerOptions) =>
  Leaflet.marker(waypoint.coordinates, {
    draggable: false,
    icon: createWaypointIcon(waypoint.status),

    ...options,
  }).bindTooltip(waypoint.title, { permanent: true });

export const RoutingDrawer = ({ waypoints, showHints = false, markersOptions }: RoutingDrawerProps) => {
  const map = useMap();

  const routingControl = useMemo(
    () =>
      Leaflet.routing.control({
        createMarker: (index) => createMarkerWithTooltip(waypoints[index], markersOptions),

        addWaypoints: false,
        waypoints: waypoints.map((waypoint) => Leaflet.latLng(waypoint.coordinates)),
        showAlternatives: true,
        // Options below disable the tips from top-right corner
        show: false,
        collapsible: showHints,
        ...(!showHints && {
          collapseBtnClass: "hidden",
          containerClassName: "hidden",
        }),
      }),
    [markersOptions, showHints, waypoints],
  );

  useEffect(() => {
    map.addControl(routingControl);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, routingControl]);

  return null;
};
