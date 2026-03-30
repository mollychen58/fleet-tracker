import { useState, useEffect } from "react";
import "./App.css";
import {
  getVehicles,
  getFleetMetrics,
  getDriverForVehicle,
  getMaintenanceForVehicle,
  getDaysSinceLastService,
  scheduleMaintenance,
  updateVehicleStatus,
  searchVehicles,
  resetData
} from "./services/ontologyService";
import { VehicleStatus } from "./types";
import { VehicleHealthCard } from "./components/VehicleHealthCard";
import { MetricCards } from "./components/MetricCards";
import { FilterBar } from "./components/FilterBar";
import { ConfirmModal } from "./components/ConfirmModal";

function App() {
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | "All">("All");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [formData, setFormData] = useState({
    serviceType: "",
    serviceDate: "",
    technicianName: "",
    notes: ""
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusSuccess, setStatusSuccess] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  // Get vehicles based on search or filter
  let vehicles = searchQuery
    ? searchVehicles(searchQuery)
    : statusFilter === "All"
      ? getVehicles()
      : getVehicles({ status: statusFilter });

  // Apply status filter to search results as well
  if (searchQuery && statusFilter !== "All") {
    vehicles = vehicles.filter(v => v.status === statusFilter);
  }

  const metrics = getFleetMetrics();

  // Clear selection if selected vehicle is no longer in the filtered list
  useEffect(() => {
    if (selectedVehicleId) {
      const vehicleExists = vehicles.find(v => v.vehicleId === selectedVehicleId);
      if (!vehicleExists) {
        setSelectedVehicleId(null);
      }
    }
  }, [vehicles, selectedVehicleId]);

  const selectedVehicle = selectedVehicleId
    ? vehicles.find(v => v.vehicleId === selectedVehicleId)
    : null;

  const selectedDriver = selectedVehicleId
    ? getDriverForVehicle(selectedVehicleId)
    : null;

  const maintenanceRecords = selectedVehicleId
    ? getMaintenanceForVehicle(selectedVehicleId)
    : [];

  const daysSinceService = selectedVehicleId
    ? getDaysSinceLastService(selectedVehicleId)
    : null;

  const getStatusColor = (status: VehicleStatus): string => {
    switch (status) {
      case "Active": return "#22c55e";
      case "Out of Service": return "#eab308";
      case "Retired": return "#ef4444";
      default: return "#94a3b8";
    }
  };

  const handleScheduleMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!selectedVehicleId) return;

    const result = scheduleMaintenance({
      vehicleId: selectedVehicleId,
      serviceType: formData.serviceType,
      serviceDate: formData.serviceDate,
      technicianName: formData.technicianName,
      notes: formData.notes
    });

    if (result.success) {
      setFormSuccess("Maintenance scheduled successfully!");
      setFormData({ serviceType: "", serviceDate: "", technicianName: "", notes: "" });
      setShowMaintenanceForm(false);
    } else {
      setFormError(result.error || "Failed to schedule maintenance");
    }
  };

  const handleStatusChange = (newStatus: VehicleStatus) => {
    setStatusError(null);
    setStatusSuccess(null);

    if (!selectedVehicleId) return;

    const result = updateVehicleStatus({
      vehicleId: selectedVehicleId,
      newStatus
    });

    if (result.success) {
      setStatusSuccess("Vehicle status updated successfully!");
      setTimeout(() => setStatusSuccess(null), 3000);
    } else {
      setStatusError(result.error || "Failed to update status");
    }
  };

  const handleResetData = () => {
    resetData();
    setSelectedVehicleId(null);
    setSearchQuery("");
    setStatusFilter("All");
    setShowResetModal(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>🚚 Fleet Maintenance Tracker</h1>
            <p className="subtitle">
              Manage your fleet's health, track maintenance, and take action.
            </p>
          </div>
          <button className="btn btn-secondary" onClick={() => setShowResetModal(true)}>
            Reset Data
          </button>
        </div>
      </header>

      <main className="app-main">
        <MetricCards
          totalVehicles={metrics.totalVehicles}
          activeVehicles={metrics.activeVehicles}
          totalMaintenanceCost={metrics.totalMaintenanceCost}
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Vehicle Health Cards View */}
        {viewMode === "cards" && (
          vehicles.length === 0 ? (
            <div className="empty-state">
              <p>No vehicles found matching your criteria.</p>
            </div>
          ) : (
            <div className="health-cards-grid">
              {vehicles.map((vehicle) => (
                <VehicleHealthCard key={vehicle.vehicleId} vehicle={vehicle} />
              ))}
            </div>
          )
        )}

        {/* Vehicle Table */}
        {viewMode === "table" && (
          vehicles.length === 0 ? (
            <div className="empty-state">
              <p>No vehicles found matching your criteria.</p>
            </div>
          ) : (
            <div className="vehicle-table-container">
              <table className="vehicle-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Mileage</th>
                    <th>Days Since Service</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                <>
                  <tr
                    key={vehicle.vehicleId}
                    className={selectedVehicleId === vehicle.vehicleId ? "selected" : ""}
                    onClick={() => {
                      setSelectedVehicleId(vehicle.vehicleId);
                      setFormSuccess(null);
                      setFormError(null);
                      setStatusSuccess(null);
                      setStatusError(null);
                      setShowMaintenanceForm(false);
                    }}
                  >
                    <td>{vehicle.vehicleId}</td>
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.mileage.toLocaleString()} mi</td>
                    <td>
                      {(() => {
                        const days = getDaysSinceLastService(vehicle.vehicleId);
                        if (days === null) return <span className="days-na">N/A</span>;
                        if (days > 90) return <span className="days-overdue">{days} days ⚠️</span>;
                        return <span>{days} days</span>;
                      })()}
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(vehicle.status) }}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                  </tr>

                  {/* Detail Panel Row - appears right after clicked row */}
                  {selectedVehicleId === vehicle.vehicleId && selectedVehicle && (
                    <tr className="detail-row">
                      <td colSpan={6}>
                        <div className="detail-panel-inline">
                          <h2>Vehicle Details: {selectedVehicle.vehicleId}</h2>

                          {/* Warning for overdue maintenance */}
                          {daysSinceService !== null && daysSinceService > 90 && (
                            <div className="warning">
                              ⚠️ Maintenance overdue! Last service was {daysSinceService} days ago.
                            </div>
                          )}

                          {/* Status Update */}
                          <div className="action-section">
                            <label htmlFor="status-update">Update Status:</label>
                            <select
                              id="status-update"
                              value={selectedVehicle.status}
                              onChange={(e) => handleStatusChange(e.target.value as VehicleStatus)}
                            >
                              <option value="Active">Active</option>
                              <option value="Out of Service">Out of Service</option>
                              <option value="Retired">Retired</option>
                            </select>
                            {statusSuccess && <div className="success-message">{statusSuccess}</div>}
                            {statusError && <div className="error-message">{statusError}</div>}
                          </div>

                          {/* Vehicle Info Grid */}
                          <div className="detail-grid">
                            <div className="detail-item">
                              <div className="label">Make</div>
                              <div className="value">{selectedVehicle.make}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Model</div>
                              <div className="value">{selectedVehicle.model}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Year</div>
                              <div className="value">{selectedVehicle.year}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Mileage</div>
                              <div className="value">{selectedVehicle.mileage.toLocaleString()} mi</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Status</div>
                              <div className="value">
                                <span
                                  className="status-badge"
                                  style={{ backgroundColor: getStatusColor(selectedVehicle.status) }}
                                >
                                  {selectedVehicle.status}
                                </span>
                              </div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Days Since Last Service</div>
                              <div className="value">
                                {daysSinceService !== null ? `${daysSinceService} days` : "No service history"}
                              </div>
                            </div>
                          </div>

                          {/* Assigned Driver */}
                          <h3>Assigned Driver</h3>
                          {selectedDriver ? (
                            <div className="detail-grid">
                              <div className="detail-item">
                                <div className="label">Driver ID</div>
                                <div className="value">{selectedDriver.driverId}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Name</div>
                                <div className="value">{selectedDriver.fullName}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">License Number</div>
                                <div className="value">{selectedDriver.licenseNumber}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Hire Date</div>
                                <div className="value">{new Date(selectedDriver.hireDate).toLocaleDateString()}</div>
                              </div>
                            </div>
                          ) : (
                            <p>No driver assigned</p>
                          )}

                          {/* Maintenance Records */}
                          <div className="maintenance-section">
                            <div className="maintenance-header">
                              <h3>Maintenance History</h3>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setShowMaintenanceForm(!showMaintenanceForm);
                                  setFormError(null);
                                  setFormSuccess(null);
                                }}
                              >
                                {showMaintenanceForm ? "Cancel" : "Schedule Maintenance"}
                              </button>
                            </div>

                            {formSuccess && <div className="success-message">{formSuccess}</div>}

                            {showMaintenanceForm && (
                              <form className="action-form" onSubmit={handleScheduleMaintenance}>
                                <h3>Schedule New Maintenance</h3>

                                <div className="form-group">
                                  <label htmlFor="serviceType">Service Type *</label>
                                  <input
                                    type="text"
                                    id="serviceType"
                                    value={formData.serviceType}
                                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                    required
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="serviceDate">Service Date *</label>
                                  <input
                                    type="date"
                                    id="serviceDate"
                                    value={formData.serviceDate}
                                    onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                                    required
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="technicianName">Technician Name</label>
                                  <input
                                    type="text"
                                    id="technicianName"
                                    value={formData.technicianName}
                                    onChange={(e) => setFormData({ ...formData, technicianName: e.target.value })}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="notes">Notes</label>
                                  <textarea
                                    id="notes"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    rows={3}
                                  />
                                </div>

                                {formError && <div className="error-message">{formError}</div>}

                                <button type="submit" className="btn btn-primary">
                                  Submit
                                </button>
                              </form>
                            )}

                            {maintenanceRecords.length > 0 ? (
                              <div className="vehicle-table-container">
                                <table className="vehicle-table">
                                  <thead>
                                    <tr>
                                      <th>Record ID</th>
                                      <th>Service Type</th>
                                      <th>Service Date</th>
                                      <th>Cost</th>
                                      <th>Technician</th>
                                      <th>Notes</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {maintenanceRecords.map((record) => (
                                      <tr key={record.recordId}>
                                        <td>{record.recordId}</td>
                                        <td>{record.serviceType}</td>
                                        <td>{new Date(record.serviceDate).toLocaleDateString()}</td>
                                        <td>${record.cost.toLocaleString()}</td>
                                        <td>{record.technicianName}</td>
                                        <td>{record.notes || "-"}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p>No maintenance records found</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </main>

      <ConfirmModal
        isOpen={showResetModal}
        title="Reset Data"
        message="Are you sure you want to reset all data? This will clear any changes you've made."
        onConfirm={handleResetData}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
}

export default App;
