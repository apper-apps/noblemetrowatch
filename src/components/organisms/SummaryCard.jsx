import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const SummaryCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = "blue",
  gradient = true 
}) => {
  const colorClasses = {
    blue: {
      icon: "from-blue-500 to-blue-600",
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    green: {
      icon: "from-green-500 to-green-600",
      text: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
    amber: {
      icon: "from-amber-500 to-amber-600",
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    },
    red: {
      icon: "from-red-500 to-red-600",
      text: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20"
    }
  };

  const currentColor = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold text-surface-900 dark:text-surface-100"
              >
                {value}
              </motion.p>
              {trend && (
                <div className="flex items-center">
                  <ApperIcon 
                    name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                    className={`w-4 h-4 ${
                      trend === "up" 
                        ? "text-green-500" 
                        : "text-red-500"
                    }`}
                  />
                  <span className={`text-sm font-medium ${
                    trend === "up" 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {trendValue}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${currentColor.bg}`}>
            <div className={`w-8 h-8 rounded-lg ${
              gradient 
                ? `bg-gradient-to-r ${currentColor.icon}` 
                : currentColor.bg
            } flex items-center justify-center`}>
              <ApperIcon 
                name={icon} 
                className={gradient ? "w-5 h-5 text-white" : `w-5 h-5 ${currentColor.text}`} 
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SummaryCard;