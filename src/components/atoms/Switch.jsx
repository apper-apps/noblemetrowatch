import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Switch = forwardRef(({ 
  className,
  checked,
  onChange,
  disabled,
  size = "md",
  ...props 
}, ref) => {
  const sizes = {
    sm: {
      track: "w-8 h-5",
      thumb: "w-4 h-4",
      translate: "translate-x-3"
    },
    md: {
      track: "w-11 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-5"
    },
    lg: {
      track: "w-14 h-7",
      thumb: "w-6 h-6",
      translate: "translate-x-7"
    }
  };

  const currentSize = sizes[size];

  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        currentSize.track,
        checked 
          ? "bg-gradient-to-r from-primary-600 to-primary-700" 
          : "bg-surface-200 dark:bg-surface-700",
        className
      )}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      ref={ref}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none inline-block rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out",
          currentSize.thumb,
          checked ? currentSize.translate : "translate-x-0"
        )}
      />
    </button>
  );
});

Switch.displayName = "Switch";

export default Switch;