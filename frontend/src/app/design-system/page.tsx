import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import {
  ColorShowcase,
  TypographyShowcase,
  ButtonShowcase,
  FormShowcase,
  FeedbackShowcase,
  CardShowcase,
  MotionShowcase,
} from "@/features/design-system/components";

export const metadata: Metadata = {
  title: "FoodFighter Design System V1 Reference",
  description: "Mobile-first design system specification and component catalog for FoodFighter",
};

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen py-6 sm:py-10 bg-background text-text-primary">
      <PageContainer maxWidth="lg" className="space-y-10">
        {/* Header */}
        <header className="space-y-3 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" size="md">
              FoodFighter Design System V1
            </Badge>
            <Badge variant="petal" size="md">
              Mobile-First
            </Badge>
            <Badge variant="apricot" size="md">
              Internal Dev Reference
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-primary">
            Design System Reference
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Standardized UI primitives, semantic tokens, accessible form controls, and restrained motion.
            Designed mobile-first for 360px–430px viewports with responsive tablet and desktop enhancements.
          </p>
        </header>

        {/* Section Index / Quick Navigation */}
        <nav
          aria-label="Design System Navigation"
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs"
        >
          <a
            href="#colors"
            className="shrink-0 px-3 py-1.5 rounded-md bg-surface border border-border text-text-secondary hover:text-brand-primary hover:border-brand-secondary transition-colors"
          >
            Brand Colors
          </a>
          <a
            href="#typography"
            className="shrink-0 px-3 py-1.5 rounded-md bg-surface border border-border text-text-secondary hover:text-brand-primary hover:border-brand-secondary transition-colors"
          >
            Typography
          </a>
          <a
            href="#buttons"
            className="shrink-0 px-3 py-1.5 rounded-md bg-surface border border-border text-text-secondary hover:text-brand-primary hover:border-brand-secondary transition-colors"
          >
            Buttons
          </a>
          <a
            href="#forms"
            className="shrink-0 px-3 py-1.5 rounded-md bg-surface border border-border text-text-secondary hover:text-brand-primary hover:border-brand-secondary transition-colors"
          >
            Forms
          </a>
          <a
            href="#feedback"
            className="shrink-0 px-3 py-1.5 rounded-md bg-surface border border-border text-text-secondary hover:text-brand-primary hover:border-brand-secondary transition-colors"
          >
            Feedback & Badges
          </a>
          <a
            href="#cards"
            className="shrink-0 px-3 py-1.5 rounded-md bg-surface border border-border text-text-secondary hover:text-brand-primary hover:border-brand-secondary transition-colors"
          >
            Cards & Surfaces
          </a>
          <a
            href="#motion"
            className="shrink-0 px-3 py-1.5 rounded-md bg-surface border border-border text-text-secondary hover:text-brand-primary hover:border-brand-secondary transition-colors"
          >
            Motion
          </a>
        </nav>

        {/* 1. Brand Palette */}
        <section id="colors" className="scroll-mt-6">
          <ColorShowcase />
        </section>

        {/* 2. Typography */}
        <section id="typography" className="scroll-mt-6">
          <TypographyShowcase />
        </section>

        {/* 3. Buttons & IconButtons */}
        <section id="buttons" className="scroll-mt-6">
          <ButtonShowcase />
        </section>

        {/* 4. Form Controls */}
        <section id="forms" className="scroll-mt-6">
          <FormShowcase />
        </section>

        {/* 5. Feedback, Badges & Alerts */}
        <section id="feedback" className="scroll-mt-6">
          <FeedbackShowcase />
        </section>

        {/* 6. Cards & Surfaces */}
        <section id="cards" className="scroll-mt-6">
          <CardShowcase />
        </section>

        {/* 7. Motion */}
        <section id="motion" className="scroll-mt-6">
          <MotionShowcase />
        </section>
      </PageContainer>
    </div>
  );
}
