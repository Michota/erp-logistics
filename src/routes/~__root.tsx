import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NavBar } from "./components/NavBar";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col w-screen h-screen">
        <NavBar />
        <main>
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
