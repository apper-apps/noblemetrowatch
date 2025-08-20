import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className,
  children,
  size = "md",
  error,
  ...props 
}, ref) => {
  const baseClasses = "w-full appearance-none rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200";
  
  const sizes = {
    sm: "px-2 py-1 text-sm pr-8",
    md: "px-3 py-2 text-sm pr-10",
    lg: "px-4 py-3 text-base pr-12"
  };

  const errorClasses = error 
    ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
    : "";

  return (
    <div className="relative">
      <select
        className={cn(
          baseClasses,
          sizes[size],
          errorClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <ApperIcon 
        name="ChevronDown" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 pointer-events-none" 
        size={16} 
      />
    </div>
  );
});

Select.displayName = "Select";

export default Select;