import { Waypoint } from "@/types/waypoint";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function MapRoutes({ waypoints }: { waypoints: Waypoint[] }) {
  const instance = useMap();
  const [direction, setDirection] = useState<google.maps.DirectionsResult>();
  if (!instance) {
    throw new Error("There is no map instance!");
  }

  const routesLibrary = useMapsLibrary("routes");

  useEffect(() => {
    if (!routesLibrary) {
      return;
    }

    const googleWaypoints = waypoints.map(({ coordinates: { lat, lng } }) => ({ location: { lat, lng } }));

    const directionServices = new routesLibrary.DirectionsService();
    directionServices
      .route({
        waypoints: googleWaypoints.slice(1, googleWaypoints.length - 1),
        destination: googleWaypoints.at(-1)!.location,
        origin: googleWaypoints[0],
        travelMode: routesLibrary.TravelMode.DRIVING,
        optimizeWaypoints: true,
      })
      .then((result) => setDirection(result));
  }, [routesLibrary, waypoints]);

  useEffect(() => {
    if (!routesLibrary) {
      return;
    }

    const directionsRenderer = new routesLibrary.DirectionsRenderer({
      directions: direction,
      suppressMarkers: true,
    });

    directionsRenderer.setMap(instance);

    return () => directionsRenderer.setMap(null);
  }, [direction, instance, routesLibrary]);

  return null;
}

export { MapRoutes };
