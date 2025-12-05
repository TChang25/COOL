# Location API

The Location API manages all physical site data within the system. It provides full CRUD (Create, Read, Update, Delete) functionality for handling location records, allowing the system to store and retrieve important information such as address, city, state, and contact details for each site.

These endpoints serve as the foundation for connecting users, devices, and activities to specific physical locations. This API is primarily intended for administrative and system-level operations. Employees or system administrators will use it to register new locations, update existing details, or remove outdated entries. Regular users will typically only see this information displayed through the application interface rather than modify it directly.

All interactions with locations are performed via the `/api/locations` endpoints.

---

## Create a New Location
This function allows an authorized user to create a new location record in the system.
```
POST /api/locations
```
**Request Body:**
```json
{
  "locationName": string,
  "streetAddress": string,
  "city": string,
  "state": string,
  "zipCode": string,
  "contactNumber": string
}
```
**Required fields:**
- locationName (string)

**Example Request:**
```json
{
  "locationName": "Downtown Recreation Center",
  "streetAddress": "500 S Orange Ave",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "407-555-1234"
}
```
**Response:**
```json
201 Created
{
  "locationId": 17,
  "locationName": "Downtown Recreation Center",
  "streetAddress": "500 S Orange Ave",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "407-555-1234",
  "createdAt": "2025-11-27T06:37:17.152599",
  "updatedAt": "2025-11-27T06:37:17.152599"
}
```
**Error Responses:**
```json
400 Bad Request
{
  "error": "Location name is required"
}
```

---

## Retrieve All Locations
This function allows an authorized user to retrieve every location record in the system.
```
GET /api/locations
```
**Response:**
```json
200 OK
[
  {
    "locationId": 1,
    "locationName": "Callahan Neighborhood Center",
    "streetAddress": "101 N. Parramore Ave Ste. 1713",
    "city": "Orlando",
    "state": "FL",
    "zipCode": "32801",
    "contactNumber": "407-246-4442",
    "createdAt": "2025-10-15T20:06:03.000+00:00",
    "updatedAt": "2025-10-15T20:06:03.000+00:00"
  }
  // more locations...
]
```

---

## Retrieve a Specific Location
This function allows an authorized user to retrieve a specific location record by its ID.
```
GET /api/locations/{id}
```
**Response:**
```json
200 OK
{
  "locationId": 17,
  "locationName": "Downtown Recreation Center",
  "streetAddress": "500 S Orange Ave",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "407-555-1234",
  "createdAt": "2025-11-27T06:37:17.152599",
  "updatedAt": "2025-11-27T06:37:17.152599"
}
```
**Error Response:**
```json
404 Not Found
{
  "error": "Location not found with ID {id}"
}
```

---

## Update an Existing Location
This function allows an authorized user to update an existing location record.
```
PUT /api/locations/{id}
```
**Request Body:**
```json
{
  "locationName": string,
  "streetAddress": string,
  "city": string,
  "state": string,
  "zipCode": string,
  "contactNumber": string
}
```
**Example Request:**
```json
{
  "locationName": "Downtown Recreation Center",
  "streetAddress": "500 S Orange Ave",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "954-555-1234"
}
```
**Response:**
```json
200 OK
{
  "locationId": 17,
  "locationName": "Downtown Recreation Center",
  "streetAddress": "500 S Orange Ave",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "954-555-1234",
  "createdAt": "2025-11-25T06:37:17",
  "updatedAt": "2025-11-25T06:47:17"
}
```
**Error Response:**
```json
404 Not Found
{
  "error": "Location not found with id {id}"
}
```

---

## Remove a Location
This function allows an authorized user to delete a location record from the system.
```
DELETE /api/locations/{id}
```
**Response:**
- Status: 204 No Content (on success, no content returned)

**Error Response:**
```json
404 Not Found
{
  "error": "Location not found with ID {id}"
}
```