# Foundry Concepts Cheat Sheet

This project simulates how applications are built on Palantir Foundry. Here's how your code maps to real platform concepts.

## The Ontology

The Ontology is Foundry's semantic layer — it maps raw data to real-world concepts.

| Your Code | Foundry Concept | Explanation |
|---|---|---|
| `Vehicle`, `Driver`, `MaintenanceRecord` interfaces | **Object Types** | Schema definitions for real-world entities |
| `vehicleId`, `make`, `status`, etc. | **Properties** | Typed attributes on an object |
| `vehicleId` (unique) | **Primary Key** | Uniquely identifies each object |
| `vehicle.driverId → Driver` | **Link Type** (Many-to-One) | A relationship between two object types |
| `vehicle → MaintenanceRecord[]` | **Link Type** (One-to-Many) | One vehicle has many maintenance records |
| `getVehicles({ status: "Active" })` | **Object Set** with filter | A filtered collection of objects |

## Actions

Actions are controlled mutations — the way users change data in Foundry.

| Your Code | Foundry Concept | Explanation |
|---|---|---|
| `scheduleMaintenance(params)` | **Action Type** | A defined mutation with parameters |
| `ScheduleMaintenanceParams` | **Action Parameters** | What the user fills out before submitting |
| Validation checks (retired vehicle, future date) | **Submission Criteria** | Rules that must pass before an action executes |
| Creating a new `MaintenanceRecord` | **Ontology Edit** (create object) | The actual data change |
| `updateVehicleStatus(params)` | **Action Type** (edit object) | Modifying a property on an existing object |

## Functions & Computed Values

| Your Code | Foundry Concept | Explanation |
|---|---|---|
| `getDaysSinceLastService()` | **Function-backed Column** | A value computed on-the-fly per object |
| `getFleetMetrics()` | **Aggregation** | Summary statistics over an Object Set |

## Application Patterns

| Your Code | Foundry Concept | Explanation |
|---|---|---|
| Vehicle table | **Workshop Object Table** widget | Displays a list of objects |
| Click row → detail panel | **Workshop Event** (selection) | User interaction triggers UI changes |
| Status filter dropdown | **Workshop Filter Bar** | Narrows down the Object Set |
| Schedule Maintenance form | **Workshop Action Button** + form | Triggers an Action Type with user input |
| `<VehicleHealthCard />` component | **Custom Widget** (OSDK) | A reusable React component that receives objects |
| Search bar | **Object Search** | Find objects by property values |

## What Happens on Real Foundry

```
Raw Data (CSV, DB, API) → Datasets → Transforms → Clean Datasets
                                                        ↓
                                        Ontology (Objects, Links, Actions)
                                                        ↓
                                        Workshop App or OSDK React App
                                                        ↓
                                        User → Action → Ontology Edit → Writeback
```

In this project, we skip the data layer and jump straight to the Ontology simulation.
Your mock data files ARE the "clean datasets" and `ontologyService.ts` IS the "Ontology SDK."