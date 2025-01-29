import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, LinkProps } from "@tanstack/react-router";
import { ChevronDown, HomeIcon, LucideIcon, RouteIcon } from "lucide-react";

interface SidebarLink extends LinkProps {
  title: string;
  icon: LucideIcon;
}

const LINKS: SidebarLink[] = [
  { to: "/", title: "Home", icon: HomeIcon },
  { to: "/route", title: "Route", icon: RouteIcon },
];

export function MainSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        Mako
        <SidebarMenu>
          <SidebarMenuItem>{LINKS.map(SidebarLink)}</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  );
}

function SidebarLink({ icon: Icon, title, to }: SidebarLink) {
  return (
    <SidebarMenuButton>
      <Icon />
      <Link to={to} className="[&.active]:font-bold">
        {title}
      </Link>
    </SidebarMenuButton>
  );
}
