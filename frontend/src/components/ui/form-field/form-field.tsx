import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface FormFieldContextValue {
  id: string;
  name?: string;
  isInvalid: boolean;
  descriptionId: string;
  errorId: string;
  disabled?: boolean;
}

export const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

export function useFormField() {
  const context = React.useContext(FormFieldContext);
  return context;
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  id?: string;
  isInvalid?: boolean;
  disabled?: boolean;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, id: customId, name, isInvalid = false, disabled = false, children, ...props }, ref) => {
    const generatedId = React.useId();
    const id = customId || generatedId;
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;

    const contextValue = React.useMemo(
      () => ({
        id,
        name,
        isInvalid,
        descriptionId,
        errorId,
        disabled,
      }),
      [id, name, isInvalid, descriptionId, errorId, disabled]
    );

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("flex flex-col space-y-1.5 w-full", className)}
          {...props}
        >
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  }
);

FormField.displayName = "FormField";
