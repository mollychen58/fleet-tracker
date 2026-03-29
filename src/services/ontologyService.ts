// =============================================================================
// ONTOLOGY SERVICE
// This module simulates an Ontology SDK (SDKS). In a real Foundry application,
// you would import from @code/client and query live Ontology data.
//
// KEY CONCEPTS:
// - getVehicles()                → Fetching an Object Set (with optional filters)
// - getVehicleById()             → Fetching a single Object by primary key
// - getMaintenanceForVehicle()   → Resolving a Link (Vehicle → MaintenanceRecord)
// - getDriverForVehicle()        → Resolving a Link (Vehicle → Driver)
// - scheduleMaintenance()        → Executing an Action Type
// - updateVehicleStatus()        → Executing an Action Type
// =============================================================================

import { vehicles as vehicleData } from "../data/vehicles";
import { maintenanceRecords as maintenanceData } from "../data/maintenanceRecords";
import { drivers as driverData } from "../data/drivers";
import {
  Vehicle,
  VehicleStatus,
  MaintenanceRecord,
  Driver,
  ScheduleMaintenanceParams,
  UpdateVehicleStatusParams,
} from "@/types";

// ---------------------------------------------------------------------------
// In-memory store (simulates a live database)
// ---------------------------------------------------------------------------
let vehicleStore: Vehicle[] = JSON.parse(JSON.stringify(vehicleData));
let maintenanceStore: MaintenanceRecord[] = JSON.parse(JSON.stringify(maintenanceData));
const driverStore: Driver[] = JSON.parse(JSON.stringify(driverData));

// ---------------------------------------------------------------------------
// OBJECT SET QUERIES
// ---------------------------------------------------------------------------

/**
 * Fetch all vehicles, optionally filtered by status.
 * In Foundry, this is equivalent to loading an Object Set with filters applied.
 */
export function getVehicles(filters?: { status?: VehicleStatus }): Vehicle[] {
  let results = [...vehicleStore];
  if (filters?.status) {
    results = results.filter((v) => v.status === filters.status);
  }
  return results;
}

/**
 * Fetch a single vehicle by its primary key.
 */
export function getVehicleById(vehicleId: string): Vehicle | undefined {
  return vehicleStore.find((v) => v.vehicleId === vehicleId);
}

/**
 * Search vehicles by ID or driver name.
 * In Foundry, this maps to Object Search with a search-around on linked objects.
 */
export function searchVehicles(query: string): Vehicle[] {
  const lowerQuery = query.toLowerCase();
  return vehicleStore.filter((v) => {
    if (v.vehicleId.toLowerCase().includes(lowerQuery)) return true;
    const driver = getDriverForVehicle(v.vehicleId);
    return !!(driver && driver.fullName.toLowerCase().includes(lowerQuery));
  });
}

// ---------------------------------------------------------------------------
// LINK RESOLUTION
// ---------------------------------------------------------------------------

/**
 * Get all maintenance records linked to a vehicle.
 * In Foundry, this resolves a One-to-Many link: Vehicle → MaintenanceRecord.
 * Results are sorted by date descending (most recent first).
 */
export function getMaintenanceForVehicle(vehicleId: string): MaintenanceRecord[] {
  return maintenanceStore
    .filter((r) => r.vehicleId === vehicleId)
    .sort((a, b) => new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime());
}

/**
 * Get the driver assigned to a vehicle.
 * In Foundry, this resolves a Many-to-One link: Vehicle → Driver.
 */
export function getDriverForVehicle(vehicleId: string): Driver | undefined {
  const vehicle = vehicleStore.find((v) => v.vehicleId === vehicleId);
  if (!vehicle) return undefined;
  return driverStore.find((d) => d.driverId === vehicle.driverId);
}

// ---------------------------------------------------------------------------
// COMPUTED VALUES (simulates Function-backed columns)
// ---------------------------------------------------------------------------

/**
 * Calculate days since the vehicle's last maintenance.
 * In Foundry, this would be a Function-backed column — a server-side function
 * that computes a derived value for each object on the fly.
 * Only considers past maintenance dates (scheduled future maintenance doesn't count).
 */
