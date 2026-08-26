"use client";

import Image from "next/image";
import * as React from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Info,
  LoaderCircle,
  MoreHorizontal,
  TriangleAlert,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const buttonVariantClass: Record<ButtonVariant, string> = {
  primary: "ff-ds-button--primary",
  secondary: "ff-ds-button--secondary",
  tertiary: "ff-ds-button--tertiary",
  ghost: "ff-ds-button--ghost",
  danger: "ff-ds-button--danger",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      loadingText,
      leadingIcon,
      trailingIcon,
      fullWidth = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || loading);

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          "ff-ds-button",
          buttonVariantClass[variant],
          `ff-ds-button--${size}`,
          fullWidth && "ff-ds-button--full",
          className,
        )}
      >
        {loading ? (
          <>
            <Spinner size="sm" label={loadingText ?? "Loading"} />
            <span>{loadingText ?? children}</span>
          </>
        ) : (
          <>
            {leadingIcon ? <span className="ff-ds-button__icon" aria-hidden="true">{leadingIcon}</span> : null}
            <span>{children}</span>
            {trailingIcon ? <span className="ff-ds-button__icon" aria-hidden="true">{trailingIcon}</span> : null}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "DesignSystemButton";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "subtle" | "inverse" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      label,
      icon = <MoreHorizontal aria-hidden="true" />,
      variant = "default",
      size = "md",
      loading = false,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      {...props}
      ref={ref}
      type={type}
      aria-label={label}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(
        "ff-ds-icon-button",
        `ff-ds-icon-button--${variant}`,
        `ff-ds-icon-button--${size}`,
        className,
      )}
    >
      {loading ? <Spinner size="sm" label="Loading" /> : icon}
    </button>
  ),
);

IconButton.displayName = "DesignSystemIconButton";

export type CardSurface = "neutral" | "subtle" | "tonal" | "accent" | "brand" | "celebration" | "quiet";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, surface = "neutral", padding = "md", interactive = false, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn(
        "ff-ds-card",
        `ff-ds-card--${surface}`,
        `ff-ds-card--padding-${padding}`,
        interactive && "ff-ds-card--interactive",
        className,
      )}
    />
  ),
);

Card.displayName = "DesignSystemCard";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div {...props} ref={ref} className={cn("ff-ds-card__header", className)} />,
);

CardHeader.displayName = "DesignSystemCardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div {...props} ref={ref} className={cn("ff-ds-card__content", className)} />,
);

CardContent.displayName = "DesignSystemCardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div {...props} ref={ref} className={cn("ff-ds-card__footer", className)} />,
);

CardFooter.displayName = "DesignSystemCardFooter";

export interface FieldProps {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  optional?: boolean;
  required?: boolean;
}

function FieldLabel({ label, fieldId, optional, required }: FieldProps & { fieldId: string }) {
  if (!label) return null;
  return (
    <label className="ff-ds-field__label" htmlFor={fieldId}>
      <span>{label}</span>
      {required ? <span className="ff-ds-field__required" aria-hidden="true">*</span> : null}
      {optional ? <span className="ff-ds-field__optional">Optional</span> : null}
    </label>
  );
}

