import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found",
  description = "There's nothing to show here yet.",
  icon = "Inbox",
  action,
  actionLabel = "Add New",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-12 text-center">
        <div className="mx-auto w-20 h-20 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mb-6">
          <ApperIcon 
            name={icon} 
            className="w-10 h-10 text-surface-400 dark:text-surface-500" 
          />
        </div>
        
        <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
          {title}
        </h3>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-sm mx-auto">
          {description}
        </p>
        
        {action && (
          <Button onClick={action} icon="Plus">
            {actionLabel}
          </Button>
        )}
      </Card>
    </motion.div>
  );
};

export default Empty;