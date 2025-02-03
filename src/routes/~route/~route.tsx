import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RouteIcon, X } from "lucide-react";
import { RoutePointList } from "./~$routeId/components/RoutePointList";
import { RoutePointStatus } from "@/types/routePoints";
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Waypoint } from "@/types/waypoint";

export const Route = createFileRoute("/route")({
  component: RouteComponent,
});

const points = [
  [50.95857599800388, 20.25370827892464],
  [50.80904029689233, 20.34840150520644],
  [50.86683508347538, 20.62555240399504],
  [51.010918206658374, 20.802236114093613],
].map((p) => ({ lat: p[0], lng: p[1] }));

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function RouteComponent() {
  const [waypoints, setWaypoints] = useState(points);
  return (
    <div className="w-full h-full bg-red-400">
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={waypoints[0]}
          defaultZoom={10}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {waypoints.map((point, index) => (
            <Marker
              position={point}
              draggable
              onDragEnd={({ latLng }) => {
                if (!latLng) {
                  return;
                }

                setWaypoints((current) => {
                  const newWaypoints = [...current];
                  newWaypoints[index].lat = latLng.lat();
                  newWaypoints[index].lng = latLng.lng();
                  return newWaypoints;
                });
              }}
            />
          ))}
          <MapRoutes waypoints={waypoints} />
        </Map>
      </APIProvider>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="rounded-full absolute right-8 bottom-8">
            <RouteIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Waypoints</SheetTitle>
            <SheetDescription>
              <RoutePointList
                routePointActions={[
                  { action: (waypoint) => alert(waypoint.title), description: "desc", title: "action 1" },
                  { action: (waypoint) => alert(waypoint.title), description: "desc", title: "action 2" },
                ]}
                routePoints={[
                  { id: "1", title: "Waypoint 1", status: RoutePointStatus.PASSED },
                  { id: "2", title: "Waypoint 2", status: RoutePointStatus.CURRENT },
                  { id: "3", title: "Waypoint 3", status: RoutePointStatus.UPCOMING },
                ]}
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Outlet />
    </div>
  );
}

function MapRoutes({ waypoints }: { waypoints: typeof points }) {
  console.log("🚀 ~ MapRoutes ~ waypoints:", waypoints);
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

    const googleWaypoints = waypoints.map(({ lat, lng }) => ({ location: { lat, lng } }));

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
      polylineOptions: { strokeColor: "#ff00ff" },
      suppressMarkers: true,
      // markerOptions: { draggable: true },
    })

    directionsRenderer.setMap(instance)

    return () => directionsRenderer.setMap(null)
  }, [direction, instance, routesLibrary]);

  return null;
}
