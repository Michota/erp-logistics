import { LatLng, routing } from "leaflet";
import { useMemo, useEffect } from "react";
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

export const RoutingDrawer = ({ waypoints, showHints = false }: { waypoints: LatLng[]; showHints?: boolean }) => {
  const map = useMap();

  const routingControl = useMemo(
    () =>
      routing.control({
        addWaypoints: false,
        waypoints,
        showAlternatives: true,
        // Options below disable the tips from top-right corner
        show: false,
        collapsible: showHints,
        ...(!showHints && {
          collapseBtnClass: "hidden",
          containerClassName: "hidden",
        }),
      }),
    [showHints, waypoints],
  );

  useEffect(() => {
    map.addControl(routingControl);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, routingControl]);

  return null;
};