"use client";

import Image from "next/image";
import * as React from "react";
import { ImageOff, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type MediaRatio = "16:9" | "4:3" | "1:1" | "3:4";
export type MediaState = "auto" | "loading" | "missing";
export type MediaFit = "cover" | "contain";

export interface MediaFrameProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  src?: string;
  alt: string;
  ratio?: MediaRatio;
  state?: MediaState;
  fit?: MediaFit;
  label?: string;
  fallback?: React.ReactNode;
  overlay?: React.ReactNode;
  children?: React.ReactNode;
  gradientProtection?: boolean;
}

const ratioClass: Record<MediaRatio, string> = {
  "16:9": "ff-ds-media--16-9",
  "4:3": "ff-ds-media--4-3",
  "1:1": "ff-ds-media--1-1",
  "3:4": "ff-ds-media--3-4",
};

export const MediaFrame = React.forwardRef<HTMLDivElement, MediaFrameProps>(
  (
    {
      src,
      alt,
      ratio = "4:3",
      state = "auto",
      fit = "cover",
      label,
      fallback,
      overlay,
      children,
      gradientProtection = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [failedSrc, setFailedSrc] = React.useState<string | undefined>();

    const isLoading = state === "loading";
    const isMissing = state === "missing" || !src || Boolean(src && failedSrc === src);

    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "ff-ds-media",
          ratioClass[ratio],
          `ff-ds-media--fit-${fit}`,
          isLoading && "ff-ds-media--loading",
          isMissing && "ff-ds-media--missing",
          gradientProtection && "ff-ds-media--gradient",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        {isLoading ? <span className="ff-ds-media__loading-mark"><span className="ff-ds-media__loading-bar" />Loading image</span> : null}
        {!isLoading && !isMissing && src ? <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 640px" unoptimized onError={() => setFailedSrc(src)} /> : null}
        {isMissing && !isLoading ? (
          fallback ?? <span className="ff-ds-media__fallback"><ImageOff aria-hidden="true" /><span>{label ?? "Image placeholder"}</span><small>{ratio} · owner image later</small></span>
        ) : null}
        {gradientProtection ? <span className="ff-ds-media__gradient" aria-hidden="true" /> : null}
        {overlay ? <span className="ff-ds-media__overlay">{overlay}</span> : null}
        {children ? <span className="ff-ds-media__content">{children}</span> : null}
      </div>
    );
  },
);

MediaFrame.displayName = "DesignSystemMediaFrame";

export interface MediaPlaceholderProps extends Omit<MediaFrameProps, "src"> {
  purpose?: string;
  recommendedSize?: string;
}

export function MediaPlaceholder({ purpose = "Owner image later", recommendedSize, label, ...props }: MediaPlaceholderProps) {
  return (
    <MediaFrame
      {...props}
      label={label ?? purpose}
      fallback={
        <span className="ff-ds-media__fallback">
          <ImageIcon aria-hidden="true" />
          <span>{purpose}</span>
          <small>{props.ratio ?? "4:3"}{recommendedSize ? ` · ${recommendedSize}` : " · placeholder"}</small>
        </span>
      }
    />
  );
}

export function Media({ src, ...props }: MediaFrameProps) {
  return <MediaFrame src={src} {...props} />;
}
