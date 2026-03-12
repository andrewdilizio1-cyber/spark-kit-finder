import { useState, useMemo } from "react";
import { learningGames } from "@/data/games";
import { LearningGame } from "@/types/tools";
import { Link } from "react-router-dom";
import { ExternalLink, Search, Gamepad2, ArrowLeft, Star } from "lucide-react";

type GameCategory = LearningGame["category"];
type GameDifficulty = LearningGame["difficulty"];

const categories: GameCategory[] = [
  "Design Skills", "Typography", "Colour", "Coding", "Engineering", "Material Science",
];

const difficulties: GameDifficulty[] = ["Beginner", "Intermediate", "Advanced"];

const difficultyColors: Record<GameDifficulty, string> = {
  Beginner: "bg-emerald-100 text-emerald-800",
  Intermediate: "bg-amber-100 text-amber-800",
  Advanced: "bg-red-100 text-red-800",
};

const categoryIcons: Record<GameCategory, string> = {
  "Design Skills": "🎨",
  Typography: "🔤",
  Colour: "🌈",
  Coding: "💻",
  Engineering: "⚙️",
  "Material Science": "🧪",
};

const GamifiedLearning = () => {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<GameCategory[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<GameDifficulty[]>([]);

  const toggleCategory = (cat: GameCategory) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const toggleDifficulty = (diff: GameDifficulty) =>
    setSelectedDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );

  const filtered = useMemo(() => {
    return learningGames.filter((game) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          game.name.toLowerCase().includes(q) ||
          game.description.toLowerCase().includes(q) ||
          game.skill.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(game.category)) return false;
      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(game.difficulty)) return false;
      return true;
    });
  }, [search, selectedCategories, selectedDifficulties]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-20 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tool Library
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6">
            <Gamepad2 className="h-4 w-4" />
            Level Up Your Skills
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary-foreground mb-4 leading-tight">
            Gamified Learning
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-primary-foreground/80">
            Sharpen your design, typography, colour, and coding skills through interactive games and challenges.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        {/* Filters */}
        <div className="mb-10 rounded-xl border border-border bg-card p-5 sm:p-6 space-y-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games and skills..."
              className="w-full rounded-lg border border-input bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Category */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Skill Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{categoryIcons[cat]}</span>
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => {
                const active = selectedDifficulties.includes(diff);
                return (
                  <button
                    key={diff}
                    onClick={() => toggleDifficulty(diff)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-sm text-muted-foreground pt-1">
            <span className="font-semibold text-foreground">{filtered.length}</span> game{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Games Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((game, i) => (
              <div
                key={game.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              >
                <div className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                      {categoryIcons[game.category]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base leading-tight text-foreground">
                        {game.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColors[game.difficulty]}`}>
                          {game.difficulty}
                        </span>
                        <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          {game.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 flex-1">
                    {game.description}
                  </p>

                  <div className="flex items-center gap-1.5 mb-4 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 text-primary" />
                    <span className="font-medium">Skill:</span> {game.skill}
                  </div>

                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Play Game
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-muted-foreground">No games match your filters.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>The Innovation Hub — Built for design teachers & students</p>
      </footer>
    </div>
  );
};

export default GamifiedLearning;
