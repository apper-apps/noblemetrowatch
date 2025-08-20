import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className,
  variant = "primary",
  size = "md",
  children,
  disabled,
  loading,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-md hover:shadow-lg transform hover:scale-[1.02]",
    secondary: "bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-surface-100 border border-surface-300 dark:border-surface-600 hover:bg-surface-200 dark:hover:bg-surface-700 focus:ring-surface-500",
    outline: "border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:text-white focus:ring-primary-500",
    ghost: "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100",
    danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500 shadow-md hover:shadow-lg",
    success: "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-500 shadow-md hover:shadow-lg"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="animate-spin mr-2" 
          size={size === "sm" ? 14 : 16} 
        />
      )}
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon 
          name={icon} 
          className="mr-2" 
          size={size === "sm" ? 14 : 16} 
        />
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon 
          name={icon} 
          className="ml-2" 
          size={size === "sm" ? 14 : 16} 
        />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;