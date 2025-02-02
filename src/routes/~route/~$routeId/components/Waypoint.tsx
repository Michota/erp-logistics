import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { type Waypoint } from "@/types/Waypoint";
import { CheckIcon } from "lucide-react";
import React from "react";
import { getWaypointColor } from "../utils/waypoints";

export type WaypointAction = {
  title: string;
  description: string;
  action: (waypoint: Waypoint) => void;
};

interface WayPointProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "title"> {
  data: Waypoint;
  index?: number;
  actions?: WaypointAction[];
}

export function Waypoint({ actions = [], data }: WayPointProps) {
  console.log("🚀 ~ file: Waypoint.tsx:30 ~ Waypoint ~ actions:", actions);
  if (actions.length <= 0) {
    return <BasicWaypoint data={data} />;
  } else {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <BasicWaypoint data={data} />
        </DrawerTrigger>
        <DrawerContent className="px-6 gap-4">
          <DrawerHeader>
            <DrawerTitle>Waypoint actions</DrawerTitle>
            <DrawerDescription>You are about to perform an action with {data.title}</DrawerDescription>
          </DrawerHeader>
          {/* in future, the children-like component might be rendered there instead of button-mapping */}
          <div className="flex flex-col gap-4">
            {actions.map((action) => (
              <Button onClick={() => action.action(data)}>{action.title}</Button>
            ))}
          </div>
          <DrawerFooter className="px-0">
            <DrawerClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}

function BasicWaypoint({ index, data: { status, title }, className, ...props }: Omit<WayPointProps, "actions">) {
  return (
    <div className={cn("flex justify-start items-center gap-2 select-none", className)} {...props}>
      <div
        className={cn(
          "waypoint-status-indicator",
          `bg-${getWaypointColor(status)}-300`,
          "rounded-full aspect-square min-w-6 text-background flex items-center justify-center",
        )}
      >
        {status === "passed" ? <CheckIcon size={20} /> : index && <p className="font-bold text-sm">{index}</p>}
      </div>
      <span className="inline-block">{title}</span>
    </div>
  );
}
