import { DesignTool, ToolType, PriceCategory } from "@/types/tools";
import { ExternalLink, Monitor, Wrench, Package } from "lucide-react";

const typeConfig: Record<ToolType, { icon: typeof Monitor; className: string }> = {
  Software: { icon: Monitor, className: "bg-software text-software-foreground" },
  Equipment: { icon: Wrench, className: "bg-equipment text-equipment-foreground" },
  Material: { icon: Package, className: "bg-material text-material-foreground" },
};

const priceColors: Record<PriceCategory, string> = {
  Free: "bg-emerald-100 text-emerald-800",
  Freemium: "bg-sky-100 text-sky-800",
  Paid: "bg-amber-100 text-amber-800",
  "Free for Education": "bg-violet-100 text-violet-800",
};

interface ToolCardProps {
  tool: DesignTool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  const { icon: TypeIcon, className: typeBadgeClass } = typeConfig[tool.type];

  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${typeBadgeClass}`}>
          <TypeIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base leading-tight text-foreground truncate">
            {tool.name}
          </h3>
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${priceColors[tool.price]}`}>
            {tool.price}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
        {tool.description}
      </p>

      {/* Design Stages */}
      <div className="flex flex-wrap gap-1 mb-3">
        {tool.designStages.map((stage) => (
          <span
            key={stage}
            className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {stage}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {tool.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs text-muted-foreground"
          >
            #{tag.replace(/\s+/g, "")}
          </span>
        ))}
      </div>

      {/* Link */}
      {tool.url && (
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Visit Tool
        </a>
      )}
    </div>
  );
};
