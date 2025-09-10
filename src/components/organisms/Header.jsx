import React, { useContext } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ darkMode, toggleDarkMode, onMenuClick, className }) => {
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
  };

  return (
    <header className={cn(
      "bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 px-4 py-3 lg:px-6",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
              Security Control Center
            </h1>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Real-time monitoring and incident management
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-surface-500 dark:text-surface-400">
            <div className="flex items-center space-x-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <span>System Online</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="relative"
          >
            <motion.div
              initial={false}
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                size={18} 
                className="text-surface-600 dark:text-surface-400" 
              />
            </motion.div>
          </Button>

          {isAuthenticated && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" className="w-4 h-4 text-white" />
                </div>
                {user && (
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">
                      {user.emailAddress}
                    </p>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100"
              >
                <ApperIcon name="LogOut" size={16} />
                <span className="hidden sm:inline ml-1">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;