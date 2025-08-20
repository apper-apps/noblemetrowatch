import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { incidentService } from '@/services/api/incidentService';
import ApperIcon from '@/components/ApperIcon';

const NotificationToast = () => {
  const lastIncidentCountRef = useRef(null);
  const knownIncidentIdsRef = useRef(new Set());

  useEffect(() => {
    const checkForNewIncidents = async () => {
      try {
        const incidents = await incidentService.getAll();
        const currentIncidentIds = new Set(incidents.map(incident => incident.Id));
        
        // Initialize on first run
        if (lastIncidentCountRef.current === null) {
          lastIncidentCountRef.current = incidents.length;
          knownIncidentIdsRef.current = currentIncidentIds;
          return;
        }

        // Check for new incidents
        const newIncidents = incidents.filter(
          incident => !knownIncidentIdsRef.current.has(incident.Id)
        );

        if (newIncidents.length > 0) {
          newIncidents.forEach(incident => {
            showIncidentToast(incident);
          });
          
          // Update tracking
          lastIncidentCountRef.current = incidents.length;
          knownIncidentIdsRef.current = currentIncidentIds;
        }
      } catch (error) {
        console.error('Error checking for new incidents:', error);
      }
    };

    // Initial check
    checkForNewIncidents();

    // Set up polling every 30 seconds
    const intervalId = setInterval(checkForNewIncidents, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const showIncidentToast = (incident) => {
    const getSeverityIcon = (severity) => {
      switch (severity?.toLowerCase()) {
        case 'high':
          return 'AlertTriangle';
        case 'medium':
          return 'AlertCircle';
        case 'low':
          return 'Info';
        default:
          return 'Bell';
      }
    };

    const getToastType = (severity) => {
      switch (severity?.toLowerCase()) {
        case 'high':
          return 'error';
        case 'medium':
          return 'warning';
        case 'low':
          return 'info';
        default:
          return 'info';
      }
    };

    const CustomToastContent = ({ incident }) => (
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <ApperIcon 
            name={getSeverityIcon(incident.severity)} 
            size={20} 
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white">
            New {incident.type} Incident
          </div>
          <div className="text-sm text-white/90 mt-1">
            {incident.location}
          </div>
          <div className="text-xs text-white/75 mt-1">
            Severity: {incident.severity} • {new Date(incident.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    );

    toast(<CustomToastContent incident={incident} />, {
      type: getToastType(incident.severity),
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return null; // This component doesn't render anything visible
};

export default NotificationToast;