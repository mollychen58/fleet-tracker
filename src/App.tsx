import { useState } from "react";
import "./App.css";

/**
 * =============================================================================
 * FLEET MAINTENANCE TRACKER — STARTER SHELL
 * =============================================================================
 *
 * YOUR TASKS:
 *
 * Phase 1: Layout & Data Display
 *   1. Build a Vehicle table using getVehicles()
 *   2. Add summary metric cards using getFleetMetrics()
 *   3. Add a status filter dropdown
 *
 * Phase 2: Selection & Linked Data
 *   4. Click a row → show detail panel with linked Driver & MaintenanceRecords
 *   5. Compute and display "Days Since Last Service" with a warning if > 90
 *
 * Phase 3: Actions & Mutations
 *   6. Add a "Schedule Maintenance" form (calls scheduleMaintenance())
 *   7. Add a "Update Status" control (calls updateVehicleStatus())
 *   8. Add validation feedback
 *
 * Phase 4: Stretch Goals
 *   9.  Extract a reusable <VehicleHealthCard /> component
 *   10. Add a computed "Days Since Last Service" column to the main table
 *   11. Add a search bar using searchVehicles()
 *
 * HINTS:
 * - Import functions from "../services/ontologyService"
 * - Check CONCEPTS.md to understand how your code maps to Foundry
 * - Start with Phase 1 and work your way through
 * =============================================================================
 */

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🚚 Fleet Maintenance Tracker</h1>
        <p className="subtitle">
          Manage your fleet's health, track maintenance, and take action.
        </p>
      </header>

      <main className="app-main">
        {/* 
          PHASE 1: Start here!
          
          TODO: Add <MetricCards /> component
          TODO: Add <FilterBar /> component
          TODO: Add <VehicleTable /> component
        */}
        <div className="placeholder-card">
          <h2>👋 Getting Started</h2>
          <p>
            Open <code>src/App.tsx</code> and start building! Check{" "}
            <code>INSTRUCTIONS.md</code> for your task list.
          </p>
          <p>
            Import data from <code>src/services/ontologyService.ts</code> to get started.
          </p>
        </div>

        {/*
          PHASE 2: Add detail panel here
          
          TODO: Add <VehicleDetailPanel /> component (shown when a vehicle is selected)
        */}
      </main>
    </div>
  );
}

export default App;
