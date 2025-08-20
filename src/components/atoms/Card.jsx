import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className,
  children,
  hover = false,
  ...props 
}, ref) => {
  const baseClasses = "bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 shadow-sm transition-all duration-200";
  const hoverClasses = hover ? "hover:shadow-md hover:border-surface-300 dark:hover:border-surface-600 cursor-pointer" : "";

  return (
    <div
      className={cn(
        baseClasses,
        hoverClasses,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;