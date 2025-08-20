import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong",
  onRetry,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <ApperIcon 
            name="AlertTriangle" 
            className="w-8 h-8 text-red-600 dark:text-red-400" 
          />
        </div>
        
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-sm mx-auto">
          {message}
        </p>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            icon="RefreshCw"
          >
            Try Again
          </Button>
        )}
      </Card>
    </motion.div>
  );
};

export default Error;