// =============================================================================
// ONTOLOGY TYPES
// These interfaces represent Object Types in Foundry's Ontology.
// Each interface maps to a real-world entity with typed properties.
// The primary key uniquely identifies each object.
// =============================================================================

export interface Vehicle {
  /** Primary Key */
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  status: VehicleStatus;
  /** Foreign key → Driver (this represents a Link in the Ontology) */
  driverId: string;
}

export type VehicleStatus = "Active" | "Out of Service" | "Retired";

export interface MaintenanceRecord {
  /** Primary Key */
  recordId: string;
  /** Foreign key → Vehicle (this represents a Link in the Ontology) */
  vehicleId: string;
  serviceType: string;
  serviceDate: string; // ISO date string (YYYY-MM-DD)
  cost: number;
  technicianName: string;
  notes: string;
}

export interface Driver {
  /** Primary Key */
  driverId: string;
  fullName: string;
  licenseNumber: string;
  licenseExpiry: string; // ISO date string (YYYY-MM-DD)
  hireDate: string; // ISO date string (YYYY-MM-DD)
  phone: string;
}

// =============================================================================
// ACTION PARAMETER TYPES
// These represent the parameters for Action Types in the Ontology.
// Actions are controlled mutations — users fill out parameters and submit.
// =============================================================================

export interface ScheduleMaintenanceParams {
  vehicleId: string;
  serviceType: string;
  serviceDate: string;
  technicianName?: string;
  notes?: string;
}

export interface UpdateVehicleStatusParams {
  vehicleId: string;
  newStatus: VehicleStatus;
}
