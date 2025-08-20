import React, { useState } from "react";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";

const Layout = ({ children, darkMode, toggleDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      <div className="lg:pl-64">
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          onMenuClick={handleMenuClick}
        />
        
        <main className="py-6 px-4 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;