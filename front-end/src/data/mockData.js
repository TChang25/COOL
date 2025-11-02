// ========================================
// MOCK DATA for COOL: City of Orlando Loaners
// Simplified & relational version
// ========================================

export const roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Employee" },
  { id: 3, name: "Citizen" },
];

// ---------------------------
// USERS (Admins + Employees + Citizens)
// ---------------------------
export const users = [
  // Admins
  {
    id: 1,
    name: "Dev Admin",
    email: "dev@workemail.com",
    password: "admin123",
    roleId: 1,
  },
  {
    id: 2,
    name: "Mgr Admin",
    email: "admin@workemail.com",
    password: "admin123",
    roleId: 1,
  },

  // Employees
  {
    id: 3,
    name: "Employee One",
    email: "emp1@workemail.com",
    password: "employee123",
    roleId: 2,
    center: "Engelwood Neighborhood Center",
    status: "Active",
  },
  {
    id: 4,
    name: "Employee Two",
    email: "emp2@workemail.com",
    password: "employee123",
    roleId: 2,
    center: "Wadeview Neighborhood Center",
    status: "Active",
  },

  // Citizens
  {
    id: 5,
    name: "Alex Martinez",
    email: "alex.martinez@personalemail.com",
    password: "citizen123",
    roleId: 3,
  },
  {
    id: 6,
    name: "Jamie Nguyen",
    email: "jamie.nguyen@personalemail.com",
    password: "citizen123",
    roleId: 3,
  },
  {
    id: 7,
    name: "Taylor Johnson",
    email: "taylor.johnson@personalemail.com",
    password: "citizen123",
    roleId: 3,
  },
];

// ---------------------------
// LOCATIONS
// ---------------------------
// export const locations = [
//   "Callahan Neighborhood Center",
//   "Engelwood Neighborhood Center",
//   "Jackson Neighborhood Center",
//   "Wadeview Neighborhood Center",
//   "Smith Neighborhood Center",
// ];

// ---------------------------
// LOCATIONS WITH DETAILS
// ---------------------------
export const centers = [
  {
    id: "callahan",
    name: "Callahan Neighborhood Center",
    address: "101 N Parramore Ave, Orlando, FL 32801",
    phone: "(407) 246-4447",
    hours: "Mon-Fri 9am-5pm",
    coords: { lat: 28.545, lng: -81.389 },
  },
  {
    id: "engelwood",
    name: "Engelwood Neighborhood Center",
    address: "6123 LaCosta Dr, Orlando, FL 32807",
    phone: "(407) 246-4447",
    hours: "Mon-Fri 9am-5pm",
    coords: { lat: 28.538, lng: -81.305 },
  },
  {
    id: "jackson",
    name: "Jackson Neighborhood Center",
    address: "1002 Carter St, Orlando, FL 32805",
    phone: "(407) 246-4447",
    hours: "Mon-Fri 9am-5pm",
    coords: { lat: 28.531, lng: -81.391 },
  },
  {
    id: "wadeview",
    name: "Wadeview Neighborhood Center",
    address: "2177 S Summerlin Ave, Orlando, FL 32806",
    phone: "(407) 246-4468",
    hours: "Mon-Fri 9am-5pm",
    coords: { lat: 28.518, lng: -81.368 },
  },
  {
    id: "smith",
    name: "Smith Neighborhood Center",
    address: "1723 Bruton Blvd, Orlando, FL 32805",
    phone: "(407) 246-4459",
    hours: "Mon-Fri 9am-5pm",
    coords: { lat: 28.514, lng: -81.417 },
  },
];

// ---------------------------
// DEVICES
// ---------------------------
export const devices = [
  {
    id: 1,
    name: "Lenovo Tablet Series A",
    type: "Tablet",
    serial: "TAB-001",
    status: "Available",
    location: "Callahan Neighborhood Center",
  },
  {
    id: 2,
    name: "Dell Laptop Series A",
    type: "Laptop",
    serial: "LAP-001",
    status: "Available",
    location: "Callahan Neighborhood Center",
  },
  {
    id: 3,
    name: "Lenovo Tablet Series B",
    type: "Tablet",
    serial: "TAB-002",
    status: "Available",
    location: "Engelwood Neighborhood Center",
  },
  {
    id: 4,
    name: "Dell Laptop Series B",
    type: "Laptop",
    serial: "LAP-002",
    status: "Maintenance",
    location: "Jackson Neighborhood Center",
  },
  {
    id: 5,
    name: "Verizon Hotspot Series A",
    type: "Hotspot",
    serial: "HOT-001",
    status: "Available",
    location: "Engelwood Neighborhood Center",
  },
  {
    id: 6,
    name: "Dell Laptop Series C",
    type: "Laptop",
    serial: "LAP-003",
    status: "Lost",
    location: "Wadeview Neighborhood Center",
  },
];

// ---------------------------
// INCIDENT LOGS
// ---------------------------
export const incidentLogs = [
  {
    date: "2025-01-12",
    resident: "Stephanie T.",
    device: "Hotspot",
    center: "Wadeview",
    issue: "Damage",
    status: "Pending",
    action: "Send Notice",
  },
  {
    date: "2025-01-23",
    resident: "Andre W.",
    device: "Hotspot",
    center: "Wadeview",
    issue: "Lost",
    status: "Pending",
    action: "Suspend",
  },
  {
    date: "2025-03-06",
    resident: "Alex S.",
    device: "Laptop",
    center: "Wadeview",
    issue: "Damage",
    status: "Resolved",
    action: "Send Notice",
  },
];

// ---------------------------
// LOANS / CHECKOUTS
// ---------------------------
export const loans = [
  {
    id: 1,
    bin: "BIN-0001",
    deviceIds: [2, 5], // devices by ID (Laptop + Hotspot)
    location: "Engelwood Neighborhood Center",
    employeeId: 3, // Employee One
    citizenId: 5, // Alex Martinez
    dueDate: "2025-11-10",
    status: "Open",
  },
];

// ---------------------------
// FRONTEND HELPERS
// ---------------------------

// 1️⃣ Mock login authentication
export const authenticateUser = (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const role = roles.find((r) => r.id === user.roleId)?.name || "Citizen";
    return { ...user, role };
  }
  return null; // invalid login
};

// 2️⃣ Filter devices by location
export const getDevicesByLocation = (location) => {
  if (!location) return devices;
  return devices.filter((device) => device.location === location);
};

// 3️⃣ Update device status for checkin/checkout
export const updateDeviceStatus = (deviceId, newStatus) => {
  const index = devices.findIndex((d) => d.id === deviceId);
  if (index !== -1) {
    devices[index].status = newStatus;
  }
  return [...devices];
};

// 4️⃣ Compute device inventory summary dynamically
export const getDeviceInventorySummary = () => {
  const summary = {};

  devices.forEach((device) => {
    const center = device.location;
    if (!summary[center]) {
      summary[center] = { laptops: 0, tablets: 0, hotspots: 0 };
    }

    if (device.type === "Laptop") summary[center].laptops++;
    if (device.type === "Tablet") summary[center].tablets++;
    if (device.type === "Hotspot") summary[center].hotspots++;
  });

  return Object.entries(summary).map(([center, counts]) => ({
    center,
    ...counts,
  }));
};
