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
import { type RoutePoint } from "@/types/routePoints";
import { CheckIcon } from "lucide-react";
import React from "react";
import { STATUS_POINT_COLOR } from "../consts/statusPointColors";

export type RoutePointAction = {
  title: string;
  description: string;
  action: (point: RoutePoint) => void;
};

interface RoutePointProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "title"> {
  data: RoutePoint;
  index?: number;
  actions?: RoutePointAction[];
}

export function RoutePoint({ actions = [], data }: RoutePointProps) {
  if (actions.length <= 0) {
    return <BasicRoutePoint data={data} />;
  } else {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <BasicRoutePoint data={data} />
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

function BasicRoutePoint({ index, data: { status, title }, className, ...props }: Omit<RoutePointProps, "actions">) {
  return (
    <div className={cn("flex justify-start items-center gap-2 select-none", className)} {...props}>
      <div
        className={cn(
          "route-point-status-indicator",
          `bg-${STATUS_POINT_COLOR[status.toUpperCase()]}-300`,
          "rounded-full aspect-square min-w-6 text-background flex items-center justify-center",
        )}
      >
        {status === "passed" ? <CheckIcon size={20} /> : index && <p className="font-bold text-sm">{index}</p>}
      </div>
      <span className="inline-block">{title}</span>
    </div>
  );
}
