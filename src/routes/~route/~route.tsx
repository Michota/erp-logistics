import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/route")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/route"!
      <Outlet />
    </div>
  );
}
