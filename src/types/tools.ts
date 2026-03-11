export type ToolType = "Software" | "Equipment" | "Material";

export type DesignStage =
  | "Discover"
  | "Imagine"
  | "Ideation"
  | "Design"
  | "Prototype"
  | "Build"
  | "Test"
  | "Management";

export type PriceCategory = "Free" | "Freemium" | "Paid" | "Free for Education";

export type AgeGroup = "Students" | "Teachers" | "Teachers & Students" | "All";

export interface DesignTool {
  id: string;
  name: string;
  description: string;
  type: ToolType;
  designStages: DesignStage[];
  price: PriceCategory;
  audience: AgeGroup;
  url?: string;
  tags: string[];
}
