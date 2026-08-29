export type DesignSystemTheme = "legacy" | "ember" | "street" | "bistro";

export interface DesignSystemThemeOption {
  id: DesignSystemTheme;
  name: string;
  strapline: string;
  description: string;
  palette: readonly { name: string; value: string }[];
  questions: readonly string[];
}

export const designSystemThemes: readonly DesignSystemThemeOption[] = [
  {
    id: "legacy",
    name: "Legacy Soft Editorial",
    strapline: "The existing reference",
    description: "The approved pastel reference preserved as a comparison point, not the new production direction.",
    palette: [
      { name: "Pastel Petal", value: "#FFC6D9" },
      { name: "Soft Apricot", value: "#FFE1C6" },
      { name: "Vanilla Custard", value: "#FFF7AE" },
      { name: "Blackberry Cream", value: "#48284A" },
      { name: "Dusty Mauve", value: "#916C80" },
    ],
    questions: ["Does the softness still feel food-first?", "Where should the new system add more appetite and confidence?"],
  },
  {
    id: "ember",
    name: "Ember Kitchen",
    strapline: "Fire & flavor",
    description: "Warm bone, chili energy, saffron appetite, and herb freshness for a confident social food product.",
    palette: [
      { name: "Ink / Charcoal", value: "#211D19" },
      { name: "Chili / Fight", value: "#D84A32" },
      { name: "Saffron / Energy", value: "#F2AF32" },
      { name: "Herb / Fresh", value: "#68784D" },
      { name: "Rice / Canvas", value: "#F4EEE3" },
    ],
    questions: ["Does the system feel energetic without becoming loud?", "Does food imagery have enough room to lead?"],
  },
  {
    id: "street",
    name: "Street Food Night",
    strapline: "High contrast social",
    description: "Ink, tomato, mustard, and herb create an urban, youthful direction with strong action contrast.",
    palette: [
      { name: "Ink", value: "#171717" },
      { name: "Tomato", value: "#E55538" },
      { name: "Mustard", value: "#DFA52B" },
      { name: "Herb", value: "#789447" },
      { name: "Rice Paper", value: "#F5F0E6" },
    ],
    questions: ["Is the contrast playful rather than aggressive?", "Can quieter bill and profile surfaces still feel at home here?"],
  },
  {
    id: "bistro",
    name: "Modern Bistro",
    strapline: "Premium food editorial",
    description: "Espresso, terracotta, gold, sage, and bone make a mature system for considered food discovery.",
    palette: [
      { name: "Espresso", value: "#2B211A" },
      { name: "Terracotta", value: "#C86543" },
      { name: "Burnished Gold", value: "#C99B3F" },
      { name: "Sage", value: "#71806A" },
      { name: "Bone", value: "#F2EADF" },
    ],
    questions: ["Does the premium tone remain approachable?", "Can the system support a competitive FoodFight moment?"],
  },
] as const;

export const typographyScale = [
  { name: "Display XL", token: "--ff-type-display-xl", size: "clamp(3rem, 7vw, 6.5rem)", line: "0.94", weight: "700", use: "hero and rare editorial moments" },
  { name: "Display L", token: "--ff-type-display-lg", size: "clamp(2.5rem, 5vw, 4.5rem)", line: "0.98", weight: "700", use: "feature headlines" },
  { name: "Heading 1", token: "--ff-type-heading-1", size: "2.25rem", line: "1.08", weight: "700", use: "page titles" },
  { name: "Heading 2", token: "--ff-type-heading-2", size: "1.75rem", line: "1.15", weight: "700", use: "section titles" },
  { name: "Heading 3", token: "--ff-type-heading-3", size: "1.25rem", line: "1.25", weight: "700", use: "card titles" },
  { name: "Title L", token: "--ff-type-title-lg", size: "1.25rem", line: "1.3", weight: "600", use: "prominent card and panel titles" },
  { name: "Title", token: "--ff-type-title", size: "1.0625rem", line: "1.35", weight: "600", use: "emphasized labels" },
  { name: "Body L", token: "--ff-type-body-lg", size: "1.0625rem", line: "1.6", weight: "400", use: "introductory copy" },
  { name: "Body", token: "--ff-type-body", size: "0.9375rem", line: "1.55", weight: "400", use: "default reading" },
  { name: "Body S", token: "--ff-type-body-sm", size: "0.8125rem", line: "1.45", weight: "400", use: "supporting copy" },
  { name: "Label L", token: "--ff-type-label-lg", size: "0.8125rem", line: "1.2", weight: "700", use: "field labels and navigation" },
  { name: "Label", token: "--ff-type-label", size: "0.6875rem", line: "1.25", weight: "700", use: "metadata and chips" },
  { name: "Caption", token: "--ff-type-caption", size: "0.6875rem", line: "1.3", weight: "500", use: "quiet helper text" },
] as const;

export const spacingScale = [2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80] as const;

export const mediaGuidance = [
  { ratio: "16:9", className: "ff-ds-media--16-9", usage: "hero, feature, campaign food imagery", size: "1600 × 900" },
  { ratio: "4:3", className: "ff-ds-media--4-3", usage: "food, restaurant, room, history card", size: "1200 × 900" },
  { ratio: "1:1", className: "ff-ds-media--1-1", usage: "food thumbnail, avatar, compact recommendation", size: "800 × 800" },
  { ratio: "3:4", className: "ff-ds-media--3-4", usage: "receipt, portrait, editorial tall media", size: "900 × 1200" },
] as const;

export const navigationItems = ["Home", "History", "Bills", "Profile"] as const;

export const brandLogoAssets = {
  primary: {
    src: "/logoIcon/Primary.png",
    width: 2172,
    height: 724,
    aspectRatio: 2172 / 724, // 3.000
    name: "Primary (Horizontal)",
    description: "Horizontal lockup with symbol and wordmark for headers, top navigation, marketing headers, and wide layouts.",
  },
  stacked: {
    src: "/logoIcon/stacked.png",
    width: 1168,
    height: 1346,
    aspectRatio: 1168 / 1346,
    name: "Stacked (Vertical)",
    description: "Vertically stacked lockup with crowned crossed-utensils symbol above wordmark and tagline for centered hero, auth cards, splash screens, and brand blocks.",
  },
  icon: {
    src: "/logoIcon/icon.png",
    width: 1254,
    height: 1254,
    aspectRatio: 1, // 1.000
    name: "Icon (Symbol Only)",
    description: "Symbol-only mark for compact navigation, small indicators, avatar placeholders, and favicon candidate.",
  },
  app: {
    src: "/logoIcon/iconapp.png",
    width: 1254,
    height: 1254,
    aspectRatio: 1, // 1.000
    name: "App Icon (Squircle)",
    description: "Rounded application icon for PWA, app store, and OS home screen contexts.",
  },
} as const;

export type BrandLogoVariant = keyof typeof brandLogoAssets;
