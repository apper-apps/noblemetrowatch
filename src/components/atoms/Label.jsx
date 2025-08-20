import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ 
  className,
  children,
  required,
  ...props 
}, ref) => {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
});

Label.displayName = "Label";

export default Label;