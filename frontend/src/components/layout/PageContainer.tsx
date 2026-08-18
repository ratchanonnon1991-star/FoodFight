import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export const pageContainerVariants = cva(
  "w-full mx-auto px-4 sm:px-6 lg:px-8",
  {
    variants: {
      maxWidth: {
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
    },
    defaultVariants: {
      maxWidth: "lg",
      paddingY: "md",
    },
  }
);

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {
  as?: "div" | "main" | "section";
}

export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, maxWidth, paddingY, as: Tag = "div", ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(pageContainerVariants({ maxWidth, paddingY }), className)}
        {...props}
      />
    );
  }
);

PageContainer.displayName = "PageContainer";
