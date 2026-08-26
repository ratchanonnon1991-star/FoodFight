"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChefHat,
  CircleDollarSign,
  Clock3,
  Flame,
  Heart,
  Home,
  Image as ImageIcon,
  ReceiptText,
  Search,
  Settings2,
  Utensils,
  Users,
} from "lucide-react";
import {
  ActionPanel,
  BillContinuationCard,
  EmptyState,
  ErrorState,
  FoodCard,
  FoodHero,
  FormSection,
  HostBadge,
  HistoryCard,
  KeyValue,
  ListItem,
  MemberAvatarGroup,
  MemberRow,
  MediaCard,
  NavigationSpecimen,
  PageHeader,
  ProfileSummaryCard,
  ReadyState,
  RecommendationCard,
  RestaurantCard,
  RoomCard,
  SectionHeader,
  Stat,
} from "./patterns";
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  Button,
  BottomSheet,
  CuisineChip,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Combobox,
  ConfirmationDialog,
  Divider,
  HelpHint,
  IconButton,
  IconWell,
  Menu,
  Progress,
  PreferenceChip,
  Radio,
  RadioGroup,
  SearchInput,
  SelectField,
  SideSheet,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  Tag,
  Textarea,
  TextInput,
  Toast,
  Tooltip,
} from "./primitives";
import { DesignSystemProvider } from "./provider";
import { MediaFrame } from "./media";
import {
  mediaGuidance,
  spacingScale,
  typographyScale,
  designSystemThemes,
  type DesignSystemTheme,
} from "./tokens";
import {
  colorUsageRules,
  densityGuidance,
  elevationGuidance,
  foodFightStates,
  iconGuidance,
  layoutGuidance,
  moneyExamples,
  radiusGuidance,
  referenceInfluences,
  referencePalette,
} from "./reference";

const foodImage = "/assets/food/international-food/thai-pad-thai-540.png";
const typographySamples = [
  "Food, with a little fight.",
  "กินอะไรดี? Let’s decide.",
  "Build a better group meal",
  "Every voice gets a seat at the table",
  "Tom Yum · ต้มยำ",
  "Your table, your call",
  "Recommended for your room",
  "A warm, useful system for real food moments.",
  "Choose a meal, compare the room, keep moving.",
  "Supporting copy · 1,280 ฿",
  "ROOM STATUS · สถานะห้อง",
  "4 members · 2 paid",
  "Updated just now · พร้อมแล้ว",
] as const;
const navSections = [
  ["FOUNDATIONS", [["overview", "Overview"], ["brand", "Brand & color"], ["references", "Reference influence"], ["type", "Typography"], ["space", "Spacing & shape"], ["layout", "Grid & layout"], ["motion", "Motion & icons"]]],
  ["COMPONENTS", [["actions", "Buttons"], ["forms", "Forms & selection"], ["status", "Chips & status"], ["feedback", "Feedback & loading"], ["media", "Media"], ["cards", "Cards & patterns"]]],
  ["PATTERNS", [["navigation", "Navigation"], ["overlays", "Overlays"], ["composition", "Page patterns"], ["social", "Social & data"], ["responsive", "Responsive examples"], ["accessibility", "Accessibility"]]],
] as const;

function Section({ id, kicker, title, description, children }: { id: string; kicker: string; title: string; description: string; children: React.ReactNode }) {
  return <section id={id} className="ff-ds-showroom__section"><div className="ff-ds-showroom__section-heading"><div><span className="ff-ds-showroom__section-kicker">{kicker}</span><h2>{title}</h2></div><p>{description}</p></div>{children}</section>;
}

function CodeNote({ children }: { children: React.ReactNode }) {
  return <code className="ff-ds-showroom__code">{children}</code>;
}

