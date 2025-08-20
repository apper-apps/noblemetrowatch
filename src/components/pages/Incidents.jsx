import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IncidentRow from "@/components/organisms/IncidentRow";
import SearchBar from "@/components/molecules/SearchBar";
import FilterSelect from "@/components/molecules/FilterSelect";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { incidentService } from "@/services/api/incidentService";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const loadIncidents = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await incidentService.getAll();
      setIncidents(data);
      setFilteredIncidents(data);
    } catch (err) {
      setError(err.message || "Failed to load incidents");
    } finally {
      setLoading(false);
    }
  };

  const handleIncidentUpdate = (updatedIncident) => {
    const newIncidents = incidents.map(incident =>
      incident.Id === updatedIncident.Id ? updatedIncident : incident
    );
    setIncidents(newIncidents);
    applyFilters(newIncidents, searchTerm, statusFilter, typeFilter);
  };

  const applyFilters = (data, search, status, type) => {
    let filtered = [...data];

    if (search) {
      filtered = filtered.filter(incident =>
        incident.description.toLowerCase().includes(search.toLowerCase()) ||
        incident.cameraName.toLowerCase().includes(search.toLowerCase()) ||
        incident.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter(incident => incident.status === status);
    }

    if (type) {
      filtered = filtered.filter(incident => incident.type === type);
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredIncidents(filtered);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    applyFilters(incidents, value, statusFilter, typeFilter);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    applyFilters(incidents, searchTerm, value, typeFilter);
  };

  const handleTypeFilter = (value) => {
    setTypeFilter(value);
    applyFilters(incidents, searchTerm, statusFilter, value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setTypeFilter("");
    setFilteredIncidents(incidents);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Resolved", label: "Resolved" }
  ];

  const typeOptions = [
    { value: "Theft", label: "Theft" },
    { value: "Unattended Object", label: "Unattended Object" },
    { value: "Vandalism", label: "Vandalism" },
    { value: "Suspicious Activity", label: "Suspicious Activity" }
  ];

  const activeFiltersCount = [searchTerm, statusFilter, typeFilter].filter(Boolean).length;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadIncidents} />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
            Security Incidents
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Monitor and manage security alerts from AI detection system
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-surface-500 dark:text-surface-400">
            {filteredIncidents.length} of {incidents.length} incidents
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={loadIncidents}
            icon="RefreshCw"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search incidents, cameras, or descriptions..."
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
            <FilterSelect
              label="Status"
              value={statusFilter}
              onChange={handleStatusFilter}
              options={statusOptions}
              placeholder="All Status"
              className="w-full sm:w-40"
            />
            
            <FilterSelect
              label="Type"
              value={typeFilter}
              onChange={handleTypeFilter}
              options={typeOptions}
              placeholder="All Types"
              className="w-full sm:w-48"
            />
            
            {activeFiltersCount > 0 && (
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  icon="X"
                >
                  Clear ({activeFiltersCount})
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Incidents List */}
      {filteredIncidents.length === 0 ? (
        <Empty
          title="No incidents found"
          description={
            searchTerm || statusFilter || typeFilter
              ? "No incidents match your current filters. Try adjusting your search criteria."
              : "No security incidents detected. All systems are secure."
          }
          icon={
            searchTerm || statusFilter || typeFilter
              ? "Search"
              : "Shield"
          }
          action={activeFiltersCount > 0 ? clearFilters : undefined}
          actionLabel="Clear Filters"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {filteredIncidents.map((incident, index) => (
            <motion.div
              key={incident.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <IncidentRow
                incident={incident}
                onUpdate={handleIncidentUpdate}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Incidents;