# Fleet Maintenance Tracker — Instructions

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Your Mission

Build a fleet management dashboard by completing the phases below. Each phase builds on the last.

### Phase 1 — Layout & Data Display
- [ ] Render summary metric cards (total vehicles, active vehicles, total maintenance cost)
- [ ] Render a table of all vehicles with columns: ID, Make, Model, Year, Mileage, Status
- [ ] Color-code the Status column (green = Active, yellow = Out of Service, red = Retired)
- [ ] Add a dropdown to filter vehicles by status

**Hint:** Import `getVehicles` and `getFleetMetrics` from `src/services/ontologyService.ts`

### Phase 2 — Selection & Linked Data
- [ ] Clicking a vehicle row selects it and shows a detail panel below the table
- [ ] The detail panel shows the vehicle's info AND its assigned Driver (linked data)
- [ ] The detail panel shows a table of the vehicle's Maintenance Records (linked data)
- [ ] Display "Days Since Last Service" and show a ⚠️ warning if > 90 days

**Hint:** Use `getDriverForVehicle`, `getMaintenanceForVehicle`, and `getDaysSinceLastService`

### Phase 3 — Actions & Mutations
- [ ] Add a "Schedule Maintenance" button that opens a form (service type, date, notes)
- [ ] On submit, call `scheduleMaintenance()` and refresh the maintenance records table
- [ ] Show validation errors returned by the service (e.g., retired vehicle, past date)
- [ ] Add a status dropdown on the detail panel that calls `updateVehicleStatus()`
- [ ] Show success/error feedback after each action

**Hint:** Both action functions return `{ success: boolean; error?: string }`

### Phase 4 — Stretch Goals
- [ ] Extract a reusable `<VehicleHealthCard />` component that takes a Vehicle as a prop
- [ ] Add a "Days Since Last Service" computed column to the main vehicle table
- [ ] Add a search bar that searches by vehicle ID or driver name using `searchVehicles()`
- [ ] Add a "Reset Data" button that calls `resetData()` for easy testing

## Key Files

| File | Purpose |
|---|---|
| `src/types/index.ts` | TypeScript interfaces (Ontology object types) |
| `src/data/*.ts` | Mock data (pre-populated objects) |
| `src/services/ontologyService.ts` | Simulated Ontology SDK — **read the comments!** |
| `src/App.tsx` | Your main application file |
| `src/App.css` | Pre-built CSS classes you can use |
| `CONCEPTS.md` | How your code maps to real Foundry concepts |

## CSS Classes Available

Check `App.css` for pre-built classes: `.metric-card`, `.data-table`, `.status-badge`, `.detail-panel`, `.warning`, `.action-form`, `.btn`, `.filter-bar`, and more.
