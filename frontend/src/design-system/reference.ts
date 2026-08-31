export type ReferenceDisposition = "USE" | "ADAPT" | "INSPIRATION_ONLY" | "REJECT";

export interface ReferenceInfluence {
  id: string;
  name: string;
  disposition: ReferenceDisposition;
  summary: string;
  translation: string;
}

export const referenceInfluences: readonly ReferenceInfluence[] = [
  {
    id: "01",
    name: "Petal Soft",
    disposition: "ADAPT",
    summary: "Tonal surfaces, warm social framing, and a clear brand anchor.",
    translation: "Kept as the legacy comparison theme and adapted into semantic surface roles.",
  },
  {
    id: "02",
    name: "Custard Pop",
    disposition: "USE",
    summary: "Stronger button states, readable status treatments, and tactile depth.",
    translation: "Used for action-state guidance, focus visibility, and restrained pressed feedback.",
  },
  {
    id: "03",
    name: "Apricot Air",
    disposition: "USE",
    summary: "Breathing room for onboarding, invites, and high-consideration forms.",
    translation: "Used in spacing, form-section, and wide-layout guidance.",
  },
  {
    id: "04",
    name: "Mauve Editorial",
    disposition: "ADAPT",
    summary: "Compact information hierarchy for members, bills, and operational states.",
    translation: "Adapted into quiet cards, metadata rows, and compact density guidance.",
  },
  {
    id: "05",
    name: "Inverse Night",
    disposition: "ADAPT",
    summary: "An inverse surface for evening context and rare emphasis.",
    translation: "Adapted as the inverse semantic surface, never as a default dark mode.",
  },
  {
    id: "06",
    name: "Luxe Noir",
    disposition: "INSPIRATION_ONLY",
    summary: "Premium plum, ivory, and champagne-gold mood.",
    translation: "Reserved for future special-event art direction; status contrast remains more important.",
  },
  {
    id: "07",
    name: "Modern Pulse",
    disposition: "ADAPT",
    summary: "Clear state changes and energetic action emphasis.",
    translation: "Adapted into shared motion tokens and state matrices without adopting neon gradients.",
  },
  {
    id: "08",
    name: "Modular Grid",
    disposition: "USE",
    summary: "Modular layouts that separate role, state, metadata, and action.",
    translation: "Used in card anatomy, responsive grids, and component composition rules.",
  },
  {
    id: "09",
    name: "Food Market",
    disposition: "USE",
    summary: "Tomato, basil, mustard, and food-led surfaces make the product feel appetizing.",
    translation: "Used to refine Ember’s secondary/fresh roles and media-first food treatment.",
  },
  {
    id: "10",
    name: "Olive Fire",
    disposition: "ADAPT",
    summary: "Olive/forest contrast, copper highlight, spotlight composition, and mobile navigation.",
    translation: "Adapted into the reference palette, mobile-density, and quiet highlight guidance.",
  },
  {
    id: "11",
    name: "Raw reference implementation",
    disposition: "REJECT",
    summary: "Unscoped global CSS, static fixtures, emoji icons, and one-off literal shadows.",
    translation: "Not copied; translated into scoped tokens, Lucide icons, typed props, and semantic states.",
  },
] as const;

export const referencePalette = [
  { name: "Black Forest", value: "#283618", role: "deep food/social contrast" },
  { name: "Food Market Tomato", value: "#C94E43", role: "appetite/action reference" },
  { name: "Olive Leaf", value: "#606C38", role: "fresh/grounded secondary" },
  { name: "Sunlit Clay", value: "#DDA15E", role: "warm secondary highlight" },
  { name: "Light Mustard", value: "#F2CF64", role: "appetite attention" },
  { name: "Cornsilk", value: "#FEFAE0", role: "rice/paper surface" },
  { name: "Copperwood", value: "#BC6C25", role: "reference-derived secondary token" },
] as const;