function FieldMessage({ id, helperText, error, success }: FieldProps & { id: string }) {
  const message = error ?? success ?? helperText;
  if (!message) return null;
  return (
    <p
      id={id}
      className={cn(
        "ff-ds-field__message",
        error && "ff-ds-field__message--error",
        success && "ff-ds-field__message--success",
      )}
    >
      {error ? <AlertCircle aria-hidden="true" /> : null}
      {success ? <CheckCircle2 aria-hidden="true" /> : null}
      <span>{message}</span>
    </p>
  );
}

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    FieldProps {
  inputSize?: "sm" | "md" | "lg";
  leadingIcon?: React.ReactNode;
  trailingAction?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      helperText,
      error,
      success,
      optional,
      required,
      inputSize = "md",
      leadingIcon,
      trailingAction,
      className,
      disabled,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const fieldId = id ?? `ff-ds-input-${generatedId}`;
    const messageId = `${fieldId}-message`;
    const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="ff-ds-field">
        <FieldLabel label={label} fieldId={fieldId} optional={optional} required={required} />
        <div className={cn("ff-ds-input-wrap", leadingIcon && "ff-ds-input-wrap--leading", trailingAction && "ff-ds-input-wrap--trailing")}>
          {leadingIcon ? <span className="ff-ds-input-wrap__leading" aria-hidden="true">{leadingIcon}</span> : null}
          <input
            {...props}
            ref={ref}
            id={fieldId}
            required={required}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className={cn("ff-ds-input", `ff-ds-input--${inputSize}`, error && "ff-ds-input--error", success && "ff-ds-input--success", className)}
          />
          {trailingAction ? <span className="ff-ds-input-wrap__trailing">{trailingAction}</span> : null}
        </div>
        <FieldMessage id={messageId} helperText={helperText} error={error} success={success} />
      </div>
    );
  },
);

TextInput.displayName = "DesignSystemTextInput";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { id, label, helperText, error, success, optional, required, showCount = false, className, disabled, value, defaultValue, "aria-describedby": ariaDescribedBy, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
    const fieldId = id ?? `ff-ds-textarea-${generatedId}`;
    const messageId = `${fieldId}-message`;
    const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;
    const contentLength = typeof value === "string" ? value.length : typeof defaultValue === "string" ? defaultValue.length : undefined;

    return (
      <div className="ff-ds-field">
        <FieldLabel label={label} fieldId={fieldId} optional={optional} required={required} />
        <textarea
          {...props}
          ref={ref}
          id={fieldId}
          value={value}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={cn("ff-ds-textarea", error && "ff-ds-textarea--error", success && "ff-ds-textarea--success", className)}
        />
        <div className="ff-ds-field__under-row">
          <FieldMessage id={messageId} helperText={helperText} error={error} success={success} />
          {showCount && props.maxLength ? <span className="ff-ds-field__count">{contentLength ?? 0}/{props.maxLength}</span> : null}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "DesignSystemTextarea";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">, FieldProps {
  options: readonly SelectOption[];
  inputSize?: "sm" | "md" | "lg";
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, helperText, error, success, optional, required, options, inputSize = "md", className, disabled, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    const generatedId = React.useId();
    const fieldId = id ?? `ff-ds-select-${generatedId}`;
    const messageId = `${fieldId}-message`;
    const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="ff-ds-field">
        <FieldLabel label={label} fieldId={fieldId} optional={optional} required={required} />
        <div className="ff-ds-select-wrap">
          <select
            {...props}
            ref={ref}
            id={fieldId}
            required={required}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className={cn("ff-ds-input ff-ds-select", `ff-ds-input--${inputSize}`, error && "ff-ds-input--error", className)}
          >
            {options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
          </select>
          <ChevronDown className="ff-ds-select-wrap__icon" aria-hidden="true" />
        </div>
        <FieldMessage id={messageId} helperText={helperText} error={error} success={success} />
      </div>
    );
  },
);

SelectField.displayName = "DesignSystemSelectField";

export interface ComboboxProps extends TextInputProps {
  options: readonly string[];
}

