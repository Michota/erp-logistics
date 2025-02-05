import { fireEvent, render, screen } from "@testing-library/react";
import { GoogleMapsMap } from "../GoogleMapsMap";
import { Waypoint } from "@/types/waypoint";
import { RoutePointStatus } from "@/types/routePoints";
import { AdvancedMarkerProps } from "@vis.gl/react-google-maps";

const markerTestId = "marker";

jest.mock("@vis.gl/react-google-maps", () => {
  const AdvancedMarkerMock = () =>
    jest.fn((props: AdvancedMarkerProps) => (
      <div data-testid={markerTestId} data-position={JSON.stringify(props.position)}>
        {props.children}
      </div>
    ));

  return { AdvancedMarker: AdvancedMarkerMock };
});

const waypoints: Waypoint[] = [
  {
    title: "Home",
    coordinates: { lat: 50.8893351618268, lng: 20.640282429569833 },
    id: "A",
    status: RoutePointStatus.PASSED,
  },
  {
    title: "PKP",
    coordinates: { lat: 50.87633885285064, lng: 20.621743001701862 },
    id: "B",
    status: RoutePointStatus.CURRENT,
  },
  {
    title: "Park",
    coordinates: { lat: 50.868460641538626, lng: 20.62475743815027 },
    id: "C",
    status: RoutePointStatus.UPCOMING,
  },
];

test("loads and displays waypoints", () => {
  const { getAllByTestId } = render(<GoogleMapsMap waypoints={waypoints} onWaypointChange={() => null} />);

  const markers = getAllByTestId(markerTestId);

  expect(markers).toHaveLength(waypoints.length);
});
