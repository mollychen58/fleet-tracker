import { useState } from "react";
import "./App.css";
import { getVehicles, getFleetMetrics } from "./services/ontologyService";
import { VehicleStatus } from "./types";

function App() {
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | "All">("All");

  const vehicles = statusFilter === "All"
    ? getVehicles()
    : getVehicles({ status: statusFilter });

  const metrics = getFleetMetrics();

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
                <tr key={vehicle.vehicleId}>
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
      </main>
    </div>
  );
}

export default App;
