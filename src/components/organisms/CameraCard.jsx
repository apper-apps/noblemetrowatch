import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import ApperIcon from "@/components/ApperIcon";
import { cameraService } from "@/services/api/cameraService";

const CameraCard = ({ camera, onUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleStatusToggle = async () => {
    setLoading(true);
    try {
      const newStatus = camera.status === "Online" ? "Offline" : "Online";
      const updatedCamera = await cameraService.updateStatus(camera.Id, newStatus);
      onUpdate(updatedCamera);
      toast.success(`Camera ${newStatus.toLowerCase()} successfully`);
    } catch (error) {
      toast.error("Failed to update camera status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete camera "${camera.name}"?`)) {
      return;
    }
    
    setLoading(true);
    try {
      await cameraService.delete(camera.Id);
      onDelete(camera.Id);
      toast.success("Camera deleted successfully");
    } catch (error) {
      toast.error("Failed to delete camera");
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (health) => {
    if (health >= 90) return "text-green-600";
    if (health >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case "online":
        return "online";
      case "offline":
        return "offline";
      case "maintenance":
        return "maintenance";
      default:
        return "default";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <div className="aspect-video bg-surface-100 dark:bg-surface-700 overflow-hidden">
            {camera.status === "Online" ? (
              <img 
                src={camera.feedUrl} 
                alt={`${camera.name} feed`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://picsum.photos/400/225?random=placeholder";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <ApperIcon name="CameraOff" className="w-12 h-12 text-surface-400 mx-auto mb-2" />
                  <p className="text-sm text-surface-500 dark:text-surface-400">Camera Offline</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="absolute top-2 left-2">
            <Badge variant={getBadgeVariant(camera.status)}>
              <StatusIndicator 
                status={camera.status} 
                size="xs" 
                showPulse={camera.status === "Online"}
              />
              <span className="ml-1">{camera.status}</span>
            </Badge>
          </div>
          
          {camera.status === "Online" && (
            <div className="absolute top-2 right-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-red-500 rounded-full"
              />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-surface-900 dark:text-surface-100 truncate">
              {camera.name}
            </h3>
            <div className={`text-sm font-medium ${getHealthColor(camera.health)}`}>
              {camera.health}%
            </div>
          </div>
          
          <p className="text-sm text-surface-500 dark:text-surface-400 mb-3 truncate">
            {camera.location}
          </p>
          
          <div className="flex items-center justify-between text-xs text-surface-500 dark:text-surface-400 mb-4">
            <span>Last ping:</span>
            <span>
              {new Date(camera.lastPing).toLocaleTimeString()}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={camera.status === "Online" ? "danger" : "success"}
              onClick={handleStatusToggle}
              loading={loading}
              className="flex-1"
            >
              {camera.status === "Online" ? "Disable" : "Enable"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              loading={loading}
            >
              <ApperIcon name="Trash2" size={14} />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CameraCard;