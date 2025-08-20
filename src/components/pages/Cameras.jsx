import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import CameraCard from "@/components/organisms/CameraCard";
import SearchBar from "@/components/molecules/SearchBar";
import FilterSelect from "@/components/molecules/FilterSelect";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { cameraService } from "@/services/api/cameraService";

const Cameras = () => {
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCamera, setNewCamera] = useState({
    name: "",
    location: "",
    feedUrl: ""
  });
  const [addingCamera, setAddingCamera] = useState(false);

  const loadCameras = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await cameraService.getAll();
      setCameras(data);
      setFilteredCameras(data);
    } catch (err) {
      setError(err.message || "Failed to load cameras");
    } finally {
      setLoading(false);
    }
  };

  const handleCameraUpdate = (updatedCamera) => {
    const newCameras = cameras.map(camera =>
      camera.Id === updatedCamera.Id ? updatedCamera : camera
    );
    setCameras(newCameras);
    applyFilters(newCameras, searchTerm, statusFilter);
  };

  const handleCameraDelete = (cameraId) => {
    const newCameras = cameras.filter(camera => camera.Id !== cameraId);
    setCameras(newCameras);
    applyFilters(newCameras, searchTerm, statusFilter);
  };

  const applyFilters = (data, search, status) => {
    let filtered = [...data];

    if (search) {
      filtered = filtered.filter(camera =>
        camera.name.toLowerCase().includes(search.toLowerCase()) ||
        camera.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter(camera => camera.status === status);
    }

    // Sort by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredCameras(filtered);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    applyFilters(cameras, value, statusFilter);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    applyFilters(cameras, searchTerm, value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setFilteredCameras(cameras);
  };

  const handleAddCamera = async (e) => {
    e.preventDefault();
    
    if (!newCamera.name.trim() || !newCamera.location.trim() || !newCamera.feedUrl.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setAddingCamera(true);
    try {
      const addedCamera = await cameraService.create({
        ...newCamera,
        status: "Online",
        feedUrl: newCamera.feedUrl || `https://picsum.photos/640/480?random=${Date.now()}`
      });
      
      const newCameras = [...cameras, addedCamera];
      setCameras(newCameras);
      applyFilters(newCameras, searchTerm, statusFilter);
      
      setNewCamera({ name: "", location: "", feedUrl: "" });
      setShowAddForm(false);
      toast.success("Camera added successfully");
    } catch (error) {
      toast.error("Failed to add camera");
    } finally {
      setAddingCamera(false);
    }
  };

  useEffect(() => {
    loadCameras();
  }, []);

  const statusOptions = [
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
    { value: "Maintenance", label: "Maintenance" }
  ];

  const activeFiltersCount = [searchTerm, statusFilter].filter(Boolean).length;
  const onlineCameras = cameras.filter(camera => camera.status === "Online").length;
  const totalCameras = cameras.length;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCameras} />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
            Camera Management
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Monitor and manage security camera feeds across the metro system
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-surface-500 dark:text-surface-400">
            <span className="font-medium text-green-600">{onlineCameras}</span> of{" "}
            <span className="font-medium">{totalCameras}</span> cameras online
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadCameras}
            icon="RefreshCw"
          >
            Refresh
          </Button>
          <Button
            onClick={() => setShowAddForm(true)}
            icon="Plus"
          >
            Add Camera
          </Button>
        </div>
      </div>

      {/* Add Camera Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                Add New Camera
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowAddForm(false);
                  setNewCamera({ name: "", location: "", feedUrl: "" });
                }}
              >
                <ApperIcon name="X" size={18} />
              </Button>
            </div>
            
            <form onSubmit={handleAddCamera} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Camera Name"
                value={newCamera.name}
                onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                placeholder="Platform A - East"
                required
              />
              <FormField
                label="Location"
                value={newCamera.location}
                onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                placeholder="Platform A Eastern End"
                required
              />
              <FormField
                label="Feed URL"
                value={newCamera.feedUrl}
                onChange={(e) => setNewCamera({ ...newCamera, feedUrl: e.target.value })}
                placeholder="https://example.com/feed"
              />
              <div className="md:col-span-3 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewCamera({ name: "", location: "", feedUrl: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={addingCamera}
                  icon="Plus"
                >
                  Add Camera
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search cameras by name or location..."
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
      </Card>

      {/* Cameras Grid */}
      {filteredCameras.length === 0 ? (
        <Empty
          title="No cameras found"
          description={
            searchTerm || statusFilter
              ? "No cameras match your current filters. Try adjusting your search criteria."
              : "No cameras configured yet. Add your first camera to get started."
          }
          icon={
            searchTerm || statusFilter
              ? "Search"
              : "Camera"
          }
          action={
            searchTerm || statusFilter
              ? clearFilters
              : () => setShowAddForm(true)
          }
          actionLabel={
            searchTerm || statusFilter
              ? "Clear Filters"
              : "Add Camera"
          }
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCameras.map((camera, index) => (
            <motion.div
              key={camera.Id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CameraCard
                camera={camera}
                onUpdate={handleCameraUpdate}
                onDelete={handleCameraDelete}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Cameras;