export function getDaysSinceLastService(vehicleId: string): number | null {
  const records = getMaintenanceForVehicle(vehicleId);
  if (records.length === 0) return null;

  // Filter to only past service dates
  const today = new Date();
  const pastRecords = records.filter(r => new Date(r.serviceDate) <= today);

  if (pastRecords.length === 0) return null;

  // @ts-ignore
  const lastDate = new Date(pastRecords[0].serviceDate);
  const diffMs = today.getTime() - lastDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

// ---------------------------------------------------------------------------
// AGGREGATE QUERIES
// ---------------------------------------------------------------------------

/**
 * Get summary metrics for the fleet.
 */
export function getFleetMetrics(): {
  totalVehicles: number;
  activeVehicles: number;
  outOfServiceVehicles: number;
  retiredVehicles: number;
  totalMaintenanceCost: number;
  overdueVehicles: number;
} {
  const all = vehicleStore;
  const totalCost = maintenanceStore.reduce((sum, r) => sum + r.cost, 0);
  const overdueCount = all.filter((v) => {
    if (v.status === "Retired") return false;
    const days = getDaysSinceLastService(v.vehicleId);
    return days !== null && days > 90;
  }).length;

  return {
    totalVehicles: all.length,
    activeVehicles: all.filter((v) => v.status === "Active").length,
    outOfServiceVehicles: all.filter((v) => v.status === "Out of Service").length,
    retiredVehicles: all.filter((v) => v.status === "Retired").length,
    totalMaintenanceCost: totalCost,
    overdueVehicles: overdueCount,
  };
}

// ---------------------------------------------------------------------------
// ACTIONS (mutations)
// ---------------------------------------------------------------------------

/**
 * Schedule a new maintenance record for a vehicle.
 *
 * In Foundry, this is an ACTION TYPE — a defined mutation with:
 * - Parameters (what the user fills in)
 * - Validation rules (submission criteria)
 * - Side effects (the actual edit to the Ontology)
 *
 * Returns { success, error? }
 */
export function scheduleMaintenance(
  params: ScheduleMaintenanceParams
): { success: boolean; error?: string } {
  // --- Validation (Submission Criteria) ---
  const vehicle = getVehicleById(params.vehicleId);
  if (!vehicle) {
    return { success: false, error: "Vehicle not found." };
  }
  if (vehicle.status === "Retired") {
    return { success: false, error: "Cannot schedule maintenance for a retired vehicle." };
  }
  const serviceDate = new Date(params.serviceDate);
  if (serviceDate <= new Date()) {
    return { success: false, error: "Service date must be in the future." };
  }
  if (!params.serviceType.trim()) {
    return { success: false, error: "Service type is required." };
  }

  // --- Execute Edit ---
  const newRecord: MaintenanceRecord = {
    recordId: `MR-${String(maintenanceStore.length + 1).padStart(3, "0")}`,
    vehicleId: params.vehicleId,
    serviceType: params.serviceType,
    serviceDate: params.serviceDate,
    cost: 0,
    technicianName: params.technicianName || "Unassigned",
    notes: params.notes || "",
  };
  maintenanceStore = [...maintenanceStore, newRecord];

  return { success: true };
}

/**
 * Update a vehicle's status.
 *
 * In Foundry, this is an ACTION TYPE that modifies a property on an existing object.
 */
export function updateVehicleStatus(
  params: UpdateVehicleStatusParams
): { success: boolean; error?: string } {
  const index = vehicleStore.findIndex((v) => v.vehicleId === params.vehicleId);
  if (index === -1) {
    return { success: false, error: "Vehicle not found." };
  }

  // --- Validation ---
  // @ts-ignore
  const currentStatus = vehicleStore[index].status;
  if (currentStatus === "Retired" && params.newStatus !== "Retired") {
    return { success: false, error: "Cannot reactivate a retired vehicle." };
  }

  // --- Execute Edit ---
  vehicleStore = vehicleStore.map((v, i) =>
    i === index ? { ...v, status: params.newStatus } : v
  );

  return { success: true };
}

// ---------------------------------------------------------------------------
// RESET (for development/testing)
// ---------------------------------------------------------------------------

/**
 * Reset all data back to the original state.
 */
export function resetData(): void {
  vehicleStore = JSON.parse(JSON.stringify(vehicleData));
  maintenanceStore = JSON.parse(JSON.stringify(maintenanceData));
}
