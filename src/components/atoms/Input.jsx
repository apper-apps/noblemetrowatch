import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className,
  type = "text",
  size = "md",
  error,
  ...props 
}, ref) => {
  const baseClasses = "w-full rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 px-3 py-2 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-500 dark:placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200";
  
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base"
  };

  const errorClasses = error 
    ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
    : "";

  return (
    <input
      type={type}
      className={cn(
        baseClasses,
        sizes[size],
        errorClasses,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;