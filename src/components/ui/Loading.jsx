import React from "react";
import { motion } from "framer-motion";

const Loading = ({ type = "skeleton", className = "" }) => {
  if (type === "spinner") {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-3 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Card skeleton */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-surface-200 dark:bg-surface-700 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4"></div>
              <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-1/2"></div>
            </div>
            <div className="w-20 h-8 bg-surface-200 dark:bg-surface-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="animate-pulse p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-surface-200 dark:bg-surface-700 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-full"></div>
                <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-2/3"></div>
              </div>
              <div className="w-24 h-6 bg-surface-200 dark:bg-surface-700 rounded-full"></div>
              <div className="w-20 h-8 bg-surface-200 dark:bg-surface-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
            <div className="animate-pulse">
              <div className="aspect-video bg-surface-200 dark:bg-surface-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4"></div>
                <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-1/2"></div>
                <div className="flex space-x-2 mt-4">
                  <div className="flex-1 h-8 bg-surface-200 dark:bg-surface-700 rounded"></div>
                  <div className="w-8 h-8 bg-surface-200 dark:bg-surface-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;