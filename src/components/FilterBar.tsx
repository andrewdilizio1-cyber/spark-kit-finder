import { ToolType, DesignStage, PriceCategory } from "@/types/tools";
import { Search, X, Monitor, Wrench, Package, Scissors, Zap, Cog, BookOpen } from "lucide-react";

const typeOptions: { value: ToolType; label: string; icon: typeof Monitor }[] = [
  { value: "Software", label: "Software", icon: Monitor },
  { value: "Hand Tools", label: "Hand Tools", icon: Wrench },
  { value: "Power Tools", label: "Power Tools", icon: Zap },
  { value: "Machines", label: "Machines", icon: Cog },
  { value: "Materials", label: "Materials", icon: Package },
  { value: "Textiles", label: "Textiles", icon: Scissors },
  { value: "Techniques", label: "Techniques", icon: BookOpen },
];

const stageOptions: DesignStage[] = [
  "Discover", "Imagine", "Ideation", "Design", "Prototype", "Build", "Test", "Management",
];

const priceOptions: PriceCategory[] = ["Free", "Free for Education", "Freemium", "Paid"];

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedTypes: ToolType[];
  onToggleType: (type: ToolType) => void;
  selectedStages: DesignStage[];
  onToggleStage: (stage: DesignStage) => void;
  selectedPrices: PriceCategory[];
  onTogglePrice: (price: PriceCategory) => void;
  resultCount: number;
  onClearAll: () => void;
}

export const FilterBar = ({
  search,
  onSearchChange,
  selectedTypes,
  onToggleType,
  selectedStages,
  onToggleStage,
  selectedPrices,
  onTogglePrice,
  resultCount,
  onClearAll,
}: FilterBarProps) => {
  const hasFilters = search || selectedTypes.length > 0 || selectedStages.length > 0 || selectedPrices.length > 0;

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tools, materials, textiles, techniques..."
          className="w-full rounded-lg border border-input bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Type filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Type</h4>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map(({ value, label, icon: Icon }) => {
            const active = selectedTypes.includes(value);
            return (
              <button
                key={value}
                onClick={() => onToggleType(value)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Design Stage filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Design Stage</h4>
        <div className="flex flex-wrap gap-2">
          {stageOptions.map((stage) => {
            const active = selectedStages.includes(stage);
            return (
              <button
                key={stage}
                onClick={() => onToggleStage(stage)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {stage}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Price</h4>
        <div className="flex flex-wrap gap-2">
          {priceOptions.map((price) => {
            const active = selectedPrices.includes(price);
            return (
              <button
                key={price}
                onClick={() => onTogglePrice(price)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {price}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results & Clear */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{resultCount}</span> tool{resultCount !== 1 ? "s" : ""} found
        </p>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};