export function DesignSystemShowroom() {
  const [theme, setTheme] = React.useState<DesignSystemTheme>("ember");
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [sideSheetOpen, setSideSheetOpen] = React.useState(false);
  const [toastVisible, setToastVisible] = React.useState(true);
  const [selectedChip, setSelectedChip] = React.useState("Thai");
  const [radioValue, setRadioValue] = React.useState("group");
  const [switchValue, setSwitchValue] = React.useState(true);
  const [tabValue, setTabValue] = React.useState("recommended");

  const changeTheme = (nextTheme: DesignSystemTheme) => {
    setTheme(nextTheme);
  };

  const runLoadingDemo = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 950);
  };

  return (
    <DesignSystemProvider theme={theme} reducedMotion={reducedMotion}>
      <div className="ff-ds-showroom">
        <header className="ff-ds-showroom__header">
          <div className="ff-ds-showroom__brand">
            <span className="ff-ds-showroom__mark"><Flame aria-hidden="true" /></span>
            <div><strong>FoodFighter</strong><span>Design System V4.1 · Fire &amp; Flavor</span></div>
          </div>
          <div className="ff-ds-showroom__header-actions">
            <Badge variant="warning" icon={<Settings2 aria-hidden="true" />}>Internal showroom</Badge>
            <Button size="sm" variant="tertiary" onClick={() => setReducedMotion((value) => !value)} leadingIcon={<Clock3 aria-hidden="true" />}>{reducedMotion ? "Motion reduced" : "Motion on"}</Button>
            <Link className="ff-ds-button ff-ds-button--sm ff-ds-button--ghost" href="/">Exit showroom</Link>
          </div>
        </header>

        <div className="ff-ds-showroom__layout">
          <aside role="navigation" className="ff-ds-showroom__sidebar" aria-label="Design System Navigation">
            {navSections.map(([label, items]) => <React.Fragment key={label}><span className="ff-ds-showroom__sidebar-label">{label}</span>{items.map(([id, itemLabel]) => <a key={id} href={`#${id}`}>{itemLabel}</a>)}</React.Fragment>)}
          </aside>

          <main className="ff-ds-showroom__main">
            <section id="overview" className="ff-ds-showroom__intro">
              <div>
                <span className="ff-ds-eyebrow">V4.1 reference assimilation</span>
                <h1>Design System Reference</h1>
                <p>FoodFighter V4.1 is a food-first library for a confident social product. The system is isolated to this showroom until the owner approves a migration path.</p>
              </div>
              <div className="ff-ds-showroom__intro-card"><strong>Production-safe boundary</strong><p>Only this route uses the V4 scope. Existing Home, Room, Bill, History, Profile, and Auth pages keep their current visuals and behavior.</p><div className="ff-ds-showroom__row" style={{ marginTop: "1rem" }}><Badge variant="success" icon={<Check aria-hidden="true" />}>No product migration</Badge><Badge variant="neutral">Typed React</Badge></div></div>
            </section>

            <Section id="brand" kicker="01 / Foundation" title="One system, four possible moods." description="The seed direction is Ember Kitchen. The comparison themes use the same semantic slots so the owner can judge character without a CSS fork.">
              <div className="ff-ds-showroom__stack">
                <div className="ff-ds-showroom__theme-grid">
                  {designSystemThemes.map((option) => <button key={option.id} type="button" className={`ff-ds-showroom__theme-button ${theme === option.id ? "ff-ds-showroom__theme-button--active" : ""}`} aria-pressed={theme === option.id} onClick={() => changeTheme(option.id)}><span className="ff-ds-showroom__theme-dots">{option.palette.map((color) => <i key={color.name} className="ff-ds-showroom__theme-dot" style={{ backgroundColor: color.value }} />)}</span><strong>{option.name}</strong><span>{option.strapline}</span></button>)}
                </div>
                <Card surface="brand" padding="lg"><div className="ff-ds-showroom__row"><Badge variant="brand" icon={<Flame aria-hidden="true" />}>Active direction</Badge><span style={{ opacity: 0.78, fontSize: "0.75rem" }}>{designSystemThemes.find((option) => option.id === theme)?.description}</span></div></Card>
                <div className="ff-ds-showroom__panel"><h3>Brand palette</h3><div className="ff-ds-showroom__swatches">{(designSystemThemes.find((option) => option.id === theme)?.palette ?? []).map((color) => <div key={color.name} className="ff-ds-showroom__swatch"><div className="ff-ds-showroom__swatch-color" style={{ backgroundColor: color.value }} /><div className="ff-ds-showroom__swatch-copy"><strong>{color.name}</strong><span>{color.value}</span></div></div>)}</div></div>
                <div className="ff-ds-showroom__grid"><div className="ff-ds-showroom__panel"><h3>Semantic surface hierarchy</h3><div className="ff-ds-showroom__row"><span className="ff-ds-showroom__token-chip ff-ds-showroom__token-chip--canvas">Canvas</span><span className="ff-ds-showroom__token-chip ff-ds-showroom__token-chip--subtle">Subtle</span><span className="ff-ds-showroom__token-chip ff-ds-showroom__token-chip--surface">Surface</span><span className="ff-ds-showroom__token-chip ff-ds-showroom__token-chip--inverse">Inverse</span></div></div><div className="ff-ds-showroom__panel"><h3>Functional status</h3><div className="ff-ds-showroom__row"><Badge variant="success" dot>Success</Badge><Badge variant="warning" dot>Warning</Badge><Badge variant="danger" dot>Danger</Badge><Badge variant="info" dot>Info</Badge></div></div></div>
                <div className="ff-ds-showroom__do-dont"><div className="ff-ds-showroom__do"><strong>Do</strong><br />Let food media and one clear action lead the frame.</div><div className="ff-ds-showroom__dont"><strong>Don&apos;t</strong><br />Use brand red as a substitute for every success, warning, or error state.</div></div>
              </div>
            </Section>

            <Section id="references" kicker="02 / Reference influence" title="Translate references into a system." description="The local UI/UX examples were reviewed as design material, not copied as screens. These are the ideas FoodFighter keeps, adapts, or deliberately leaves behind.">
              <div className="ff-ds-showroom__stack">
                <Card surface="brand" padding="lg"><div className="ff-ds-showroom__row"><Badge variant="brand" icon={<Flame aria-hidden="true" />}>Direction decision</Badge><span style={{ opacity: 0.82, fontSize: "0.8125rem" }}>Refine Ember Kitchen with Food Market appetite and Olive Fire freshness. The reference influence enters through semantic roles, media treatment, and composition rules.</span></div></Card>
                <div className="ff-ds-showroom__grid ff-ds-showroom__grid--3">{referenceInfluences.map((reference) => <article key={reference.id} className={`ff-ds-reference-card ff-ds-reference-card--${reference.disposition.toLowerCase().replace("_", "-")}`}><div className="ff-ds-reference-card__meta"><span>{reference.id}</span><Badge variant={reference.disposition === "USE" ? "success" : reference.disposition === "ADAPT" ? "brand" : reference.disposition === "REJECT" ? "danger" : "warning"}>{reference.disposition.replace("_", " ")}</Badge></div><h3>{reference.name}</h3><p>{reference.summary}</p><small>{reference.translation}</small></article>)}</div>
                <div className="ff-ds-showroom__grid"><div className="ff-ds-showroom__panel"><h3>Reference-derived palette</h3><p>Food Market and Olive Fire contributed appetite, fresh, and grounded contrast roles while Ember remains the primary direction.</p><div className="ff-ds-showroom__reference-palette">{referencePalette.map((color) => <div key={color.name} className="ff-ds-showroom__reference-swatch"><span style={{ backgroundColor: color.value }} /><div><strong>{color.name}</strong><code>{color.value}</code><small>{color.role}</small></div></div>)}</div></div><div className="ff-ds-showroom__panel"><h3>Color usage rules</h3><div className="ff-ds-guidance-list">{colorUsageRules.map((rule) => <div key={rule.label} className="ff-ds-guidance-row"><strong>{rule.label}</strong><code>{rule.value}</code><span>{rule.guidance}</span></div>)}</div><div className="ff-ds-do-dont" style={{ marginTop: "1rem" }}><div className="ff-ds-showroom__do"><strong>Do</strong><br />Use one clear action color and let food media carry appetite.</div><div className="ff-ds-showroom__dont"><strong>Don&apos;t</strong><br />Use a brand accent as a substitute for functional status.</div></div></div></div>
              </div>
            </Section>

            <Section id="type" kicker="03 / Foundation" title="Expressive headlines. Clear UI." description="Poppins and Noto Sans Thai carry the task. A quiet editorial serif is reserved for food, winner, and hero moments.">
              <div className="ff-ds-showroom__panel"><div className="ff-ds-showroom__stack">{typographyScale.map((item, index) => <div key={item.name} className="ff-ds-showroom__type-row"><div className="ff-ds-showroom__type-meta"><strong>{item.name}</strong><br />{item.token}<br />{item.size} · {item.line}</div><div className={index < 2 ? "ff-ds-showroom__type-sample ff-ds-display" : "ff-ds-showroom__type-sample"} style={{ fontSize: index === 0 ? "clamp(2.8rem, 8vw, 6rem)" : index === 1 ? "clamp(2.2rem, 5vw, 4rem)" : undefined, lineHeight: item.line, fontWeight: Number(item.weight) }}>{typographySamples[index]}</div></div>)}</div></div>
            </Section>

            <Section id="space" kicker="04 / Foundation" title="Rhythm before decoration." description="Spacing, shape, and elevation are deliberate so food-forward surfaces stay useful instead of becoming theme wallpaper.">
              <div className="ff-ds-showroom__grid"><div className="ff-ds-showroom__panel"><h3>Spacing scale</h3><div className="ff-ds-showroom__stack">{spacingScale.map((value) => <div key={value} className="ff-ds-showroom__space-item"><span className="ff-ds-showroom__space-bar" style={{ width: `${Math.max(4, value)}px` }} /><span className="ff-ds-showroom__space-label">{value}px · inline / control / card / section vocabulary</span></div>)}</div></div><div className="ff-ds-showroom__panel"><h3>Radius &amp; elevation</h3><div className="ff-ds-showroom__grid"><div className="ff-ds-showroom__elevation" style={{ borderRadius: "var(--ff-radius-sm)" }}>sm<br /><small>controls</small></div><div className="ff-ds-showroom__elevation" style={{ borderRadius: "var(--ff-radius-md)", boxShadow: "var(--ff-shadow-sm)" }}>md<br /><small>cards</small></div><div className="ff-ds-showroom__elevation" style={{ borderRadius: "var(--ff-radius-xl)", boxShadow: "var(--ff-shadow-md)" }}>xl<br /><small>sections</small></div><div className="ff-ds-showroom__elevation" style={{ borderRadius: "var(--ff-radius-2xl)", boxShadow: "var(--ff-shadow-floating)" }}>2xl<br /><small>hero / rare moments</small></div></div></div></div>
            </Section>

            <Section id="layout" kicker="05 / Foundation" title="A food-first grid that scales." description="Use the current production breakpoint vocabulary, then let content decide whether a screen needs one, two, or three useful columns.">
              <div className="ff-ds-showroom__grid"><div className="ff-ds-showroom__panel"><h3>Layout guidance</h3><div className="ff-ds-guidance-list">{layoutGuidance.map((item) => <div key={item.label} className="ff-ds-guidance-row"><strong>{item.label}</strong><code>{item.value}</code><span>{item.guidance}</span></div>)}</div></div><div className="ff-ds-showroom__panel"><h3>Density guidance</h3><div className="ff-ds-density-list">{densityGuidance.map((item) => <div key={item.label} className="ff-ds-density-card"><div><Badge variant={item.label === "Compact" ? "neutral" : item.label === "Default" ? "brand" : "warning"}>{item.label}</Badge><strong>{item.use}</strong></div><span>{item.rule}</span></div>)}</div></div></div>
              <div className="ff-ds-showroom__grid" style={{ marginTop: "1rem" }}><div className="ff-ds-showroom__panel"><h3>Radius usage</h3><div className="ff-ds-guidance-list">{radiusGuidance.map((item) => <div key={item.label} className="ff-ds-guidance-row"><strong className="ff-ds-radius-token" style={{ borderRadius: item.value }}>{item.label}</strong><code>{item.value}</code><span>{item.use}</span></div>)}</div></div><div className="ff-ds-showroom__panel"><h3>Elevation usage</h3><div className="ff-ds-guidance-list">{elevationGuidance.map((item) => <div key={item.label} className="ff-ds-guidance-row"><strong>{item.label}</strong><code>{item.value}</code><span>{item.use}</span></div>)}</div></div></div>
            </Section>

            <Section id="motion" kicker="06 / Foundation" title="Tactile, calm, purposeful." description="Fast feedback is frequent. Emphasis is reserved for the moments that move a group forward. Use the control above to inspect reduced motion.">
              <div className="ff-ds-showroom__grid"><Card surface="subtle"><CardHeader><Badge variant="brand" icon={<Flame aria-hidden="true" />}>Motion scale</Badge><h3>120 / 180 / 280ms</h3></CardHeader><CardContent><p>Hover lifts about 2px, press adds depth, overlays enter with opacity and transform. No layout-heavy animation.</p><Progress value={68} label="Progress uses transform/width only" tone="accent" /></CardContent></Card><div className="ff-ds-showroom__panel"><h3>Icon language</h3><p>Lucide is the existing source: 16–20px in controls, 24px in wells, 44px minimum action hit area.</p><div className="ff-ds-showroom__row"><IconWell tone="primary" icon={<Utensils aria-hidden="true" />} label="Meal" /><IconWell tone="accent" icon={<Flame aria-hidden="true" />} label="Fight" /><IconWell tone="fresh" icon={<LeafIcon />} label="Fresh" /><IconButton label="Favorite" icon={<Heart aria-hidden="true" />} /></div><div className="ff-ds-guidance-list" style={{ marginTop: "1rem" }}>{iconGuidance.map((item) => <div key={item.label} className="ff-ds-guidance-row"><strong>{item.label}</strong><span>{item.use}</span></div>)}</div></div></div>
            </Section>

            <Section id="actions" kicker="07 / Components" title="Actions that state their intent." description="Primary, secondary, tertiary, ghost, and danger variants share the same focus and press contract. Loading never changes button geometry.">
              <div className="ff-ds-showroom__stack"><div className="ff-ds-panel-row ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Variants</span><div className="ff-ds-showroom__row"><Button leadingIcon={<Flame aria-hidden="true" />}>Start FoodFight</Button><Button variant="secondary">Join the room</Button><Button variant="tertiary">View details</Button><Button variant="ghost">Back</Button><Button variant="danger">Cancel room</Button></div></div><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Sizes / states</span><div className="ff-ds-showroom__row"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg" trailingIcon={<ArrowRight aria-hidden="true" />}>Large</Button><Button loading={loading} loadingText="Saving…" onClick={runLoadingDemo}>Test loading</Button><Button disabled>Disabled</Button><IconButton label="Search" icon={<Search aria-hidden="true" />} /><IconButton label="Settings" icon={<Settings2 aria-hidden="true" />} variant="subtle" /><IconButton label="Delete" icon={<ReceiptText aria-hidden="true" />} variant="danger" /></div></div><div className="ff-ds-showroom__note">Focus is visible, controls are touch-sized, and desktop-only hover is supplemental. Mobile users can reach every critical action in the default state.</div></div>
            </Section>

            <Section id="forms" kicker="08 / Components" title="Forms with enough room to breathe." description="Native controls keep semantics and keyboard behavior straightforward. Labels, helper text, errors, and success messages share an explicit API.">
              <div className="ff-ds-showroom__grid"><FormSection tone="accent" icon={<ChefHat aria-hidden="true" />} title="Create FoodFight" description="Tonal sections can group the task without making inputs irregular."><TextInput label="Room name / ชื่อห้อง" required defaultValue="Friday night food" helperText="A short name your group will recognize." leadingIcon={<Users aria-hidden="true" />} /><SelectField label="Budget / งบประมาณ" options={[{ value: "group", label: "Group budget · 500–800 ฿" }, { value: "open", label: "Open to suggestions" }]} /><Textarea label="Notes / รายละเอียดเพิ่มเติม" defaultValue="Somewhere warm, not too spicy." showCount maxLength={120} /></FormSection><div className="ff-ds-showroom__panel"><h3>Field states</h3><div className="ff-ds-showroom__stack"><TextInput label="Default / Filled" defaultValue="pure@example.com" helperText="Helper text keeps the next action clear." /><TextInput label="Error / Invalid" defaultValue="pure@" error="Enter a valid email address." /><TextInput label="Success" defaultValue="098-000-0000" success="Ready to use." /><TextInput label="Disabled" defaultValue="Locked by the host" disabled optional /></div></div></div>
              <div className="ff-ds-showroom__grid" style={{ marginTop: "1rem" }}><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Selection controls</span><Checkbox label="Vegetarian / อาหารมังสวิรัติ" description="Keep this preference visible and reversible." defaultChecked /><Checkbox label="No seafood / ไม่กินอาหารทะเล" indeterminate /><Checkbox label="Disabled preference" disabled defaultChecked /></div><div className="ff-ds-showroom__panel"><RadioGroup legend="Split preference" name="split-preference" value={radioValue} onChange={setRadioValue} options={[{ value: "group", label: "Keep the group together", description: "Useful for a shared meal." }, { value: "individual", label: "Let everyone choose", description: "Useful for mixed preferences." }]} /><Divider label="Immediate setting" /><Switch label="Notify the room" description="A binary preference with immediate effect." checked={switchValue} onCheckedChange={setSwitchValue} /></div></div>
              <div className="ff-ds-showroom__grid" style={{ marginTop: "1rem" }}><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Combobox / searchable input</span><Combobox label="Find a cuisine" placeholder="Start typing" options={["Thai", "Japanese", "Korean", "Italian"]} helperText="Native datalist behavior keeps the baseline accessible." /></div><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Individual radio</span><Radio name="demo-radio" value="shared" label="Shared table" description="A standalone radio for a compact choice." defaultChecked /><Radio name="demo-radio" value="separate" label="Separate tables" description="Keyboard and touch friendly." /></div></div>
              <div className="ff-ds-showroom__grid" style={{ marginTop: "1rem" }}><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Search input</span><SearchInput placeholder="Search restaurants / ค้นหาร้านอาหาร" helperText="A named search primitive with a leading icon." /></div></div>
            </Section>

            <Section id="status" kicker="09 / Components" title="Food context and product status can coexist." description="Chips and badges separate selection, metadata, and system state. Status always includes text and an icon or dot.">
              <div className="ff-ds-showroom__grid"><div className="ff-ds-showroom__panel"><h3>Preference chips</h3><div className="ff-ds-showroom__row">{["Thai", "Japanese", "Korean", "Halal", "Vegetarian", "Spicy"].map((item) => <Chip key={item} variant={selectedChip === item ? "selected" : "selectable"} onSelect={() => setSelectedChip(item)}>{item}</Chip>)}</div><p style={{ marginTop: "1rem" }}>Selected: <strong>{selectedChip}</strong></p><div className="ff-ds-showroom__row" style={{ marginTop: "1rem" }}><PreferenceChip selected onSelect={() => undefined}>Thai</PreferenceChip><CuisineChip onSelect={() => undefined}>Japanese</CuisineChip><Tag>Soup</Tag><Chip variant="removable" onRemove={() => undefined}>No seafood</Chip><Chip>4 members</Chip><Chip icon={<CircleDollarSign aria-hidden="true" />}>500–800 ฿</Chip></div></div><div className="ff-ds-showroom__panel"><h3>Status badges</h3><div className="ff-ds-showroom__row"><Badge variant="neutral">Lobby</Badge><Badge variant="brand" icon={<Flame aria-hidden="true" />}>Host</Badge><Badge variant="success" icon={<Check aria-hidden="true" />}>Ready</Badge><Badge variant="warning" dot>Pending</Badge><Badge variant="danger" dot>Cancelled</Badge><Badge variant="info" dot>In progress</Badge></div><div className="ff-ds-list-item"><Avatar name="Pure" size="sm" status="ready" /><div className="ff-ds-list-item__body"><strong>Pure</strong><span>Pure is ready to pick dinner</span></div><Badge variant="success" icon={<Check aria-hidden="true" />}>Ready</Badge></div></div></div>
              <div className="ff-ds-showroom__panel" style={{ marginTop: "1rem" }}><span className="ff-ds-showroom__panel-label">Avatar sizes and group treatment</span><div className="ff-ds-showroom__row"><Avatar name="P" size="xs" /><Avatar name="Pure" size="sm" status="online" /><Avatar name="Mark" size="md" status="ready" /><Avatar name="Lina" size="lg" /><Avatar name="James" size="xl" /><AvatarGroup members={[{ id: "1", name: "Pure" }, { id: "2", name: "Mark" }, { id: "3", name: "Lina" }, { id: "4", name: "James" }, { id: "5", name: "Nana" }]} /></div></div>
            </Section>

            <Section id="feedback" kicker="10 / Components" title="A clear answer to every state." description="Success, warning, error, info, skeleton, spinner, empty, and retry states use different visual grammar while retaining the same tone.">
              <div className="ff-ds-showroom__grid"><div className="ff-ds-showroom__stack"><Banner variant="info" title="Food Profile is ready">Your persistent preferences will guide future group picks.</Banner><Alert variant="success" title="Room is ready">Everyone can see the next action.</Alert><Alert variant="warning" title="Payment pending">This is a payment-record state, not bank settlement confirmation.</Alert><Alert variant="danger" title="Could not load restaurants" action={<Button size="sm" variant="danger">Retry</Button>}>Keep the user&apos;s context and make recovery obvious.</Alert></div><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Loading, empty, and error</span><div className="ff-ds-showroom__row"><Spinner size="sm" label="Loading inline" /><Spinner size="md" label="Loading section" /><Spinner size="lg" label="Loading page" /></div><div className="ff-ds-showroom__stack" style={{ marginTop: "1rem" }}><Skeleton variant="text" /><Skeleton variant="avatar" /><Skeleton variant="image" /></div></div></div><div className="ff-ds-showroom__grid" style={{ marginTop: "1rem" }}><EmptyState title="No recent FoodFights" description="Start a room and your shared meals will appear here." icon={<Utensils aria-hidden="true" />} action={<Button size="sm">Create room</Button>} /><ErrorState title="A service went quiet" description="The prototype keeps your place so you can retry without losing the task." retry={<Button size="sm" variant="danger">Try again</Button>} /></div>{toastVisible ? <div style={{ marginTop: "1rem" }}><Toast title="Preferences saved" onDismiss={() => setToastVisible(false)}>The next FoodFight will start with this context.</Toast></div> : <Button size="sm" variant="tertiary" onClick={() => setToastVisible(true)}>Show toast again</Button>}</Section>

            <Section id="media" kicker="11 / Components" title="Media is a contract, not decoration." description="Every media frame reserves the ratio before an owner asset arrives. Missing and loading states preserve the composition.">
              <div className="ff-ds-showroom__grid ff-ds-showroom__grid--4">{mediaGuidance.map((item) => <div key={item.ratio} className="ff-ds-showroom__ratio-card"><div className={`ff-ds-media ${item.className}`}><span className="ff-ds-media__fallback"><ImageIcon aria-hidden="true" /><span>{item.ratio}</span><small>{item.size}</small></span></div><strong>{item.ratio}</strong><span>{item.usage}</span></div>)}</div><div className="ff-ds-showroom__grid" style={{ marginTop: "1rem" }}><div className="ff-ds-showroom__panel"><h3>Loaded / real image</h3><MediaFrameForShowroom src={foodImage} label="Thai food image" /></div><div className="ff-ds-showroom__panel"><h3>Missing / owner image later</h3><MediaFrameForShowroom label="Restaurant image" /></div><div className="ff-ds-showroom__panel"><h3>Loading / contain</h3><MediaFrameForShowroom label="Receipt preview" ratio="3:4" state="loading" fit="contain" /></div></div><div className="ff-ds-showroom__note" style={{ marginTop: "1rem" }}>Guidance: Hero 1600×900 (16:9) · Food / Restaurant / Room 1200×900 (4:3) · compact food 800×800 (1:1) · Avatar 320×320 (1:1) · receipt / portrait 900×1200 (3:4). Ratio is the contract; pixel dimensions are source guidance.</div></Section>

            <Section id="cards" kicker="12 / Patterns" title="Cards have a job before they have a border." description="These compositions share Media → Content → Metadata → Action, but their surface, density, and information hierarchy differ by product task.">
              <div className="ff-ds-showroom__grid ff-ds-showroom__grid--3"><FoodCard title="Tom Yum" description="Bright, sour, and good for a group decision." imageSrc={foodImage} tags={["Thai", "Soup"]} compatibility={92} budget="500–800 ฿" actionLabel="Pick meal" onAction={() => undefined} /><FoodCard title="Bibimbap" description="A compact fallback still reserves its media frame." tags={["Korean", "Rice"]} compatibility={86} selected actionLabel="Picked" onAction={() => undefined} /><RestaurantCard name="Krua Saffron" category="Thai kitchen" imageSrc={foodImage} distance="1.2 km" rating="4.8" groupScore="Good for groups" reason="A warm local option for the winning meal." actionLabel="View place" onAction={() => undefined} /><RestaurantCard name="Ari Table" category="Modern bistro" distance="Nearby context" reason="No image? The card still holds its visual weight." actionLabel="View place" onAction={() => undefined} /><RoomCard name="Friday night food" imageSrc={foodImage} memberCount="4 / 8 members" members={[{ id: "1", name: "Pure" }, { id: "2", name: "Mark" }, { id: "3", name: "Lina" }]} status="Waiting" host="Pure" actionLabel="Open lobby" onAction={() => undefined} /><RoomCard name="Late lunch" memberCount="3 / 6 members" status="Ready" host="Mark" actionLabel="Open lobby" onAction={() => undefined} /><HistoryCard meal="Tom Yum" date="17 Aug 2026" members="4 members" restaurant="Krua Saffron" imageSrc={foodImage} billStatus="Closed" actionLabel="View FoodFight" onAction={() => undefined} /><HistoryCard meal="Japanese set" date="12 Aug 2026" members="3 members" restaurant="Image optional" actionLabel="View FoodFight" onAction={() => undefined} /><BillContinuationCard room="Friday night food" meal="Krua Saffron · Tom Yum" status="Receipt needed" progress="0 of 4 shares marked paid" amount="1,280 ฿" nextStep="Add receipt" actionLabel="Resume bill" onAction={() => undefined} /></div>
              <div className="ff-ds-showroom__grid" style={{ marginTop: "1rem" }}><ProfileSummaryCard name="Pure" email="pure@example.com" foodSummary="Thai · no seafood · medium spice" actionLabel="Edit profile" onAction={() => undefined} /><ActionPanel eyebrow="Pattern / major action" title="Make the next choice feel obvious." description="Action panels can carry a group forward without becoming a marketing page." primaryAction={<Button variant="secondary" trailingIcon={<ArrowRight aria-hidden="true" />}>Start FoodFight</Button>} secondaryAction={<Button variant="ghost">View rooms</Button>} /></div><CodeNote>{`<FoodCard imageSrc={...} tags={["Thai"]} compatibility={92} />\n<RestaurantCard imageSrc={...} onAction={...} />\n<BillContinuationCard status="Receipt needed" nextStep="Add receipt" />`}</CodeNote></Section>

            <Section id="navigation" kicker="13 / Patterns" title="Navigation that knows its context." description="The showroom demonstrates the future treatment only. It does not replace the current production ResponsiveNavigation or shell.">
              <NavigationSpecimen /><div className="ff-ds-showroom__panel" style={{ marginTop: "1rem" }}><Tabs items={[{ value: "recommended", label: "Recommended" }, { value: "nearby", label: "Nearby" }, { value: "saved", label: "Saved" }]} value={tabValue} onChange={setTabValue} label="Restaurant views" /><p style={{ marginTop: "1rem" }}>Active tab: <strong>{tabValue}</strong></p></div><div className="ff-ds-showroom__grid" style={{ marginTop: "1rem" }}><ListItem leading={<IconWell size="sm" tone="accent" icon={<Home aria-hidden="true" />} />} title="Home navigation" description="Persistent after the focused FoodFight journey completes." metadata={<Badge variant="brand">Active</Badge>} action={<IconButton label="Open home" icon={<ArrowRight aria-hidden="true" />} size="sm" />} /><ListItem leading={<IconWell size="sm" tone="fresh" icon={<ReceiptText aria-hidden="true" />} />} title="Bills navigation" description="Quiet functional surface with clear continuation." metadata={<Badge variant="warning">Pending</Badge>} action={<IconButton label="Open bills" icon={<ArrowRight aria-hidden="true" />} size="sm" />} /></div></Section>

            <Section id="overlays" kicker="14 / Patterns" title="Overlays keep the task in reach." description="Dialog, sheet, menu, and tooltip-like hints support secondary actions without hiding the primary path.">
              <div className="ff-ds-showroom__panel"><div className="ff-ds-showroom__row"><Button onClick={() => setDialogOpen(true)}>Open confirmation dialog</Button><Button variant="secondary" onClick={() => setSheetOpen(true)}>Open mobile sheet</Button><Button variant="tertiary" onClick={() => setSideSheetOpen(true)}>Open side sheet</Button><Menu label="Account menu" items={[{ label: "Profile" }, { label: "Food Profile" }, { label: "Log out", destructive: true }]} /><Tooltip label="Hints never contain the only critical action."><CircleDollarSign aria-hidden="true" /></Tooltip><HelpHint>Tooltips explain; they never hold the only action.</HelpHint></div></div><ConfirmationDialog open={dialogOpen} title="Start this FoodFight?" description="A dialog should confirm a meaningful action and keep the next step explicit." onClose={() => setDialogOpen(false)} footer={<><Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => setDialogOpen(false)}>Start FoodFight</Button></>}><p>Four members are in the room. The group will move to Meal Preference.</p></ConfirmationDialog><BottomSheet open={sheetOpen} title="Room actions" onClose={() => setSheetOpen(false)}><div className="ff-ds-stack"><ListItem title="Share room" description="Copy a local invite affordance" action={<Button size="sm">Share</Button>} /><ListItem title="Leave room" description="Destructive actions remain separated" action={<Button size="sm" variant="danger">Leave</Button>} /></div></BottomSheet><SideSheet open={sideSheetOpen} title="Desktop context" onClose={() => setSideSheetOpen(false)}><div className="ff-ds-stack"><SectionHeader title="Room details" description="Side sheets keep contextual actions close on wide screens." /><KeyValue label="Status" value="Ready" /><KeyValue label="Members" value="4 people" /></div></SideSheet></Section>

            <Section id="responsive" kicker="17 / QA" title="The same system at 390, 768, and 1440." description="The layout expands its composition, not just its width. These frames make media, typography, and action density reviewable at the target breakpoints.">
              <div className="ff-ds-showroom__grid ff-ds-showroom__grid--3"><PreviewFrame label="Mobile · 390" width="390"><FoodCard title="Tom Yum" imageSrc={foodImage} tags={["Thai", "Soup"]} compatibility={92} compact actionLabel="Pick" onAction={() => undefined} /></PreviewFrame><PreviewFrame label="Tablet · 768" width="768"><div className="ff-ds-showroom__grid"><FoodCard title="Tom Yum" imageSrc={foodImage} tags={["Thai"]} compatibility={92} actionLabel="Pick" onAction={() => undefined} /><RestaurantCard name="Krua Saffron" imageSrc={foodImage} category="Thai kitchen" actionLabel="View" onAction={() => undefined} /></div></PreviewFrame><PreviewFrame label="Desktop · 1440" width="1440"><FoodHero title="Food, with a little fight." description="A wide feature panel leaves room for imagery and an obvious action." mediaSrc={foodImage} primaryAction={<Button variant="secondary">Start</Button>} secondaryAction={<Button variant="ghost">Learn</Button>} /></PreviewFrame></div></Section>

            <Section id="composition" kicker="15 / Patterns" title="Compositions stay explicit." description="Small page-level patterns keep context, media, and action hierarchy reusable without creating an all-purpose smart component.">
              <div className="ff-ds-showroom__panel"><PageHeader headingLevel={2} eyebrow="Pattern / page header" title="A page begins with context." description="Back, title, supporting copy, and a reachable action adapt together across mobile and desktop." actions={<Button size="sm">Continue</Button>} /><Divider /><SectionHeader title="Recent FoodFights" description="A section header gives the next collection a clear job." action={<Button size="sm" variant="tertiary">View all</Button>} /></div>
              <div className="ff-ds-showroom__grid ff-ds-showroom__grid--3" style={{ marginTop: "1rem" }}><MediaCard title="Pattern media card" description="A generic composition for image-led content with optional metadata and action." mediaSrc={foodImage} mediaAlt="Thai food used in the media card example" ratio="4:3" metadata={<Badge variant="brand">4:3 media</Badge>} action={<Button size="sm">Open card</Button>} /><MediaCard title="Missing media still holds shape" description="The frame remains reserved when the owner asset is not available yet." ratio="1:1" metadata={<Badge variant="neutral">1:1 fallback</Badge>} /></div>
              <CodeNote>{`<PageHeader title="..." actions={<Button />} />
<MediaCard ratio="4:3" mediaSrc={image} metadata={<Badge />} />`}</CodeNote>
            </Section>

            <Section id="social" kicker="16 / Patterns" title="A group decision needs visible people and state." description="Social patterns keep ownership, readiness, votes, money, and the next action legible without binding the library to a production DTO.">
              <div className="ff-ds-showroom__grid"><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Recommendation / OK / Pass</span><div className="ff-ds-showroom__grid"><RecommendationCard meal="Tom Yum · ต้มยำ" reason="Bright, sour, and easy for the table to rally around." tags={["Thai", "Soup"]} compatibility={92} selected onOk={() => undefined} onPass={() => undefined} /><RecommendationCard meal="Korean BBQ" reason="A social grill option for a group that wants something bold." tags={["Korean", "Grill"]} compatibility={86} passed onOk={() => undefined} onPass={() => undefined} /></div></div><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Members / status / role</span><div className="ff-ds-stack"><MemberRow name="Pure" role="FoodFight host" status="Ready" statusTone="success" action={<HostBadge />} /><MemberRow name="Mark" role="Choosing a meal" status="Waiting" statusTone="warning" amount="฿208" action={<ReadyState ready={false} />} /><MemberRow name="Lina" role="Payment participant" status="Paid" statusTone="success" amount="฿208" /></div><div className="ff-ds-showroom__row" style={{ marginTop: "1rem" }}><MemberAvatarGroup members={[{ id: "pure", name: "Pure", status: "ready" }, { id: "mark", name: "Mark", status: "online" }, { id: "lina", name: "Lina" }, { id: "james", name: "James" }, { id: "nana", name: "Nana" }]} max={4} /><span className="ff-ds-meta-item">5 members · +1</span></div></div></div>
              <div className="ff-ds-showroom__grid" style={{ marginTop: "1rem" }}><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">FoodFight state language</span><div className="ff-ds-state-grid">{foodFightStates.map((state) => <div key={state.label} className="ff-ds-state-card"><Badge variant={state.tone === "accent" ? "brand" : state.tone}>{state.label}</Badge><p>{state.copy}</p></div>)}</div></div><div className="ff-ds-showroom__panel"><span className="ff-ds-showroom__panel-label">Money / product-record language</span><div className="ff-ds-money-grid">{moneyExamples.map((item) => <div key={item.value} className="ff-ds-money-card"><strong>{item.value}</strong><span>{item.label}</span></div>)}</div><div className="ff-ds-showroom__key-value-grid"><KeyValue label="Reported meal bill" value="฿1,040" description="One meal value, not platform revenue." /><KeyValue label="Payment progress" value="2 of 4" description="Member payment records marked paid." /><Stat label="Room members" value="4" detail="shared decision context" /><Stat label="Distance" value="1.2 km" detail="prototype location context" /></div></div></div>
            </Section>

            <Section id="accessibility" kicker="18 / Contract" title="Accessible by default, expressive by choice." description="A practical review checklist for components that will later travel into product pages.">
              <div className="ff-ds-showroom__grid"><div className="ff-ds-showroom__panel"><h3>Required behavior</h3><ul className="ff-ds-checklist"><li><Check aria-hidden="true" /> visible focus ring and keyboard path</li><li><Check aria-hidden="true" /> 44px-ish touch targets for key actions</li><li><Check aria-hidden="true" /> labels and messages associated with fields</li><li><Check aria-hidden="true" /> status icon/text, never color alone</li><li><Check aria-hidden="true" /> Escape closes Dialog and Sheet</li><li><Check aria-hidden="true" /> reduced motion preserves state communication</li></ul></div><div className="ff-ds-showroom__panel"><h3>Usage boundary</h3><p>V4 is scoped to <code>[data-ff-design-system]</code>. Existing `components/ui`, production tokens, and product routes remain unchanged until owner approval.</p><div className="ff-ds-showroom__note" style={{ marginTop: "1rem" }}>Recommended migration order after approval: Home → Room/Lobby → Food Profile / Meal Preference → FoodFight → Restaurant → Bill / Payment → History / Profile / Auth.</div></div></div></Section>
          </main>
        </div>
      </div>
    </DesignSystemProvider>
  );
}

function LeafIcon() {
  return <span aria-hidden="true">✦</span>;
}

function MediaFrameForShowroom({ src, label, ratio = "4:3", state = "auto", fit = "cover" }: { src?: string; label: string; ratio?: "16:9" | "4:3" | "1:1" | "3:4"; state?: "auto" | "loading" | "missing"; fit?: "cover" | "contain" }) {
  return <MediaFrame src={src} alt={label} ratio={ratio} state={state} fit={fit} label={label} gradientProtection />;
}

function PreviewFrame({ label, width, children }: { label: string; width: string; children: React.ReactNode }) {
  return <div className="ff-ds-showroom__preview"><div className="ff-ds-showroom__preview-label"><span>{label}</span><span>{width}px viewport</span></div><div className="ff-ds-showroom__preview-body">{children}</div></div>;
}