export function Combobox({ options, id, ...props }: ComboboxProps) {
  const generatedId = React.useId();
  const inputId = id ?? `ff-ds-combobox-${generatedId}`;
  const listId = `${inputId}-options`;
  return <><TextInput {...props} id={inputId} list={listId} /><datalist id={listId}>{options.map((option) => <option key={option} value={option} />)}</datalist></>;
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, description, indeterminate = false, className, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? `ff-ds-checkbox-${generatedId}`;
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label className={cn("ff-ds-check", disabled && "ff-ds-check--disabled", className)} htmlFor={inputId}>
        <input
          {...props}
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          id={inputId}
          type="checkbox"
          disabled={disabled}
        />
        <span className="ff-ds-check__box" aria-hidden="true"><Check /></span>
        <span className="ff-ds-check__copy">
          <span>{label}</span>
          {description ? <small>{description}</small> : null}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = "DesignSystemCheckbox";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  legend: string;
  name: string;
  options: readonly RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function RadioGroup({ legend, name, options, value, onChange, disabled = false }: RadioGroupProps) {
  return (
    <fieldset className="ff-ds-radio-group" disabled={disabled}>
      <legend className="ff-ds-field__label">{legend}</legend>
      <div className="ff-ds-radio-group__options">
        {options.map((option) => (
          <label key={option.value} className={cn("ff-ds-radio", option.disabled && "ff-ds-radio--disabled")}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={option.disabled}
              onChange={() => onChange?.(option.value)}
            />
            <span className="ff-ds-radio__dot" aria-hidden="true" />
            <span className="ff-ds-radio__copy">
              <span>{option.label}</span>
              {option.description ? <small>{option.description}</small> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ id, label, description, className, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? `ff-ds-radio-${generatedId}`;
    return <label className={cn("ff-ds-radio", disabled && "ff-ds-radio--disabled", className)} htmlFor={inputId}><input {...props} ref={ref} id={inputId} type="radio" disabled={disabled} /><span className="ff-ds-radio__dot" aria-hidden="true" /><span className="ff-ds-radio__copy"><span>{label}</span>{description ? <small>{description}</small> : null}</span></label>;
  },
);

Radio.displayName = "DesignSystemRadio";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  label: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({ label, description, checked = false, onCheckedChange, className, disabled, ...props }: SwitchProps) {
  return (
    <div className={cn("ff-ds-switch-row", disabled && "ff-ds-switch-row--disabled", className)}>
      <span className="ff-ds-switch-row__copy"><span>{label}</span>{description ? <small>{description}</small> : null}</span>
      <button
        {...props}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn("ff-ds-switch", checked && "ff-ds-switch--checked")}
      >
        <span className="ff-ds-switch__thumb" />
      </button>
    </div>
  );
}

export type ChipVariant = "selectable" | "selected" | "display" | "removable";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
  onSelect?: () => void;
  onRemove?: () => void;
  icon?: React.ReactNode;
}

export function Chip({ children, variant = "display", onSelect, onRemove, icon, className, ...props }: ChipProps) {
  if (onSelect) {
    return (
      <button
        type="button"
        aria-pressed={variant === "selected"}
        onClick={onSelect}
        className={cn("ff-ds-chip", `ff-ds-chip--${variant}`, className)}
      >
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        {children}
      </button>
    );
  }

  return (
    <span {...props} className={cn("ff-ds-chip", `ff-ds-chip--${variant}`, className)}>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
      {onRemove ? <button type="button" aria-label={`Remove ${String(children)}`} onClick={onRemove}><X aria-hidden="true" /></button> : null}
    </span>
  );
}

export type BadgeVariant = "neutral" | "brand" | "fresh" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  dot?: boolean;
}

export function Badge({ children, variant = "neutral", icon, dot = false, className, ...props }: BadgeProps) {
  return (
    <span {...props} className={cn("ff-ds-badge", `ff-ds-badge--${variant}`, className)}>
      {icon ? <span className="ff-ds-badge__icon" aria-hidden="true">{icon}</span> : null}
      {dot ? <span className="ff-ds-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "ready" | "busy" | "away";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  name: string;
  size?: AvatarSize;
  status?: AvatarStatus;
}

export function Avatar({ src, alt, name, size = "md", status, className, ...props }: AvatarProps) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const initial = name.trim().slice(0, 1).toUpperCase() || "?";

  return (
    <span {...props} className={cn("ff-ds-avatar", `ff-ds-avatar--${size}`, className)} aria-label={alt ?? name}>
      {src && !imageFailed ? <Image src={src} alt={alt ?? name} fill sizes="64px" unoptimized onError={() => setImageFailed(true)} /> : <span aria-hidden="true">{initial}</span>}
      {status ? <span className={cn("ff-ds-avatar__status", `ff-ds-avatar__status--${status}`)} aria-label={status} /> : null}
    </span>
  );
}

export interface AvatarGroupMember extends Pick<AvatarProps, "src" | "name" | "status"> {
  id: string;
}

export function AvatarGroup({ members, max = 4, size = "sm", className }: { members: readonly AvatarGroupMember[]; max?: number; size?: AvatarSize; className?: string }) {
  const visible = members.slice(0, max);
  const overflow = Math.max(0, members.length - visible.length);
  return (
    <div className={cn("ff-ds-avatar-group", className)} aria-label={`${members.length} members`}>
      {visible.map((member) => <Avatar key={member.id} {...member} size={size} />)}
      {overflow ? <span className={cn("ff-ds-avatar ff-ds-avatar--overflow", `ff-ds-avatar--${size}`)} aria-label={`${overflow} more members`}>+{overflow}</span> : null}
    </div>
  );
}

export function Divider({ orientation = "horizontal", label, className }: { orientation?: "horizontal" | "vertical"; label?: string; className?: string }) {
  return label ? <div className={cn("ff-ds-divider-with-label", className)}><span>{label}</span></div> : <div role="separator" className={cn("ff-ds-divider", `ff-ds-divider--${orientation}`, className)} />;
}

export function Spinner({ size = "md", label = "Loading" }: { size?: "sm" | "md" | "lg"; label?: string }) {
  return <span className={cn("ff-ds-spinner", `ff-ds-spinner--${size}`)} role="status" aria-label={label}><LoaderCircle aria-hidden="true" /></span>;
}

export function Skeleton({ variant = "text", className }: { variant?: "text" | "avatar" | "image" | "card"; className?: string }) {
  return <span className={cn("ff-ds-skeleton", `ff-ds-skeleton--${variant}`, className)} aria-hidden="true" />;
}

export function Progress({ value, label, tone = "brand" }: { value: number; label?: string; tone?: "brand" | "accent" | "fresh" }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="ff-ds-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={clamped}>
      <div className="ff-ds-progress__track"><span className={cn("ff-ds-progress__bar", `ff-ds-progress__bar--${tone}`)} style={{ width: `${clamped}%` }} /></div>
      {label ? <span className="ff-ds-progress__label">{label}</span> : null}
    </div>
  );
}

export type AlertVariant = "info" | "success" | "warning" | "danger";

const alertIcon: Record<AlertVariant, React.ReactNode> = {
  info: <Info aria-hidden="true" />,
  success: <CheckCircle2 aria-hidden="true" />,
  warning: <TriangleAlert aria-hidden="true" />,
  danger: <AlertCircle aria-hidden="true" />,
};

export function Alert({ variant = "info", title, children, action, onDismiss, className }: { variant?: AlertVariant; title: string; children?: React.ReactNode; action?: React.ReactNode; onDismiss?: () => void; className?: string }) {
  return (
    <div className={cn("ff-ds-alert", `ff-ds-alert--${variant}`, className)} role={variant === "danger" ? "alert" : "status"}>
      <span className="ff-ds-alert__icon">{alertIcon[variant]}</span>
      <div className="ff-ds-alert__body"><strong>{title}</strong>{children ? <p>{children}</p> : null}{action ? <div className="ff-ds-alert__action">{action}</div> : null}</div>
      {onDismiss ? <IconButton label="Dismiss alert" icon={<X aria-hidden="true" />} size="sm" variant="subtle" onClick={onDismiss} /> : null}
    </div>
  );
}

export function Toast({ variant = "success", title, children, onDismiss }: { variant?: AlertVariant; title: string; children?: React.ReactNode; onDismiss?: () => void }) {
  return <div className={cn("ff-ds-toast", `ff-ds-toast--${variant}`)} role="status"><span className="ff-ds-toast__icon">{alertIcon[variant]}</span><div><strong>{title}</strong>{children ? <p>{children}</p> : null}</div>{onDismiss ? <IconButton label="Dismiss notification" icon={<X aria-hidden="true" />} size="sm" variant="subtle" onClick={onDismiss} /> : null}</div>;
}

export interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}

export function Dialog({ open, title, description, children, footer, onClose }: DialogProps) {
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ff-ds-dialog-layer" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="ff-ds-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} tabIndex={-1}>
        <div className="ff-ds-dialog__header"><div><h3 id={titleId}>{title}</h3>{description ? <p id={descriptionId}>{description}</p> : null}</div><IconButton label="Close dialog" icon={<X aria-hidden="true" />} variant="subtle" onClick={onClose} /></div>
        {children ? <div className="ff-ds-dialog__content">{children}</div> : null}
        {footer ? <div className="ff-ds-dialog__footer">{footer}</div> : null}
      </div>
    </div>
  );
}

