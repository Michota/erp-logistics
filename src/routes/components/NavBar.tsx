import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

// TODO: render navigation buttons imperatively
export function NavBar() {
  return (
    <nav className={cn("nav-bar", "flex gap-2")}>
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
    </nav>
  );
}
