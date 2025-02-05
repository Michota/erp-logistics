import { SidebarProvider } from "@/components/ui/sidebar";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { APIProvider } from "@vis.gl/react-google-maps";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function ContextsProviders() {
  return (
    <APIProvider apiKey={MAPS_API_KEY}>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </APIProvider>
  );
}
