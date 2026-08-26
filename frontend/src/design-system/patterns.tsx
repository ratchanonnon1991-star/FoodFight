"use client";

import * as React from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  ReceiptText,
  Sparkles,
  Utensils,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
} from "./primitives";
import { MediaFrame, type MediaRatio } from "./media";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  headingLevel?: 1 | 2 | 3;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, onBack, actions, headingLevel = 1, className }: PageHeaderProps) {
  const Heading: React.ElementType = `h${headingLevel}`;

  return (
    <header className={cn("ff-ds-page-header", className)}>
      <div className="ff-ds-page-header__copy">
        {onBack ? <button type="button" className="ff-ds-back-link" onClick={onBack}>← Back</button> : null}
        {eyebrow ? <span className="ff-ds-eyebrow">{eyebrow}</span> : null}
        <Heading>{title}</Heading>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="ff-ds-page-header__actions">{actions}</div> : null}
    </header>
  );
}

export function SectionHeader({ title, description, action, className }: { title: string; description?: string; action?: React.ReactNode; className?: string }) {
  return <div className={cn("ff-ds-section-header", className)}><div><h2>{title}</h2>{description ? <p>{description}</p> : null}</div>{action ? <div className="ff-ds-section-header__action">{action}</div> : null}</div>;
}

export function FormSection({ tone = "accent", icon, title, description, children, footer }: { tone?: "accent" | "fresh" | "neutral"; icon?: React.ReactNode; title: string; description?: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return <section className={cn("ff-ds-form-section", `ff-ds-form-section--${tone}`)}><div className="ff-ds-form-section__heading">{icon ? <span className="ff-ds-form-section__icon">{icon}</span> : null}<div><h3>{title}</h3>{description ? <p>{description}</p> : null}</div></div><div className="ff-ds-form-section__fields">{children}</div>{footer ? <div className="ff-ds-form-section__footer">{footer}</div> : null}</section>;
}

export function ActionPanel({ eyebrow = "FoodFight", title, description, primaryAction, secondaryAction, tone = "brand", className }: { eyebrow?: string; title: string; description?: string; primaryAction?: React.ReactNode; secondaryAction?: React.ReactNode; tone?: "brand" | "accent" | "fresh"; className?: string }) {
  return <section className={cn("ff-ds-action-panel", `ff-ds-action-panel--${tone}`, className)}><span className="ff-ds-eyebrow">{eyebrow}</span><h2>{title}</h2>{description ? <p>{description}</p> : null}<div className="ff-ds-action-panel__actions">{primaryAction}{secondaryAction}</div></section>;
}

export interface FoodHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  mediaSrc?: string;
  mediaAlt?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export function FoodHero({ eyebrow = "FoodFighter / V4", title, description, mediaSrc, mediaAlt = "Food hero image", primaryAction, secondaryAction }: FoodHeroProps) {
  return <section className="ff-ds-hero-panel"><div className="ff-ds-hero-panel__copy">{eyebrow ? <span className="ff-ds-eyebrow">{eyebrow}</span> : null}<h2 className="ff-ds-display">{title}</h2>{description ? <p>{description}</p> : null}<div className="ff-ds-hero-panel__actions">{primaryAction}{secondaryAction}</div></div><MediaFrame src={mediaSrc} alt={mediaAlt} ratio="16:9" label="Hero / feature image" gradientProtection overlay={<span className="ff-ds-media-tag">16:9 · 1600 × 900</span>} /></section>;
}

export function HeroPanel(props: FoodHeroProps) {
  return <FoodHero {...props} />;
}

export interface MediaCardProps {
  title: string;
  description?: string;
  mediaSrc?: string;
  mediaAlt?: string;
  ratio?: MediaRatio;
  metadata?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function MediaCard({ title, description, mediaSrc, mediaAlt = `${title} media`, ratio = "4:3", metadata, action, className }: MediaCardProps) {
  return <Card padding="none" className={cn("ff-ds-media-card", className)}><MediaFrame src={mediaSrc} alt={mediaAlt} ratio={ratio} label="Media card" /><CardContent><h3>{title}</h3>{description ? <p>{description}</p> : null}{metadata ? <div className="ff-ds-card__meta">{metadata}</div> : null}</CardContent>{action ? <CardFooter>{action}</CardFooter> : null}</Card>;
}

export interface FoodCardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  tags?: readonly string[];
  compatibility?: number;
  budget?: string;
  actionLabel?: string;
  onAction?: () => void;
  selected?: boolean;
  compact?: boolean;
  className?: string;
}

export function FoodCard({ title, description, imageSrc, imageAlt = `${title} food image`, tags = [], compatibility, budget, actionLabel = "Choose", onAction, selected = false, compact = false, className }: FoodCardProps) {
  return <Card surface={selected ? "tonal" : "neutral"} padding="none" interactive={Boolean(onAction)} className={cn("ff-ds-media-card", compact && "ff-ds-media-card--compact", selected && "ff-ds-media-card--selected", className)}><MediaFrame src={imageSrc} alt={imageAlt} ratio={compact ? "1:1" : "4:3"} label="Meal image" gradientProtection overlay={selected ? <span className="ff-ds-media-tag"><Check aria-hidden="true" /> Selected</span> : null} /><CardContent><div className="ff-ds-card__eyebrow"><Badge variant="brand" icon={<Utensils aria-hidden="true" />}>Meal card</Badge>{compatibility !== undefined ? <span className="ff-ds-score">{compatibility}% match</span> : null}</div><h3>{title}</h3>{description ? <p>{description}</p> : null}<div className="ff-ds-card__meta">{tags.map((tag) => <Chip key={tag} variant="display">{tag}</Chip>)}{budget ? <span className="ff-ds-meta-item">{budget}</span> : null}</div></CardContent>{onAction ? <CardFooter><Button fullWidth size="sm" variant={selected ? "secondary" : "primary"} onClick={onAction} trailingIcon={<ArrowRight aria-hidden="true" />}>{selected ? "Selected" : actionLabel}</Button></CardFooter> : null}</Card>;
}

export function MealCard(props: FoodCardProps) {
  return <FoodCard {...props} />;
}

export interface RestaurantCardProps {
  name: string;
  category?: string;
  imageSrc?: string;
  imageAlt?: string;
  distance?: string;
  rating?: string;
  groupScore?: string;
  openingState?: string;
  address?: string;
  reason?: string;
  actionLabel?: string;
  onAction?: () => void;
  selected?: boolean;
  className?: string;
}

export function RestaurantCard({ name, category, imageSrc, imageAlt = `${name} restaurant image`, distance, rating, groupScore, openingState, address, reason, actionLabel = "View restaurant", onAction, selected = false, className }: RestaurantCardProps) {
  return <Card surface={selected ? "tonal" : "neutral"} padding="none" interactive={Boolean(onAction)} className={cn("ff-ds-media-card", selected && "ff-ds-media-card--selected", className)}><MediaFrame src={imageSrc} alt={imageAlt} ratio="4:3" label="Restaurant image" gradientProtection overlay={selected ? <span className="ff-ds-media-tag"><Check aria-hidden="true" /> Selected</span> : null} /><CardContent><div className="ff-ds-card__eyebrow"><Badge variant="fresh" icon={<MapPin aria-hidden="true" />}>{category ?? "Restaurant"}</Badge>{openingState ? <span className="ff-ds-inline-status">{openingState}</span> : null}</div><h3>{name}</h3>{reason ? <p>{reason}</p> : null}<div className="ff-ds-card__meta">{distance ? <span className="ff-ds-meta-item"><MapPin aria-hidden="true" />{distance}</span> : null}{rating ? <span className="ff-ds-meta-item"><Sparkles aria-hidden="true" />{rating}</span> : null}{groupScore ? <span className="ff-ds-score">{groupScore}</span> : null}</div>{address ? <p className="ff-ds-address">{address}</p> : null}</CardContent>{onAction ? <CardFooter><Button fullWidth size="sm" variant={selected ? "secondary" : "primary"} onClick={onAction} trailingIcon={<ArrowRight aria-hidden="true" />}>{selected ? "Selected" : actionLabel}</Button></CardFooter> : null}</Card>;
}

export interface RoomCardProps {
  name: string;
  imageSrc?: string;
  imageAlt?: string;
  memberCount: string;
  members?: readonly { id: string; name: string; src?: string }[];
  status: string;
  host?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function RoomCard({ name, imageSrc, imageAlt = `${name} room image`, memberCount, members = [], status, host, actionLabel = "Open room", onAction, className }: RoomCardProps) {
  return <Card surface="accent" padding="none" className={cn("ff-ds-media-card", className)}><MediaFrame src={imageSrc} alt={imageAlt} ratio="4:3" label="Room / social image" /><CardContent><div className="ff-ds-card__eyebrow"><Badge variant="brand" icon={<Users aria-hidden="true" />}>Room</Badge><Badge variant="success" dot>{status}</Badge></div><h3>{name}</h3><p>{host ? `Hosted by ${host}` : "A FoodFight room"}</p><div className="ff-ds-card__meta"><AvatarGroup members={members} max={4} size="xs" /><span className="ff-ds-meta-item">{memberCount}</span></div></CardContent>{onAction ? <CardFooter><Button fullWidth size="sm" onClick={onAction}>{actionLabel}</Button></CardFooter> : null}</Card>;
}

export interface HistoryCardProps {
  meal: string;
  date: string;
  members: string;
  restaurant?: string;
  imageSrc?: string;
  imageAlt?: string;
  billStatus?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function HistoryCard({ meal, date, members, restaurant, imageSrc, imageAlt = `${meal} history image`, billStatus, actionLabel = "View history", onAction, className }: HistoryCardProps) {
  return <Card surface="quiet" padding="none" className={cn("ff-ds-media-card ff-ds-history-card", className)}><MediaFrame src={imageSrc} alt={imageAlt} ratio="4:3" label="Recent FoodFight" /><CardContent><div className="ff-ds-card__eyebrow"><Badge variant="neutral" icon={<CalendarDays aria-hidden="true" />}>{date}</Badge>{billStatus ? <Badge variant="success" dot>{billStatus}</Badge> : null}</div><h3>{meal}</h3>{restaurant ? <p>{restaurant}</p> : null}<div className="ff-ds-card__meta"><span className="ff-ds-meta-item"><Users aria-hidden="true" />{members}</span></div></CardContent>{onAction ? <CardFooter><Button fullWidth size="sm" variant="tertiary" onClick={onAction}>{actionLabel}</Button></CardFooter> : null}</Card>;
}

export interface BillContinuationCardProps {
  room: string;
  meal?: string;
  status: string;
  progress?: string;
  amount?: string;
  nextStep: string;
  imageSrc?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function BillContinuationCard({ room, meal, status, progress, amount, nextStep, imageSrc, actionLabel = "Continue bill", onAction, className }: BillContinuationCardProps) {
  return <Card surface="subtle" padding="none" className={cn("ff-ds-bill-card", className)}><div className="ff-ds-bill-card__top">{imageSrc ? <MediaFrame src={imageSrc} alt={`${room} bill context`} ratio="4:3" label="Bill context" /> : <span className="ff-ds-bill-card__icon"><ReceiptText aria-hidden="true" /></span>}<div><Badge variant="warning" icon={<ReceiptText aria-hidden="true" />}>{status}</Badge><h3>{room}</h3>{meal ? <p>{meal}</p> : null}</div></div><CardContent><div className="ff-ds-bill-card__summary"><span>Next step<strong>{nextStep}</strong></span>{amount ? <span>Meal bill value<strong>{amount}</strong></span> : null}</div>{progress ? <p className="ff-ds-bill-card__progress">{progress}</p> : null}</CardContent>{onAction ? <CardFooter><Button fullWidth size="sm" variant="primary" onClick={onAction} trailingIcon={<ArrowRight aria-hidden="true" />}>{actionLabel}</Button></CardFooter> : null}</Card>;
}

export interface ProfileSummaryCardProps {
  name: string;
  email?: string;
  avatarSrc?: string;
  foodSummary?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function ProfileSummaryCard({ name, email, avatarSrc, foodSummary, actionLabel = "Edit profile", onAction, className }: ProfileSummaryCardProps) {
  return <Card surface="accent" className={cn("ff-ds-profile-card", className)}><CardHeader><div className="ff-ds-profile-card__identity"><Avatar name={name} src={avatarSrc} alt={`${name} avatar`} size="xl" status="ready" /><div><Badge variant="brand">Profile</Badge><h3>{name}</h3>{email ? <p>{email}</p> : null}</div></div></CardHeader><CardContent><div className="ff-ds-profile-card__summary"><Utensils aria-hidden="true" /><span><strong>Food Profile</strong><small>{foodSummary ?? "Preferences ready to shape better group picks."}</small></span></div></CardContent>{onAction ? <CardFooter><Button size="sm" variant="secondary" onClick={onAction}>{actionLabel}</Button></CardFooter> : null}</Card>;
}

export function ListItem({ leading, title, description, metadata, action, className }: { leading?: React.ReactNode; title: string; description?: string; metadata?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return <div className={cn("ff-ds-list-item", className)}>{leading ? <div className="ff-ds-list-item__leading">{leading}</div> : null}<div className="ff-ds-list-item__body"><strong>{title}</strong>{description ? <span>{description}</span> : null}</div>{metadata ? <div className="ff-ds-list-item__metadata">{metadata}</div> : null}{action ? <div className="ff-ds-list-item__action">{action}</div> : null}</div>;
}

export function EmptyState({ title, description, icon = <Utensils aria-hidden="true" />, action, secondaryAction }: { title: string; description: string; icon?: React.ReactNode; action?: React.ReactNode; secondaryAction?: React.ReactNode }) {
  return <div className="ff-ds-empty-state"><span className="ff-ds-empty-state__icon">{icon}</span><h3>{title}</h3><p>{description}</p><div className="ff-ds-empty-state__actions">{action}{secondaryAction}</div></div>;
}

export function ErrorState({ title, description, retry, support }: { title: string; description: string; retry?: React.ReactNode; support?: React.ReactNode }) {
  return <div className="ff-ds-error-state"><span className="ff-ds-error-state__icon">!</span><h3>{title}</h3><p>{description}</p><div className="ff-ds-error-state__actions">{retry}{support}</div></div>;
}

export function NavigationSpecimen() {
  return <div className="ff-ds-navigation-specimen"><div className="ff-ds-top-nav"><strong>FoodFighter</strong><nav aria-label="Design system top navigation">{["Home", "History", "Bills", "Profile"].map((item, index) => <a key={item} href={`#nav-${item.toLowerCase()}`} className={index === 0 ? "ff-ds-top-nav__active" : undefined}>{item}</a>)}</nav><IconButton label="Account menu" icon={<Avatar name="Pure" size="xs" />} size="sm" variant="subtle" /></div><div className="ff-ds-bottom-nav" aria-label="Design system mobile navigation">{["Home", "History", "Bills", "Profile"].map((item, index) => <button key={item} type="button" className={index === 0 ? "ff-ds-bottom-nav__active" : undefined}><span>{index === 0 ? "⌂" : index === 1 ? "◷" : index === 2 ? "▤" : "◎"}</span>{item}</button>)}</div></div>;
}
