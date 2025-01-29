import { useDarkMode } from "@/shared/hooks/useDarkMode";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  const { toggle } = useDarkMode();
  return (
    <div className="p-2">
      Hello from About! <button onClick={toggle}>click</button>
    </div>
  );
}
