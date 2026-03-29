import { MaintenanceRecord } from "../types";

export const maintenanceRecords: MaintenanceRecord[] = [
  // V-001 — recently serviced
  { recordId: "MR-001", vehicleId: "V-001", serviceType: "Oil Change", serviceDate: "2026-03-01", cost: 85, technicianName: "Alex Ruiz", notes: "" },
  { recordId: "MR-002", vehicleId: "V-001", serviceType: "Tire Rotation", serviceDate: "2025-12-10", cost: 60, technicianName: "Alex Ruiz", notes: "Front tires showing wear" },
  { recordId: "MR-003", vehicleId: "V-001", serviceType: "Brake Inspection", serviceDate: "2025-08-15", cost: 120, technicianName: "Sam Torres", notes: "Pads at 40%" },

  // V-002 — out of service, recent repair
  { recordId: "MR-004", vehicleId: "V-002", serviceType: "Transmission Repair", serviceDate: "2026-02-20", cost: 2800, technicianName: "Sam Torres", notes: "Transmission slipping, full rebuild" },
  { recordId: "MR-005", vehicleId: "V-002", serviceType: "Oil Change", serviceDate: "2025-10-05", cost: 95, technicianName: "Alex Ruiz", notes: "" },

  // V-003 — recently serviced
  { recordId: "MR-006", vehicleId: "V-003", serviceType: "Oil Change", serviceDate: "2026-02-14", cost: 85, technicianName: "Maria Gonzalez", notes: "" },
  { recordId: "MR-007", vehicleId: "V-003", serviceType: "Battery Replacement", serviceDate: "2025-11-22", cost: 210, technicianName: "Maria Gonzalez", notes: "OEM battery" },

  // V-004 — retired, old records
  { recordId: "MR-008", vehicleId: "V-004", serviceType: "Engine Diagnostic", serviceDate: "2025-03-10", cost: 350, technicianName: "Sam Torres", notes: "Engine knock — recommended retirement" },
  { recordId: "MR-009", vehicleId: "V-004", serviceType: "Oil Change", serviceDate: "2024-12-01", cost: 85, technicianName: "Alex Ruiz", notes: "" },

  // V-005 — recently serviced
  { recordId: "MR-010", vehicleId: "V-005", serviceType: "Software Update", serviceDate: "2026-03-10", cost: 0, technicianName: "Maria Gonzalez", notes: "EV firmware v3.2.1" },
  { recordId: "MR-011", vehicleId: "V-005", serviceType: "Tire Rotation", serviceDate: "2026-01-08", cost: 60, technicianName: "Alex Ruiz", notes: "" },

  // V-006 — overdue! Last service > 90 days ago
  { recordId: "MR-012", vehicleId: "V-006", serviceType: "Oil Change", serviceDate: "2025-09-15", cost: 95, technicianName: "Sam Torres", notes: "" },
  { recordId: "MR-013", vehicleId: "V-006", serviceType: "Brake Pad Replacement", serviceDate: "2025-06-20", cost: 340, technicianName: "Sam Torres", notes: "Front and rear" },

  // V-007 — out of service
  { recordId: "MR-014", vehicleId: "V-007", serviceType: "Alternator Replacement", serviceDate: "2026-03-18", cost: 620, technicianName: "Maria Gonzalez", notes: "Awaiting part" },

  // V-008 — recently serviced
  { recordId: "MR-015", vehicleId: "V-008", serviceType: "Oil Change", serviceDate: "2026-02-28", cost: 85, technicianName: "Alex Ruiz", notes: "" },
  { recordId: "MR-016", vehicleId: "V-008", serviceType: "Windshield Replacement", serviceDate: "2025-12-03", cost: 450, technicianName: "Sam Torres", notes: "Rock chip expanded" },

  // V-009 — recently serviced
  { recordId: "MR-017", vehicleId: "V-009", serviceType: "Tire Rotation", serviceDate: "2026-03-05", cost: 60, technicianName: "Maria Gonzalez", notes: "" },

  // V-010 — retired, old records
  { recordId: "MR-018", vehicleId: "V-010", serviceType: "Oil Change", serviceDate: "2024-08-14", cost: 85, technicianName: "Alex Ruiz", notes: "Final service before retirement" },

  // V-011 — new vehicle, one service
  { recordId: "MR-019", vehicleId: "V-011", serviceType: "Initial Inspection", serviceDate: "2026-01-15", cost: 0, technicianName: "Maria Gonzalez", notes: "New vehicle intake" },

  // V-012 — overdue! Last service > 90 days ago
  { recordId: "MR-020", vehicleId: "V-012", serviceType: "Oil Change", serviceDate: "2025-08-22", cost: 85, technicianName: "Alex Ruiz", notes: "" },

  // V-013 — out of service
  { recordId: "MR-021", vehicleId: "V-013", serviceType: "Coolant Leak Repair", serviceDate: "2026-03-12", cost: 480, technicianName: "Sam Torres", notes: "Radiator hose replaced" },
  { recordId: "MR-022", vehicleId: "V-013", serviceType: "Oil Change", serviceDate: "2025-11-18", cost: 85, technicianName: "Alex Ruiz", notes: "" },

  // V-014 — new EV, one service
  { recordId: "MR-023", vehicleId: "V-014", serviceType: "Software Update", serviceDate: "2026-03-20", cost: 0, technicianName: "Maria Gonzalez", notes: "EV firmware v3.2.1" },

  // V-015 — overdue! Last service > 90 days ago
  { recordId: "MR-024", vehicleId: "V-015", serviceType: "Brake Inspection", serviceDate: "2025-07-30", cost: 120, technicianName: "Sam Torres", notes: "Pads at 25% — schedule replacement" },
  { recordId: "MR-025", vehicleId: "V-015", serviceType: "Oil Change", serviceDate: "2025-05-12", cost: 85, technicianName: "Alex Ruiz", notes: "" },

  // V-016 — recently serviced
  { recordId: "MR-026", vehicleId: "V-016", serviceType: "Oil Change", serviceDate: "2026-03-22", cost: 85, technicianName: "Alex Ruiz", notes: "" },

  // V-017 — retired
  { recordId: "MR-027", vehicleId: "V-017", serviceType: "Engine Diagnostic", serviceDate: "2025-06-01", cost: 350, technicianName: "Sam Torres", notes: "Catalytic converter failing — retired" },

  // V-018 — recently serviced
  { recordId: "MR-028", vehicleId: "V-018", serviceType: "Tire Rotation", serviceDate: "2026-03-15", cost: 60, technicianName: "Maria Gonzalez", notes: "" },
  { recordId: "MR-029", vehicleId: "V-018", serviceType: "Oil Change", serviceDate: "2026-01-20", cost: 95, technicianName: "Alex Ruiz", notes: "" },
];
