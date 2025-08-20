import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

import Dashboard from "@/components/pages/Dashboard";
import Incidents from "@/components/pages/Incidents";
import Cameras from "@/components/pages/Cameras";
import Settings from "@/components/pages/Settings";
import Layout from "@/components/organisms/Layout";
import NotificationToast from "@/components/organisms/NotificationToast";
function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("metrowatch-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setDarkMode(shouldUseDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("metrowatch-theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-surface-900" : "bg-surface-50"
      }`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard />
              </motion.div>
            </Layout>
          } />
          <Route path="/incidents" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Incidents />
              </motion.div>
            </Layout>
          } />
          <Route path="/cameras" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Cameras />
              </motion.div>
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Settings />
              </motion.div>
            </Layout>
          } />
        </Routes>
<NotificationToast />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;