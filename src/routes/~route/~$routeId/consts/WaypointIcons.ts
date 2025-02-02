import Leaflet from "@/lib/leafletWithPlugins";
import { RoutePointStatus } from "@/types/route";
import { IconOptions } from "leaflet";
import { getPointStatusColor } from "../utils/getPointStatusColor";

const IMAGE_REPOSITORY = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/refs/heads/master/img";

const WaypointIconsLink = {
  BLUE: `${IMAGE_REPOSITORY}/marker-icon-blue.png`,
  RED: `${IMAGE_REPOSITORY}/marker-icon-red.png`,
  GOLD: `${IMAGE_REPOSITORY}/marker-icon-gold.png`,
  GREEN: `${IMAGE_REPOSITORY}/marker-icon-green.png`,
  ORANGE: `${IMAGE_REPOSITORY}/marker-icon-orange.png`,
  YELLOW: `${IMAGE_REPOSITORY}/marker-icon-yellow.png`,
  VIOLET: `${IMAGE_REPOSITORY}/marker-icon-violet.png`,
  GRAY: `${IMAGE_REPOSITORY}/marker-icon-grey.png`, // ! gray == grey
  BLACK: `${IMAGE_REPOSITORY}/marker-icon-black.png`,
} as const;

const getIconLink = (status: RoutePointStatus) =>
  getPointStatusColor(status).toUpperCase() as keyof typeof WaypointIconsLink;

export const createWaypointIcon = (waypointStatus?: RoutePointStatus, options: Partial<IconOptions> = {}) =>
  Leaflet.icon({
    iconUrl: waypointStatus ? WaypointIconsLink[getIconLink(waypointStatus)] : WaypointIconsLink.VIOLET,
    ...options,
  });
