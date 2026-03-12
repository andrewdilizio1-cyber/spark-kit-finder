import { DesignTool } from "@/types/tools";
import { softwareTools } from "./software";
import { handTools } from "./hand-tools";
import { powerTools } from "./power-tools";
import { machines } from "./machines";
import { materials } from "./materials";
import { textiles } from "./textiles";
import { techniques } from "./techniques";

export const tools: DesignTool[] = [
  ...softwareTools,
  ...handTools,
  ...powerTools,
  ...machines,
  ...materials,
  ...textiles,
  ...techniques,
];
