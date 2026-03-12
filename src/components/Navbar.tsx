import { Link, useLocation } from "react-router-dom";
import { Lightbulb, Gamepad2 } from "lucide-react";

const navItems = [
  { to: "/", label: "Tool Library", icon: Lightbulb },
  { to: "/games", label: "Gamified Learning", icon: Gamepad2 },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
          <Lightbulb className="h-5 w-5 text-primary" />
          The Innovation Hub
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
