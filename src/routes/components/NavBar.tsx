import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";
import { HomeIcon, LucideIcon, RouteIcon } from "lucide-react";

interface NavBarLink extends LinkProps {
  title: string;
  icon: LucideIcon;
}

const LINKS: NavBarLink[] = [
  { to: "/", title: "Home", icon: HomeIcon },
  { to: "/route", title: "Route", icon: RouteIcon },
];

export function NavBar() {
    return <nav className={cn("nav-bar", "flex gap-2 ")}>{LINKS.map(NavBarIcon)}</nav>;
}

function NavBarIcon({ icon: Icon, title, to }: NavBarLink) {
  return <Link to={to} className="[&.active]:font-bold">
    {<Icon />}
    {title}
  </Link>;
}
