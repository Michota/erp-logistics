import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/route/$routeId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { routeId } = Route.useParams();
  console.log("🚀 ~ file: ~index.tsx:9 ~ RouteComponent ~ routeId:", routeId)
  return <div>Hello "/route/$routeId/"!</div>;
}
