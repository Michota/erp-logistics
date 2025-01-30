import { cn } from "@/lib/utils";
type WaypointStatus = "passed" | "upcoming" | "current";

interface WayPointProps {
  index: number;
  status: WaypointStatus;
  title: string;
}

export function WayPoint({ index, status, title }: WayPointProps) {
  return (
    <div className="flex justify-start items-center gap-2 select-none">
      <div
        className={cn(
          "waypoint-status-indicator",
          {
            "bg-green-300": status === "passed",
            "bg-yellow-300": status === "current",
            "bg-gray-300": status === "upcoming",
          },
          "rounded-full aspect-square min-w-6 text-background flex items-center justify-center",
        )}
      >
        <p className="font-bold text-sm">{index}</p>
      </div>
      <span className="inline-block">{title}</span>
    </div>
  );
}
