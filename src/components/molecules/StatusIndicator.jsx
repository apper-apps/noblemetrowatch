import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const StatusIndicator = ({ status, size = "sm", showPulse = true }) => {
  const sizes = {
    xs: "w-2 h-2",
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "online":
      case "active":
      case "resolved":
        return "bg-green-500";
      case "offline":
      case "error":
        return "bg-red-500";
      case "maintenance":
      case "warning":
        return "bg-amber-500";
      case "pending":
        return "bg-blue-500";
      default:
        return "bg-surface-400";
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <div
        className={cn(
          "rounded-full",
          sizes[size],
          getStatusColor(status)
        )}
      />
      {showPulse && (status === "active" || status === "online") && (
        <motion.div
          className={cn(
            "absolute rounded-full opacity-75",
            sizes[size],
            getStatusColor(status)
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
};

export default StatusIndicator;