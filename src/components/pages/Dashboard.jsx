import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SummaryCard from "@/components/organisms/SummaryCard";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import ApperIcon from "@/components/ApperIcon";
import { incidentService } from "@/services/api/incidentService";
import { cameraService } from "@/services/api/cameraService";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCameras: 0,
    onlineCameras: 0,
    activeIncidents: 0,
    resolvedIncidents: 0
  });
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [
        totalCameras,
        onlineCameras,
        activeIncidents,
        resolvedIncidents,
        incidents
      ] = await Promise.all([
        cameraService.getTotalCount(),
        cameraService.getOnlineCount(),
        incidentService.getActiveCount(),
        incidentService.getResolvedCount(),
        incidentService.getAll()
      ]);

      setDashboardData({
        totalCameras,
        onlineCameras,
        activeIncidents,
        resolvedIncidents
      });

      // Get recent incidents (last 5)
      const sortedIncidents = incidents
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);
      setRecentIncidents(sortedIncidents);
      
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />;
  }

  const getIncidentTypeColor = (type) => {
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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
            Security Dashboard
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Monitor system status and recent security incidents
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm">
            <StatusIndicator status="online" size="sm" />
            <span className="text-surface-600 dark:text-surface-400">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadDashboardData}
            icon="RefreshCw"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Cameras"
          value={dashboardData.totalCameras}
          icon="Camera"
          color="blue"
        />
        <SummaryCard
          title="Online Cameras"
          value={dashboardData.onlineCameras}
          icon="CheckCircle"
          color="green"
          trend={dashboardData.onlineCameras === dashboardData.totalCameras ? "up" : "down"}
          trendValue={`${Math.round((dashboardData.onlineCameras / dashboardData.totalCameras) * 100)}%`}
        />
        <SummaryCard
          title="Active Incidents"
          value={dashboardData.activeIncidents}
          icon="AlertTriangle"
          color="red"
        />
        <SummaryCard
          title="Resolved Today"
          value={dashboardData.resolvedIncidents}
          icon="CheckCircle2"
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Incidents */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="AlertTriangle" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                    Recent Incidents
                  </h2>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    Latest security alerts and notifications
                  </p>
                </div>
              </div>
              <Link to="/incidents">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentIncidents.length === 0 ? (
                <div className="text-center py-8">
                  <ApperIcon name="CheckCircle" className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-surface-600 dark:text-surface-400">
                    No recent incidents. All systems secure.
                  </p>
                </div>
              ) : (
                recentIncidents.map((incident, index) => (
                  <motion.div
                    key={incident.Id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-surface-50 dark:bg-surface-700 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={incident.snapshot}
                          alt="Incident"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://picsum.photos/48/48?random=placeholder";
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant={getIncidentTypeColor(incident.type)} size="sm">
                          {incident.type}
                        </Badge>
                        <Badge variant={incident.status.toLowerCase()}>
                          <StatusIndicator 
                            status={incident.status} 
                            size="xs" 
                            showPulse={incident.status === "Active"}
                          />
                          <span className="ml-1">{incident.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-surface-900 dark:text-surface-100 truncate">
                        {incident.description}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-surface-500 dark:text-surface-400 mt-1">
                        <span>{incident.cameraName}</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* System Status */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Activity" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                  System Status
                </h2>
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  Real-time system health
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <StatusIndicator status="online" size="sm" />
                  <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    AI Detection
                  </span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Operational
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <StatusIndicator status="online" size="sm" />
                  <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    Data Processing
                  </span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Normal
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <StatusIndicator status="online" size="sm" />
                  <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    Alert System
                  </span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <StatusIndicator status="maintenance" size="sm" />
                  <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    Backup System
                  </span>
                </div>
                <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  Maintenance
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link to="/incidents" className="block">
                <Button variant="outline" className="w-full justify-start" icon="AlertTriangle">
                  View All Incidents
                </Button>
              </Link>
              <Link to="/cameras" className="block">
                <Button variant="outline" className="w-full justify-start" icon="Camera">
                  Manage Cameras
                </Button>
              </Link>
              <Link to="/settings" className="block">
                <Button variant="outline" className="w-full justify-start" icon="Settings">
                  System Settings
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;