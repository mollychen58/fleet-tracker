import { VehicleStatus } from "@/types";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: VehicleStatus | "All";
  onStatusFilterChange: (status: VehicleStatus | "All") => void;
  viewMode: "table" | "cards";
  onViewModeChange: (mode: "table" | "cards") => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by vehicle ID or driver name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <label htmlFor="status-filter">Filter by Status:</label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as VehicleStatus | "All")}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Out of Service">Out of Service</option>
        <option value="Retired">Retired</option>
      </select>
      <div className="view-toggle-buttons">
        <button
          className={`btn ${viewMode === "table" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => onViewModeChange("table")}
        >
          Table View
        </button>
        <button
          className={`btn ${viewMode === "cards" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => onViewModeChange("cards")}
        >
          Card View
        </button>
      </div>
    </div>
  );
}
