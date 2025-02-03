import { Waypoint } from "@/types/waypoint";
import { ColorScheme, Map, Marker } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import { MapRoutes } from "./MapRoutes";

interface GoogleMapsMapProps<W extends Waypoint = Waypoint> {
  waypoints: W[];
  onWaypointChange: (updatedWaypoint: W) => void;
}

function GoogleMapsMap<W extends Waypoint>({ waypoints, onWaypointChange }: GoogleMapsMapProps<W>) {
  const handleMarkerDragEnd = (waypoint: W, newCoordinates: W["coordinates"]) => {
    onWaypointChange({ ...waypoint, coordinates: newCoordinates });
  };

  const summedPosition = useMemo(
    () =>
      waypoints.reduce((acc, { coordinates }) => ({ lat: acc.lat + coordinates.lat, lng: acc.lng + coordinates.lng }), {
        lat: 0,
        lng: 0,
      }),
    [waypoints],
  );

  const center: google.maps.LatLngLiteral = {
    lat: summedPosition.lat / waypoints.length,
    lng: summedPosition.lng / waypoints.length,
  };

  return (
    <Map
      colorScheme={ColorScheme.FOLLOW_SYSTEM}
      style={{ width: "100%", height: "100%" }}
      defaultCenter={center}
      defaultZoom={10}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      {waypoints.map((point) => (
        <Marker
          title={point.title}
          key={point.id}
          label={{ text: point.title }}
          position={point.coordinates}
          draggable
          onDragEnd={({ latLng }) => {
            if (!latLng) {
              return;
            }

            const newCoordinates = { lat: latLng.lat(), lng: latLng.lng() };
            handleMarkerDragEnd(point, newCoordinates);
          }}
        />
      ))}
      <MapRoutes waypoints={waypoints} />
    </Map>
  );
}

export { GoogleMapsMap };
