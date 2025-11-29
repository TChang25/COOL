# User Location Access API

The User Location Access API manages the relationships between users and physical locations in the system. It allows administrators to assign or revoke access for users to specific locations using composite keys (`userId` and `locationId`). This ensures that only authorized users can interact with or view data for particular sites.

These endpoints are primarily intended for administrative use, supporting the management of user permissions and access control across locations. All interactions are performed via the `/api/user-locations-access` endpoints.

Regular users will not interact with these endpoints directly, but their access to locations within the application is determined by the data managed here.

---

## Create User-Location Access
This function allows an admin to create a new user-location access link.
```
POST /api/user-locations-access
```
**Request Body:**
```json
{
  "userId": integer,
  "locationId": integer
}
```
**Required fields:**
- userId
- locationId

**Example Request:**
```json
{
  "userId": 1,
  "locationId": 1
}
```
**Response:**
```json
201 Created
{
  "appUser": { /* user fields */ },
  "location": { /* location fields */ }
}
```
**Error Responses:**
```json
400 Bad Request
{
  "error": "Both userId and locationId are required."
}
```
```json
400 Bad Request
{
  "error": "Invalid User ID."
}
```
```json
400 Bad Request
{
  "error": "Invalid Location ID."
}
```
```json
409 Conflict
{
  "error": "Access link already exists for this user and location."
}
```

---

## Get All User-Location Access Links
This function allows an admin to retrieve all user-location access links.
```
GET /api/user-locations-access
```
**Response:**
```json
200 OK
[
  {
    "appUser": { /* user fields */ },
    "location": { /* location fields */ }
  }
]
```

---

## Get Specific User-Location Access
This function allows an admin to retrieve a specific user-location access link by user and location ID.
```
GET /api/user-locations-access/{userId}/{locationId}
```
**Response:**
```json
200 OK
{
  "appUser": { /* user fields */ },
  "location": { /* location fields */ }
}
```
**Error Response:**
```json
404 Not Found
{
  "error": "User-location access not found for User ID {userId} and Location ID {locationId}"
}
```

---

## Update User-Location Access
This function allows an admin to update an existing user-location access link.
```
PUT /api/user-locations-access/{userId}/{locationId}
```
**Request Body:**
```json
{
  "newUserId": integer,
  "newLocationId": integer
}
```
**At least one of these fields is required:**
- newUserId (number)
- newLocationId (number)

**Example Request:**
```json
{
  "newUserId": 2,
  "newLocationId": 3
}
```
**Response:**
```json
200 OK
{
  "appUser": { /* updated user fields */ },
  "location": { /* updated location fields */ }
}
```
**Error Responses:**
```json
404 Not Found
{
  "error": "UserLocationAccess not found."
}
```
```json
400 Bad Request
{
  "error": "Invalid new User ID."
}
```
```json
400 Bad Request
{
  "error": "Invalid new Location ID."
}
```

---

## Delete User-Location Access
This function allows an admin to delete a user-location access link.
```
DELETE /api/user-locations-access/{userId}/{locationId}
```
**Response:**
- Status: 204 No Content (on success, no content returned)

**Error Response:**
```json
404 Not Found
{
  "error": "User-location access not found for User ID {userId} and Location ID {locationId}"
}
```