export function Sheet({ open, title, side = "bottom", children, onClose }: { open: boolean; title: string; side?: "bottom" | "right"; children?: React.ReactNode; onClose: () => void }) {
  React.useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);
  if (!open) return null;
  return <div className="ff-ds-sheet-layer" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><aside className={cn("ff-ds-sheet", `ff-ds-sheet--${side}`)} aria-label={title}><div className="ff-ds-sheet__header"><h3>{title}</h3><IconButton label="Close sheet" icon={<X aria-hidden="true" />} variant="subtle" onClick={onClose} /></div><div className="ff-ds-sheet__content">{children}</div></aside></div>;
}

export interface MenuItem {
  label: string;
  onSelect?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export function Menu({ label, items, className }: { label: string; items: readonly MenuItem[]; className?: string }) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("pointerdown", handlePointerDown); document.removeEventListener("keydown", handleKeyDown); };
  }, [open]);

  return <div ref={rootRef} className={cn("ff-ds-menu", className)}><button type="button" className="ff-ds-menu__trigger" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((current) => !current)}>{label}<ChevronDown aria-hidden="true" /></button>{open ? <div className="ff-ds-menu__content" role="menu">{items.map((item) => <button key={item.label} type="button" role="menuitem" disabled={item.disabled} className={cn(item.destructive && "ff-ds-menu__item--danger")} onClick={() => { item.onSelect?.(); setOpen(false); }}>{item.label}</button>)}</div> : null}</div>;
}

