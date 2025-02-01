import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, LinkProps } from "@tanstack/react-router";
import { HomeIcon, LucideIcon, RouteIcon } from "lucide-react";

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
          <SidebarMenuItem>{LINKS.map((link) => <SidebarLink {...link} key={[link.from, link.to].join('_')}/>)}</SidebarMenuItem>
         </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  );
}

function SidebarLink({ icon: Icon, title, to }: SidebarLink) {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleButtonClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Link to={to} className="[&.active]:font-bold">
      <SidebarMenuButton onClick={handleButtonClick}>
        <Icon />
        {title}
      </SidebarMenuButton>
    </Link>
  );
}
