import heroBg from "@/assets/hero-bg.jpg";
import { Lightbulb } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6">
          <Lightbulb className="h-4 w-4" />
          For Innovators & Makers
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary-foreground mb-4 leading-tight">
          The Innovation Hub
        </h1>
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-primary-foreground/80">
          Design is human insight, amplified by the right tools. Search for software, equipment and materials to help you during your design process.
        </p>
      </div>
    </section>
  );
};
