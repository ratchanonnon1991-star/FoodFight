import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { useFormField } from "./form-field";

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, id, ...props }, ref) => {
  const fieldContext = useFormField();
  const resolvedId = id || fieldContext?.descriptionId;

  return (
    <p
      ref={ref}
      id={resolvedId}
      className={cn("text-xs text-text-secondary leading-normal", className)}
      {...props}
    />
  );
});

FormDescription.displayName = "FormDescription";
