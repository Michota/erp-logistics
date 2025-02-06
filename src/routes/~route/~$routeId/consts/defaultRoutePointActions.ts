import { AlertOctagonIcon, NavigationIcon, NotebookPenIcon, PhoneCallIcon } from "lucide-react";
import { RoutePointAction } from "../components/RoutePoint";

// TODO: get information about certain customer to change button titles and behavior
export const defaultRoutePointActions: RoutePointAction[] = [
  {
    action: (waypoint) => alert(waypoint.title),
    title: "Navigate to customer",
    icon: NavigationIcon,
  },
  {
    action: (waypoint) => alert(waypoint.title),
    title: "Call to customer",
    icon: PhoneCallIcon,
  },
  {
    action: (waypoint) => alert(waypoint.title),
    title: "Manage visit",
    icon: NotebookPenIcon,
  },
  {
    action: (waypoint) => alert(waypoint.title),
    title: "Report problem",
    icon: AlertOctagonIcon,
  },
];
