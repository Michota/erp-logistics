import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { MainSidebar } from "./components/MainSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createRootRoute({
  component: () => (
    <>
      <MainSidebar />
        <main className="flex flex-col w-screen h-screen">
          <SidebarTrigger />
          <Outlet />
        </main>
      <TanStackRouterDevtools />
    </>
  ),
});
