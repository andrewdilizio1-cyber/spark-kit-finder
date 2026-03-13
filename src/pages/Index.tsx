import { useState, useMemo } from "react";
import { tools } from "@/data/tools";
import { ToolType, DesignStage, PriceCategory, SubCategory } from "@/types/tools";
import { HeroSection } from "@/components/HeroSection";
import { FilterBar } from "@/components/FilterBar";
import { ToolCard } from "@/components/ToolCard";
import { useFavourites } from "@/hooks/useFavourites";

const toggleItem = <T,>(arr: T[], item: T): T[] =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<ToolType[]>([]);
  const [selectedStages, setSelectedStages] = useState<DesignStage[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<PriceCategory[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<SubCategory[]>([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const { isFavourite, toggleFavourite, count: favouriteCount } = useFavourites();

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      // Favourites
      if (showFavourites && !isFavourite(tool.id)) return false;
      // Search
      if (search) {
        const q = search.toLowerCase();
        const match =
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.tags.some((t) => t.toLowerCase().includes(q));
        if (!match) return false;
      }
      // Type
      if (selectedTypes.length > 0 && !selectedTypes.includes(tool.type)) return false;
      // Sub-category
      if (selectedSubCategories.length > 0 && (!tool.subCategory || !selectedSubCategories.includes(tool.subCategory))) return false;
      // Stage
      if (selectedStages.length > 0 && !tool.designStages.some((s) => selectedStages.includes(s))) return false;
      // Price
      if (selectedPrices.length > 0 && !selectedPrices.includes(tool.price)) return false;
      return true;
    });
  }, [search, selectedTypes, selectedStages, selectedPrices, selectedSubCategories, showFavourites, isFavourite]);

  const clearAll = () => {
    setSearch("");
    setSelectedTypes([]);
    setSelectedStages([]);
    setSelectedPrices([]);
    setSelectedSubCategories([]);
    setShowFavourites(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        {/* Filter Section */}
        <div className="mb-10 rounded-xl border border-border bg-card p-5 sm:p-6">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            selectedTypes={selectedTypes}
            onToggleType={(t) => setSelectedTypes(toggleItem(selectedTypes, t))}
            selectedStages={selectedStages}
            onToggleStage={(s) => setSelectedStages(toggleItem(selectedStages, s))}
            selectedPrices={selectedPrices}
            onTogglePrice={(p) => setSelectedPrices(toggleItem(selectedPrices, p))}
            selectedSubCategories={selectedSubCategories}
            onToggleSubCategory={(s) => setSelectedSubCategories(toggleItem(selectedSubCategories, s))}
            showFavourites={showFavourites}
            onToggleFavourites={() => setShowFavourites((v) => !v)}
            favouriteCount={favouriteCount}
            resultCount={filtered.length}
            onClearAll={clearAll}
          />
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((tool, i) => (
              <div
                key={tool.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              >
                <ToolCard
                  tool={tool}
                  isFavourite={isFavourite(tool.id)}
                  onToggleFavourite={toggleFavourite}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-muted-foreground">No tools match your filters.</p>
            <button onClick={clearAll} className="mt-3 text-sm text-primary hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>The Innovation Hub — Built for design teachers & students</p>
      </footer>
    </div>
  );
};

export default Index;