export interface TabItem { value: string; label: string; disabled?: boolean; }

export function Tabs({ items, value, onChange, label = "Sections" }: { items: readonly TabItem[]; value: string; onChange: (value: string) => void; label?: string }) {
  return <div className="ff-ds-tabs"><div className="ff-ds-tabs__list" role="tablist" aria-label={label}>{items.map((item) => <button key={item.value} type="button" role="tab" aria-selected={value === item.value} disabled={item.disabled} className={cn("ff-ds-tabs__tab", value === item.value && "ff-ds-tabs__tab--active")} onClick={() => onChange(item.value)}>{item.label}</button>)}</div></div>;
}

export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="ff-ds-visually-hidden">{children}</span>;
}

export function IconWell({ icon, tone = "accent", size = "md", label }: { icon: React.ReactNode; tone?: "primary" | "accent" | "fresh" | "neutral"; size?: "sm" | "md" | "lg"; label?: string }) {
  return <span className={cn("ff-ds-icon-well", `ff-ds-icon-well--${tone}`, `ff-ds-icon-well--${size}`)} aria-label={label}>{icon}</span>;
}

export function HelpHint({ children }: { children: React.ReactNode }) {
  return <span className="ff-ds-help-hint"><CircleHelp aria-hidden="true" />{children}</span>;
}

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const tooltipId = `ff-ds-tooltip-${React.useId()}`;
  return <span className="ff-ds-tooltip"><span tabIndex={0} aria-describedby={tooltipId}>{children}</span><span id={tooltipId} role="tooltip">{label}</span></span>;
}
