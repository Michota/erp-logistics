/**
 * Function which opens external map app to navigate to client.
 */
// TODO: allow user to choose external app instead of forcing him to use Google Maps
export function openExternalMaps(coordinates: [lat: number, lng: number]) {
  window.open(`https://maps.google.com/maps?q=${coordinates.join(",")}`);
}

// FIXME: this shows coordinates instead of title
// consider using this: https://stackoverflow.com/questions/48761441/google-maps-open-url-by-coordinates-but-show-the-location-name