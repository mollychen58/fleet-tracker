# Fleet Maintenance Tracker - Architecture Documentation

## System Overview

The Fleet Maintenance Tracker is a React-based web application built with TypeScript and Vite, following a clean 3-tier architecture pattern that simulates a Foundry Ontology SDK structure.

## Architecture Layers

### 1. Presentation Layer (UI Components)

#### Main Application (`src/App.tsx`)
- **State Management**: Uses React useState hooks for:
  - Search query and status filters
  - Selected vehicle tracking
  - Form state (maintenance scheduling)
  - View mode (table vs. cards)
  - Success/error messages

- **Features**:
  - Dual view modes (Table/Card)
  - Real-time search and filtering
  - Inline detail panels
  - Form validation feedback
  - Responsive design

#### Reusable Component (`src/components/VehicleHealthCard.tsx`)
- **Props**: Takes a Vehicle object
- **Displays**:
  - Health status badge (Healthy/Needs Service/Out of Service/Retired)
  - Vehicle details (make, model, year, mileage)
  - Days since last service with warning indicators
- **Used in**: Card view grid layout

### 2. Service Layer (Business Logic)

#### Ontology Service (`src/services/ontologyService.ts`)

**Query Operations (Read)**:
- `getVehicles(filters?)` - Fetch all/filtered vehicles
- `getVehicleById(id)` - Fetch single vehicle
- `searchVehicles(query)` - Search by vehicle ID or driver name
- `getDriverForVehicle(vehicleId)` - Resolve vehicle-to-driver link
- `getMaintenanceForVehicle(vehicleId)` - Resolve vehicle-to-maintenance link
- `getFleetMetrics()` - Aggregate statistics
- `getDaysSinceLastService(vehicleId)` - Computed value (filters past dates only)

**Mutation Operations (Write)**:
- `scheduleMaintenance(params)` - Create new maintenance record
- `updateVehicleStatus(params)` - Update vehicle status
- `resetData()` - Reset to initial state

**Built-in Validation**:
- Service dates must be in the future
- Cannot schedule maintenance for retired vehicles
- Cannot reactivate retired vehicles
- All validation returns `{success: boolean, error?: string}`

### 3. Data Layer (Mock Data)

#### Data Files
- **`src/data/vehicles.ts`**: 19 vehicles with properties (id, make, model, year, mileage, status, driverId)
- **`src/data/drivers.ts`**: 15 drivers with validation (hireDate must be ≤ today)
- **`src/data/maintenanceRecords.ts`**: 27 maintenance records
- **In-memory storage**: Simulates a live database with mutable state

#### Data Relationships
```
Vehicle (1) ──→ (1) Driver      [Many-to-One Link via driverId]
Vehicle (1) ──→ (*) MaintenanceRecord  [One-to-Many Link via vehicleId]
```

### 4. Type Definitions Layer

#### Type System (`src/types/index.ts`)

**Object Types**:
- `Vehicle` - Fleet vehicle entity
- `MaintenanceRecord` - Service history entity
- `Driver` - Driver entity
- `VehicleStatus` - Type union ("Active" | "Out of Service" | "Retired")

**Action Parameter Types**:
- `ScheduleMaintenanceParams` - Maintenance form data
- `UpdateVehicleStatusParams` - Status update data

### 5. Styling Layer

#### CSS Architecture (`src/App.css`)
- Component-specific styles (metrics, tables, badges)
- Utility classes (buttons, forms, messages)
- Layout classes (grids, containers)
- State-based styles (selected, hover, no-service-row)

## Data Flow

### Read Flow
```
User Action → Component State → Service Layer → Data Layer → Return Data → Update UI
```

### Write Flow
```
User Submit → Validation → Service Mutation → Update Data Store → Re-render → Success/Error Feedback
```

## Key Features Implementation

### 1. Search & Filter
- **Input**: User types in search box or selects status filter
- **Process**: `searchVehicles()` or `getVehicles(filter)`
- **Output**: Filtered vehicle list

### 2. Vehicle Selection
- **Input**: User clicks vehicle row
- **Process**: Set `selectedVehicleId` state
- **Output**: Inline detail panel with driver info and maintenance history

### 3. Schedule Maintenance
- **Input**: User fills form and submits
- **Process**: `scheduleMaintenance()` → Validation → Create record
- **Output**: Success message, table refresh, form closes

### 4. Update Vehicle Status
- **Input**: User selects new status from dropdown
- **Process**: `updateVehicleStatus()` → Validation → Update vehicle
- **Output**: Success message, UI updates

### 5. Reset Data
- **Input**: User clicks "Reset Data" button
- **Process**: `resetData()` → Clear stores → Reset state
- **Output**: Application returns to initial state

### 6. View Toggle
- **Input**: User clicks Table/Card view button
- **Process**: Set `viewMode` state
- **Output**: Conditional rendering of table or card grid

## Technical Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.1.11
- **Styling**: CSS (no framework)
- **State Management**: React useState (no external library)

## Project Structure

```
fleet-tracker/
├── src/
│   ├── components/
│   │   └── VehicleHealthCard.tsx    # Reusable health card component
│   ├── data/
│   │   ├── vehicles.ts              # Vehicle mock data
│   │   ├── drivers.ts               # Driver mock data (with validation)
│   │   └── maintenanceRecords.ts    # Maintenance mock data
│   ├── services/
│   │   └── ontologyService.ts       # Business logic & data access
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── App.tsx                      # Main application component
│   ├── App.css                      # Application styles
│   └── main.tsx                     # Application entry point
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite config
├── INSTRUCTIONS.md                  # Project requirements
├── CONCEPTS.md                      # Foundry concepts mapping
└── ARCHITECTURE.md                  # This file
```

## Design Patterns

1. **Component Composition**: Reusable VehicleHealthCard component
2. **Service Layer Pattern**: Business logic separated from UI
3. **Repository Pattern**: Data access abstracted through service functions
4. **Validation Pattern**: Centralized validation in service layer
5. **State Management**: Unidirectional data flow with React hooks

## Validation Rules

### Maintenance Scheduling
- ✅ Service date must be in the future
- ✅ Service type is required
- ✅ Cannot schedule for retired vehicles

### Status Updates
- ✅ Cannot reactivate retired vehicles
- ✅ Status changes reflected immediately

### Driver Data
- ✅ Hire date cannot be in the future (validated on load)

## Special Features

1. **Inline Detail Panel**: Detail panel appears directly below selected row (better UX than separate section)
2. **Dual View Modes**: Toggle between table and card views
3. **Smart Service Calculation**: "Days Since Last Service" only counts completed (past) services
4. **Visual Indicators**: Gray background for vehicles with no service history, red warnings for overdue maintenance
5. **Realistic Data**: State-prefixed license numbers, varied hire dates
6. **Real-time Updates**: All actions update UI immediately without page refresh

## Future Enhancement Opportunities

- Add pagination for large vehicle lists
- Implement sorting on table columns
- Add export functionality (CSV/PDF)
- Include data visualization (charts/graphs)
- Add user authentication and roles
- Implement real backend API integration
- Add offline support with service workers
