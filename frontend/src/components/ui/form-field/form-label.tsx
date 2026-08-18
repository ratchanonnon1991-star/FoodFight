import * as React from "react";
import { Label, type LabelProps } from "@/components/ui/Label";
import { useFormField } from "./form-field";

export type FormLabelProps = LabelProps;

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ htmlFor, disabled, ...props }, ref) => {
    const fieldContext = useFormField();
    const resolvedHtmlFor = htmlFor || fieldContext?.id;
    const resolvedDisabled = disabled ?? fieldContext?.disabled;

    return (
      <Label
        ref={ref}
        htmlFor={resolvedHtmlFor}
        disabled={resolvedDisabled}
        {...props}
      />
    );
  }
);

FormLabel.displayName = "FormLabel";
