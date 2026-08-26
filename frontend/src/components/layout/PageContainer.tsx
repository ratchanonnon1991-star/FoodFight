import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export const pageContainerVariants = cva(
  "w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10",
  {
    variants: {
      maxWidth: {
        narrow: "max-w-2xl lg:max-w-3xl",
        standard: "max-w-6xl",
        wide: "max-w-[1440px]",
        sm: "max-w-screen-sm", // 640px
        md: "max-w-screen-md", // 768px
        lg: "max-w-screen-lg", // 1024px
        xl: "max-w-screen-xl", // 1280px
        auth: "max-w-md",      // ~448px (ideal for auth flows)
        full: "max-w-full",
      },
      paddingY: {
        none: "py-0",
        sm: "py-4 sm:py-6",
        md: "py-6 sm:py-8 md:py-12",
        lg: "py-10 sm:py-16 md:py-20",
      },
      spacing: {
        none: "",
        compact: "space-y-4 sm:space-y-5",
        comfortable: "space-y-5 sm:space-y-6 lg:space-y-8",
        roomy: "space-y-6 sm:space-y-8 lg:space-y-10",
      },
    },
    defaultVariants: {
      maxWidth: "lg",
      paddingY: "md",
      spacing: "none",
    },
  }
);

export const pageTypography = {
  title: "text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
  sectionTitle: "text-sm font-bold tracking-tight sm:text-base lg:text-lg",
  body: "text-sm leading-6 text-text-secondary sm:text-base",
} as const;

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {
  as?: "div" | "main" | "section";
}

export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  (
    { className, maxWidth, paddingY, spacing, as: Tag = "div", ...props },
    ref,
  ) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          pageContainerVariants({ maxWidth, paddingY, spacing }),
          className,
        )}
        {...props}
      />
    );
  }
);

PageContainer.displayName = "PageContainer";
