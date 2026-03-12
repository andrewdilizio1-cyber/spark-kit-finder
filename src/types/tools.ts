export type ToolType =
  | "Software"
  | "Hand Tools"
  | "Power Tools"
  | "Machines"
  | "Materials"
  | "Textiles"
  | "Techniques";

export type MaterialSubCategory =
  | "Plastics"
  | "Woods"
  | "Metals"
  | "Composites"
  | "Adhesives"
  | "Finishes";

export type TextileSubCategory =
  | "Fabrics & Fibres"
  | "Fastenings"
  | "Embellishments"
  | "Smart Textiles"
  | "Dyeing & Printing";

export type TechniqueSubCategory =
  | "Joining"
  | "Forming"
  | "Cutting"
  | "Finishing"
  | "Surface Treatment"
  | "Textile Technique"
  | "Digital Fabrication";

export type SubCategory = MaterialSubCategory | TextileSubCategory | TechniqueSubCategory;

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
  subCategory?: SubCategory;
  designStages: DesignStage[];
  price: PriceCategory;
  audience: AgeGroup;
  url?: string;
  tags: string[];
}

// Gamified Learning types
export interface LearningGame {
  id: string;
  name: string;
  description: string;
  url: string;
  skill: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Design Skills" | "Typography" | "Colour" | "Coding" | "Engineering" | "Material Science";
  thumbnail?: string;
}
