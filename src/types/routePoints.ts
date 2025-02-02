
export enum RoutePointStatus {
  PASSED = "passed",
  UPCOMING = "upcoming",
  CURRENT = "current",
}


export interface RoutePoint {
  id: string;
  title: string;
  status: RoutePointStatus;
  index?: number;
}
