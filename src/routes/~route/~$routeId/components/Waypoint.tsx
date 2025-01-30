import { cn } from "@/lib/utils";
import { type Waypoint } from "@/types/Waypoint";
import { CheckIcon } from "lucide-react";
import React from "react";

interface WayPointProps extends Omit<Waypoint, "id">, Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "title"> {
  index?: number;
}

export function Waypoint({ index, status, title, className, ...props }: WayPointProps) {
  return (
    <div className={cn("flex justify-start items-center gap-2 select-none", className)} {...props}>
      <div
        className={cn(
          "waypoint-status-indicator",
          {
            "bg-gray-300": status === "passed",
            "bg-yellow-300": status === "current",
            "bg-blue-300": status === "upcoming",
          },
          "rounded-full aspect-square min-w-6 text-background flex items-center justify-center",
        )}
      >
        {status === "passed" ? <CheckIcon size={20} /> : index && <p className="font-bold text-sm">{index}</p>}
      </div>
      <span className="inline-block">{title}</span>
    </div>
  );
}
