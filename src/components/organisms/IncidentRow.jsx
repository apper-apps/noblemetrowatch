import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import ApperIcon from "@/components/ApperIcon";
import { incidentService } from "@/services/api/incidentService";

const IncidentRow = ({ incident, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleStatusToggle = async () => {
    setLoading(true);
    try {
      const newStatus = incident.status === "Active" ? "Resolved" : "Active";
      const updatedIncident = await incidentService.updateStatus(incident.Id, newStatus);
      onUpdate(updatedIncident);
      toast.success(`Incident marked as ${newStatus.toLowerCase()}`);
    } catch (error) {
      toast.error("Failed to update incident status");
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "theft":
        return "danger";
      case "unattended object":
        return "warning";
      case "vandalism":
        return "danger";
      case "suspicious activity":
        return "info";
      default:
        return "default";
    }
  };

  const getBadgeVariant = (status) => {
    return status.toLowerCase() === "active" ? "active" : "resolved";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-100 dark:bg-surface-700">
              <img
                src={incident.snapshot}
                alt="Incident snapshot"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://picsum.photos/80/80?random=placeholder";
                }}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={getTypeColor(incident.type)}>
                {incident.type}
              </Badge>
              <Badge variant={getBadgeVariant(incident.status)}>
                <StatusIndicator 
                  status={incident.status} 
                  size="xs" 
                  showPulse={incident.status === "Active"}
                />
                <span className="ml-1">{incident.status}</span>
              </Badge>
            </div>

            <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-1">
              {incident.description}
            </h3>

            <div className="flex items-center space-x-4 text-xs text-surface-500 dark:text-surface-400">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Camera" size={12} />
                <span>{incident.cameraName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Clock" size={12} />
                <span>
                  {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={incident.status === "Active" ? "success" : "outline"}
              onClick={handleStatusToggle}
              loading={loading}
            >
              {incident.status === "Active" ? (
                <>
                  <ApperIcon name="Check" size={14} />
                  Resolve
                </>
              ) : (
                <>
                  <ApperIcon name="AlertTriangle" size={14} />
                  Reopen
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default IncidentRow;