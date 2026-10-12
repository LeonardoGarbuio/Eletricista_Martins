import { Zap, CircuitBoard, ShowerHead, Lightbulb, Plug, Building2, BrickWall, Hammer, Grid2X2, Droplets, PaintRoller, Waves, House, Trees, Wrench, type LucideProps } from "lucide-react";
import type { ServiceIcon as IconName } from "@/data/services";
const icons = { bolt: Zap, circuit: CircuitBoard, shower: ShowerHead, light: Lightbulb, plug: Plug, building: Building2, brick: BrickWall, hammer: Hammer, tiles: Grid2X2, pipe: Droplets, paint: PaintRoller, gutter: Waves, roof: House, garden: Trees, tools: Wrench };
export function ServiceIcon({ name, ...props }: LucideProps & { name: IconName }) {
  const Icon = icons[name];
  return <Icon strokeWidth={1.5} aria-hidden="true" {...props} />;
}
