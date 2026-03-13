import { useParams, Link } from "react-router-dom";
import { tools } from "@/data/tools";
import { useFavourites } from "@/hooks/useFavourites";
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Monitor,
  Wrench,
  Zap,
  Cog,
  Package,
  Scissors,
  BookOpen,
} from "lucide-react";
import { ToolType } from "@/types/tools";
import { ToolCard } from "@/components/ToolCard";

const typeConfig: Record<ToolType, { icon: typeof Monitor; className: string; label: string }> = {
  Software: { icon: Monitor, className: "bg-software text-software-foreground", label: "Software" },
  "Hand Tools": { icon: Wrench, className: "bg-equipment text-equipment-foreground", label: "Hand Tool" },
  "Power Tools": { icon: Zap, className: "bg-equipment text-equipment-foreground", label: "Power Tool" },
  Machines: { icon: Cog, className: "bg-equipment text-equipment-foreground", label: "Machine" },
  Materials: { icon: Package, className: "bg-material text-material-foreground", label: "Material" },
  Textiles: { icon: Scissors, className: "bg-accent text-accent-foreground", label: "Textile" },
  Techniques: { icon: BookOpen, className: "bg-secondary text-secondary-foreground", label: "Technique" },
};

const safetyNotes: Record<string, string[]> = {
  "Power Tools": [
    "Always wear safety goggles and appropriate PPE",
    "Ensure workspace is clean and well-lit",
    "Never leave tools unattended while running",
    "Keep fingers away from moving parts",
  ],
  Machines: [
    "Must be trained before use — ask your teacher",
    "Wear safety goggles, tie back loose hair and clothing",
    "Use guards and extraction where fitted",
    "Never rush — let the machine do the work",
  ],
  "Hand Tools": [
    "Always cut away from your body",
    "Secure workpiece in a vice or clamp before cutting",
    "Use the right tool for the job",
    "Report damaged tools to your teacher",
  ],
};

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavourite, toggleFavourite } = useFavourites();
  const tool = tools.find((t) => t.id === id);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Tool not found.</p>
          <Link to="/" className="text-primary hover:underline">← Back to tools</Link>
        </div>
      </div>
    );
  }

  const { icon: TypeIcon, className: typeBadgeClass, label: typeLabel } = typeConfig[tool.type];
  const safety = safetyNotes[tool.type];
  const fav = isFavourite(tool.id);

  // Related tools: same type or shared tags, excluding current
  const related = tools
    .filter((t) => t.id !== tool.id)
    .map((t) => ({
      tool: t,
      score:
        (t.type === tool.type ? 2 : 0) +
        (t.subCategory && t.subCategory === tool.subCategory ? 3 : 0) +
        t.tags.filter((tag) => tool.tags.includes(tag)).length,
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((r) => r.tool);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all tools
        </Link>

        {/* Header */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${typeBadgeClass}`}>
                <TypeIcon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{tool.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeBadgeClass}`}>
                    {typeLabel}
                  </span>
                  {tool.subCategory && (
                    <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {tool.subCategory}
                    </span>
                  )}
                  <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {tool.price}
                  </span>
                  <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {tool.audience}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleFavourite(tool.id)}
              className="shrink-0 rounded-full border border-border p-2.5 transition-colors hover:bg-secondary"
              aria-label={fav ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart className={`h-5 w-5 ${fav ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </button>
          </div>

          <p className="mt-5 text-base text-muted-foreground leading-relaxed">{tool.description}</p>

          {/* Design Stages */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Design Stages
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.designStages.map((stage) => (
                <span key={stage} className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  {stage}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* URL */}
          {tool.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              Visit {tool.name}
            </a>
          )}
        </div>

        {/* Safety Notes */}
        {safety && (
          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">⚠️ Safety Notes</h2>
            <ul className="space-y-2">
              {safety.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Tools */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Related Tools</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((t) => (
                <Link key={t.id} to={`/tool/${t.id}`}>
                  <ToolCard tool={t} compact />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ToolDetail;
