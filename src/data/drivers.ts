import { Driver } from "@/types";

// Validation: Ensure all hire dates are not in the future
const validateDrivers = (drivers: Driver[]): Driver[] => {
  const today = new Date();
  drivers.forEach(driver => {
    const hireDate = new Date(driver.hireDate);
    if (hireDate > today) {
      console.error(`Invalid hire date for ${driver.fullName}: ${driver.hireDate} is in the future`);
      throw new Error(`Hire date cannot be in the future: ${driver.fullName} (${driver.hireDate})`);
    }
  });
  return drivers;
};

export const drivers: Driver[] = validateDrivers([
  { driverId: "D-001", fullName: "Jamie Collins", licenseNumber: "CA-D891234", licenseExpiry: "2027-03-15", hireDate: "2019-05-12", phone: "555-0142" },
  { driverId: "D-002", fullName: "Morgan Chen", licenseNumber: "NY-742856-C", licenseExpiry: "2026-11-30", hireDate: "2020-08-23", phone: "555-0218" },
  { driverId: "D-003", fullName: "Taylor Brooks", licenseNumber: "TX-56382947", licenseExpiry: "2027-06-22", hireDate: "2018-03-15", phone: "555-0331" },
  { driverId: "D-004", fullName: "Riley Nguyen", licenseNumber: "FL-N937-482-91", licenseExpiry: "2026-09-10", hireDate: "2017-11-08", phone: "555-0447" },
  { driverId: "D-005", fullName: "Jordan Patel", licenseNumber: "IL-1245-6937", licenseExpiry: "2028-01-18", hireDate: "2021-02-19", phone: "555-0553" },
  { driverId: "D-006", fullName: "Casey Martinez", licenseNumber: "AZ-D06857431", licenseExpiry: "2027-08-05", hireDate: "2019-09-30", phone: "555-0669" },
  { driverId: "D-007", fullName: "Avery Thompson", licenseNumber: "WA-THOMPA392JT", licenseExpiry: "2026-12-01", hireDate: "2020-06-14", phone: "555-0774" },
  { driverId: "D-008", fullName: "Quinn O'Brien", licenseNumber: "MA-S84729516", licenseExpiry: "2027-04-28", hireDate: "2019-01-22", phone: "555-0882" },
  { driverId: "D-009", fullName: "Reese Kowalski", licenseNumber: "MI-K523-941-782", licenseExpiry: "2028-02-14", hireDate: "2022-03-10", phone: "555-0993" },
  { driverId: "D-010", fullName: "Drew Flanagan", licenseNumber: "GA-476128395", licenseExpiry: "2026-07-19", hireDate: "2016-12-05", phone: "555-1104" },
  { driverId: "D-011", fullName: "Sage Williams", licenseNumber: "OR-698234W", licenseExpiry: "2027-10-11", hireDate: "2021-07-18", phone: "555-1215" },
  { driverId: "D-012", fullName: "Parker Davis", licenseNumber: "CO-314-876-529", licenseExpiry: "2027-05-30", hireDate: "2020-10-25", phone: "555-1326" },
  { driverId: "D-013", fullName: "Hayden Lee", licenseNumber: "NC-8925471HL", licenseExpiry: "2026-08-25", hireDate: "2019-04-07", phone: "555-1437" },
  { driverId: "D-014", fullName: "Blake Suzuki", licenseNumber: "NV-735291842", licenseExpiry: "2028-03-07", hireDate: "2023-01-15", phone: "555-1548" },
  { driverId: "D-015", fullName: "Finley Harper", licenseNumber: "PA-45682319F", licenseExpiry: "2027-01-22", hireDate: "2018-08-29", phone: "555-1659" },
]);