export const colorUsageRules = [
  { label: "Canvas", value: "--ff-bg-canvas", guidance: "Page background; warm and quiet." },
  { label: "Primary surface", value: "--ff-bg-surface", guidance: "Readable content group or card." },
  { label: "Secondary surface", value: "--ff-bg-surface-soft", guidance: "Low-noise grouping and continuation state." },
  { label: "Primary CTA", value: "--ff-brand-primary", guidance: "One important next action." },
  { label: "Food accent", value: "--ff-brand-accent", guidance: "Appetite, energy, highlight, or secondary CTA." },
  { label: "Fresh accent", value: "--ff-brand-fresh", guidance: "Food, health, ready, or grounded context." },
  { label: "Functional status", value: "--ff-success / --ff-warning / --ff-danger", guidance: "System state only; never brand decoration." },
  { label: "Border", value: "--ff-border-subtle / --ff-border-default", guidance: "Quiet grouping before adding more color." },
] as const;

export const layoutGuidance = [
  { label: "Mobile", value: "360–430px", guidance: "Single-column task flow, 16px page gutter, reachable actions." },
  { label: "Tablet", value: "768–1023px", guidance: "Progressive two-column composition when content benefits from it." },
  { label: "Desktop", value: "1024px+", guidance: "Wide application composition; never a centered phone layout." },
  { label: "Container", value: "min(100% - gutters, 1680px)", guidance: "Use available width while protecting reading measure." },
  { label: "Grid", value: "1 / 2 / 3 / 4 columns", guidance: "Choose by content purpose, not by viewport alone." },
  { label: "Spacing", value: "section 32–64px", guidance: "Use the shared rhythm before adding local values." },
] as const;

export const radiusGuidance = [
  { label: "sm", value: "6px", use: "focus rings, compact controls" },
  { label: "md", value: "12px", use: "inputs, buttons, small cards" },
  { label: "lg", value: "18px", use: "standard cards and panels" },
  { label: "xl", value: "28px", use: "hero, sheets, major sections" },
  { label: "2xl", value: "40px", use: "rare brand moments" },
  { label: "pill", value: "999px", use: "chips, badges, status" },
] as const;

export const elevationGuidance = [
  { label: "none", value: "flat", use: "canvas, quiet sections" },
  { label: "sm", value: "soft", use: "primary action, selected media" },
  { label: "md", value: "raised", use: "menus, cards needing lift" },
  { label: "lg", value: "emphasis", use: "rare hero or modal emphasis" },
  { label: "floating", value: "highest", use: "sheets, floating navigation" },
] as const;

export const iconGuidance = [
  { label: "16px", use: "inline metadata and compact labels" },
  { label: "20px", use: "buttons and navigation" },
  { label: "24px", use: "icon wells and status" },
  { label: "32px", use: "empty states and hero moments" },
] as const;

export const densityGuidance = [
  { label: "Compact", use: "bill rows, member lists, metadata", rule: "12px gaps; keep one primary datum per row." },
  { label: "Default", use: "home cards, restaurant cards, standard forms", rule: "16–24px internal spacing; one clear action." },
  { label: "Comfortable", use: "onboarding, hero, preference selection", rule: "24–32px grouping; let the decision breathe." },
] as const;

export const foodFightStates = [
  { label: "Ready", tone: "success", copy: "Everyone can take the next action." },
  { label: "Waiting", tone: "warning", copy: "Keep the missing participant and action visible." },
  { label: "Generating", tone: "info", copy: "Explain progress without claiming hidden computation." },
  { label: "Voting", tone: "brand", copy: "Make selected, passed, and remaining choices distinct." },
  { label: "Final Vote", tone: "accent", copy: "Use stronger emphasis while preserving the task." },
  { label: "Winner", tone: "accent", copy: "Reserve expressive celebration for the resolved result." },
  { label: "Host Tie Break", tone: "warning", copy: "State the role and decision responsibility explicitly." },
  { label: "Completed", tone: "success", copy: "Return users to the next useful product surface." },
] as const;

export const moneyExamples = [
  { value: "฿1,040", label: "reported meal bill value" },
  { value: "฿208 / person", label: "individual share" },
  { value: "Paid", label: "payment-record state" },
  { value: "Unpaid", label: "payment-record state" },
  { value: "Pending", label: "waiting state" },
] as const;
