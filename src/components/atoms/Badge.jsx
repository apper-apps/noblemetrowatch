import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className,
  variant = "default",
  children,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variants = {
    default: "bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200",
    success: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    warning: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
    danger: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
    info: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    active: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    resolved: "bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300",
    online: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    offline: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
    maintenance: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200"
  };

  return (
    <span
      className={cn(
        baseClasses,
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;