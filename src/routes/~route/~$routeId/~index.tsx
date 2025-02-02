import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/route/$routeId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { routeId } = Route.useParams();
  return <div>Hello "/route/$routeId/"!</div>;
}
