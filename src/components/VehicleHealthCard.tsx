import { Vehicle } from "@/types";
import { getDaysSinceLastService } from "../services/ontologyService";
import "../App.css";

interface VehicleHealthCardProps {
  vehicle: Vehicle;
}

export function VehicleHealthCard({ vehicle }: VehicleHealthCardProps) {
  const daysSinceService = getDaysSinceLastService(vehicle.vehicleId);
  const isOverdue = daysSinceService !== null && daysSinceService > 90;

  const getStatusColor = (status: Vehicle["status"]): string => {
    switch (status) {
      case "Active": return "#22c55e";
      case "Out of Service": return "#eab308";
      case "Retired": return "#ef4444";
      default: return "#94a3b8";
    }
  };

  const getHealthStatus = (): { label: string; color: string } => {
    if (vehicle.status === "Retired") {
      return { label: "Retired", color: "#94a3b8" };
    }
    if (vehicle.status === "Out of Service") {
      return { label: "Out of Service", color: "#eab308" };
    }
    if (isOverdue) {
      return { label: "Needs Service", color: "#ef4444" };
    }
    return { label: "Healthy", color: "#22c55e" };
  };

  const health = getHealthStatus();

  return (
    <div className="vehicle-health-card">
      <div className="health-card-header">
        <h3>{vehicle.vehicleId}</h3>
        <span
          className="health-badge"
          style={{ borderLeftColor: health.color }}
        >
          {health.label}
        </span>
      </div>

      <div className="health-card-details">
        <div className="health-detail-item">
          <span className="health-label">Vehicle</span>
          <span className="health-value">{vehicle.year} {vehicle.make} {vehicle.model}</span>
        </div>

        <div className="health-detail-item">
          <span className="health-label">Mileage</span>
          <span className="health-value">{vehicle.mileage.toLocaleString()} mi</span>
        </div>

        <div className="health-detail-item">
          <span className="health-label">Status</span>
          <span
            className="status-badge"
            style={{ backgroundColor: getStatusColor(vehicle.status) }}
          >
            {vehicle.status}
          </span>
        </div>

        <div className="health-detail-item">
          <span className="health-label">Last Service</span>
          <span className="health-value" style={{ color: isOverdue ? "#ef4444" : "inherit" }}>
            {daysSinceService !== null ? `${daysSinceService} days ago` : "No history"}
            {isOverdue && " ⚠️"}
          </span>
        </div>
      </div>
    </div>
  );
}
