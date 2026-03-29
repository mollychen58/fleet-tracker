import { useState } from "react";
import "./App.css";
import {
  getVehicles,
  getFleetMetrics,
  getDriverForVehicle,
  getMaintenanceForVehicle,
  getDaysSinceLastService
} from "./services/ontologyService";
import { VehicleStatus } from "./types";

function App() {
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | "All">("All");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const vehicles = statusFilter === "All"
    ? getVehicles()
    : getVehicles({ status: statusFilter });

  const metrics = getFleetMetrics();

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

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚚 Fleet Maintenance Tracker</h1>
        <p className="subtitle">
          Manage your fleet's health, track maintenance, and take action.
        </p>
      </header>

      <main className="app-main">
        {/* Metric Cards */}
        <div className="metric-cards">
          <div className="metric-card">
            <div className="metric-label">Total Vehicles</div>
            <div className="metric-value">{metrics.totalVehicles}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Active Vehicles</div>
            <div className="metric-value">{metrics.activeVehicles}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Total Maintenance Cost</div>
            <div className="metric-value">${metrics.totalMaintenanceCost.toLocaleString()}</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as VehicleStatus | "All")}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Out of Service">Out of Service</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        {/* Vehicle Table */}
        <div className="vehicle-table-container">
          <table className="vehicle-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Mileage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.vehicleId}
                  className={selectedVehicleId === vehicle.vehicleId ? "selected" : ""}
                  onClick={() => setSelectedVehicleId(vehicle.vehicleId)}
                >
                  <td>{vehicle.vehicleId}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.mileage.toLocaleString()} mi</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(vehicle.status) }}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        {selectedVehicle && (
          <div className="detail-panel">
            <h2>Vehicle Details: {selectedVehicle.vehicleId}</h2>

            {/* Warning for overdue maintenance */}
            {daysSinceService !== null && daysSinceService > 90 && (
              <div className="warning">
                ⚠️ Maintenance overdue! Last service was {daysSinceService} days ago.
              </div>
            )}

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
            <h3>Maintenance History</h3>
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
        )}
      </main>
    </div>
  );
}

export default App;
