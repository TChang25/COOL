# Device API

The device CRUD is made for the purpose of managing devices in the overall system. It allows for the system to perform all basic functions towards device objects, each containing a type and status alongside an ID so the system can differentiate each one. Most of it is not supposed to be accessed by average users, only employees will have direct access to manage the device database directly.

### Background Information

The device objects have three parts to them, an ID, a status, and a type. The ID is there so that the system can differentiate between each device, it is the only unique part of each device. Conversely status is used to determine whether the device can be loaned out, isn’t able to be loaned out, or already loaned out. And type is used to describe what the device is, but unlike ID can be the same as any other device and is not used outside of information. Users will not directly be able to affect any of these, with ID and type being locked behind the system not for them to touch, the only one they will be able to affect indirectly is status, being able to change the status of them by withdrawing or returning.

The main interactions will be done through a GUI, it will feature all devices in the device database, detailing their ID, status, and type. The actions users can take change depending on the status of the device.

If the status is available there will be a button that allows them to take out a device, setting the status to lent out. If the status is unavailable or lent out, the button will not allow for it to be taken out.

Additionally full CRUD functionality has been programmed, allowing for more direct modifications of the status and type if needed.

---

## Read Devices
This function returns all devices in the database.
```
GET /api/devices
```
**Response:**
```json
200 OK
[
  {
    "deviceId": 0,
    "deviceName": "string",
    "serialNumber": "string",
    "status": {
      "deviceStatusId": 1,
      "statusName": "active"
    },
    "type": {
      "deviceTypeId": 1,
      "typeName": "basic"
    },
    "location": {
      "locationId": 1,
      "locationName": "Main Office"
    },
    "createdBy": {
      "userId": 1,
      "email": "admin@example.com"
    }
  }
  // ... more devices
]
```
**Error Response:**
```json
500 Internal Server Error
{
  "error": "Internal Server Error"
}
```

---

## Read Device by ID
Returns a single device by its ID.
```
GET /api/devices/{id}
```
**Response:**
```json
200 OK
{
  "deviceId": 0,
  "deviceName": "string",
  "serialNumber": "string",
  "status": {
    "deviceStatusId": 1,
    "statusName": "active"
  },
  "type": {
    "deviceTypeId": 1,
    "typeName": "basic"
  },
  "location": {
    "locationId": 1,
    "locationName": "Main Office"
  },
  "createdBy": {
    "userId": 1,
    "email": "admin@example.com"
  }
}
```
**Error Response:**
```json
404 Not Found
{
  "error": "Device not found with ID {id}"
}
```

---

## Create Device
Adds a device to the database.
```
POST /api/devices
```
**Request Body:**
```json
{
  "deviceName": string,
  "serialNumber": string,
  "status": {
    "deviceStatusId": integer
  },
  "type": {
    "deviceTypeId": integer
  },
  "location": {
    "locationId": integer
  },
  "createdBy": {
    "userId": integer
  }
}
```
**Required fields:**
- deviceName
- serialNumber
- status.deviceStatusId
- type.deviceTypeId
- location.locationId
- createdBy.userId

**Example Request:**
```json
{
  "deviceName": "Laptop 1",
  "serialNumber": "SN123456",
  "status": {
    "deviceStatusId": 2
  },
  "type": {
    "deviceTypeId": 3
  },
  "location": {
    "locationId": 1
  },
  "createdBy": {
    "userId": 1
  }
}
```
**Response:**
```json
201 Created
{
  "deviceId": 252,
  "deviceName": "Laptop 1",
  "serialNumber": "SN123456",
  "status": {
    "deviceStatusId": 2,
    "statusName": "Lent"
  },
  "type": {
    "deviceTypeId": 3,
    "typeName": "Laptop"
  },
  "location": {
    "locationId": 1,
    "locationName": "Main Office"
  },
  "createdBy": {
    "userId": 1,
    "email": "admin@example.com"
  }
}
```
**Error Responses:**
```json
400 Bad Request
{
  "error": "Invalid DeviceType ID"
}
```
```json
400 Bad Request
{
  "error": "Invalid DeviceStatus ID"
}
```
```json
400 Bad Request
{
  "error": "Invalid Location ID"
}
```
```json
400 Bad Request
{
  "error": "Invalid User ID"
}
```

---

## Update Device
Allows an authorized user to change a device’s type, status, name, serial number, location, or creator.
```
PUT /api/devices/{id}
```
**Request Body:**
```json
{
  "deviceName": string,
  "serialNumber": string,
  "status": {
    "deviceStatusId": integer
  },
  "type": {
    "deviceTypeId": integer
  },
  "location": {
    "locationId": integer
  },
  "createdBy": {
    "userId": integer
  }
}
```
**Example Request:**
```json
{
  "deviceName": "Phone 1",
  "serialNumber": "SN654321",
  "status": {
    "deviceStatusId": 1
  },
  "type": {
    "deviceTypeId": 2
  },
  "location": {
    "locationId": 1
  },
  "createdBy": {
    "userId": 1
  }
}
```
**Response:**
```json
200 OK
{
  "deviceId": 2,
  "deviceName": "Phone 1",
  "serialNumber": "SN654321",
  "status": {
    "deviceStatusId": 1,
    "statusName": "Ready"
  },
  "type": {
    "deviceTypeId": 2,
    "typeName": "Phone"
  },
  "location": {
    "locationId": 1,
    "locationName": "Main Office"
  },
  "createdBy": {
    "userId": 1,
    "email": "admin@example.com"
  }
}
```
**Error Responses:**
```json
400 Bad Request
{
  "error": "Invalid DeviceType ID"
}
```
```json
400 Bad Request
{
  "error": "Invalid DeviceStatus ID"
}
```
```json
400 Bad Request
{
  "error": "Invalid Location ID"
}
```
```json
400 Bad Request
{
  "error": "Invalid User ID"
}
```
```json
404 Not Found
{
  "error": "Device not found with ID {id}"
}
```

---

## Delete Device
Allows an authorized user to delete a device from the database.
```
DELETE /api/devices/{id}
```
**Response:**
- Status: 204 No Content (on success, no content returned)

**Error Response:**
```json
404 Not Found
{
  "error": "Device not found with ID {id}"
}
```
