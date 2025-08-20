import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose, className }) => {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { name: "Incidents", href: "/incidents", icon: "AlertTriangle" },
    { name: "Cameras", href: "/cameras", icon: "Camera" },
    { name: "Settings", href: "/settings", icon: "Settings" }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-6 py-4 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
            <ApperIcon name="Shield" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-surface-900 dark:text-surface-100">
              MetroWatch
            </h2>
            <p className="text-xs text-surface-500 dark:text-surface-400">AI Surveillance</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md"
                  : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100"
              )
            }
          >
            {({ isActive }) => (
              <>
                <ApperIcon 
                  name={item.icon} 
                  className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive ? "text-white" : "text-surface-400 group-hover:text-surface-500"
                  )} 
                />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">
              Security Operator
            </p>
            <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
              operator@metrowatch.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 z-30",
        className
      )}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 shadow-xl"
          >
            <SidebarContent />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;