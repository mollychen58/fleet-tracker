interface MetricCardsProps {
  totalVehicles: number;
  activeVehicles: number;
  totalMaintenanceCost: number;
}

export function MetricCards({ totalVehicles, activeVehicles, totalMaintenanceCost }: MetricCardsProps) {
  return (
    <div className="metric-cards">
      <div className="metric-card">
        <div className="metric-label">Total Vehicles</div>
        <div className="metric-value">{totalVehicles}</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Active Vehicles</div>
        <div className="metric-value">{activeVehicles}</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Total Maintenance Cost</div>
        <div className="metric-value">${totalMaintenanceCost.toLocaleString()}</div>
      </div>
    </div>
  );
}
