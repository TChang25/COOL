# App User API

The App User API manages user accounts within the system. 
It provides full CRUD (Create, Read, Update, Delete) functionality for handling user records, including personal details, authentication information, and role assignments. Only authorized users can create, update, or delete user records. This API ensures proper user management and maintains a clear history of all registered users.

---

## Create User
This function allows an authorized user to create a new user record in the system.
```
POST /api/app-users
```
**Request Body:**
```json
{
  "fullName": string,
  "email": string,
  "password": string,
  "role": {
    "roleId": integer
  },
  "dlNum": string,
  "dlState": string,
  "streetAddress": string,
  "city": string,
  "state": string,
  "zipCode": string,
  "contactNumber": string,
  "dateOfBirth": localdate (YYYY-MM-DD),
  "locationAccess": [
    {
      "location": {
        "locationId": integer
      }
    }
  ]
}
```
**Required fields:**
- fullName
- email
- password
- roleId

**Example Request:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "role": {
    "roleId": 2
  },
  "dlNum": "D1234567",
  "dlState": "FL",
  "streetAddress": "123 Main St",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "407-555-1234",
  "dateOfBirth": "1990-01-01",
  "locationAccess": [
    {
      "location": {
        "locationId": 1
      }
    }
  ]
}
```
**Response:**
```json
201 Created
{
  "userId": 5,
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "role": {
    "roleId": 2,
    "roleName": "Employee"
  },
  "dlNum": "D1234567",
  "dlState": "FL",
  "streetAddress": "123 Main St",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "407-555-1234",
  "dateOfBirth": "1990-01-01",
  "createdAt": "2025-11-28T12:00:00",
  "updatedAt": "2025-11-28T12:00:00",
  "locationAccess": [
    {
      "location": {
        "locationId": 1,
        "locationName": "Downtown Recreation Center"
      }
    }
  ]
}
```
**Error Responses:**
```json
400 Bad Request
{
  "error": "User role is required"
}
```
```json
404 Not Found
{
  "error": "Role not found"
}
```
```json
404 Not Found
{
  "error": "Location not found: {locationId}"
}
```

---

## Get All Users
This function allows an authorized user to retrieve every user record in the system.
```
GET /api/app-users
```
**Response:**
```json
200 OK
[
  {
    "userId": 5,
    "fullName": "Jane Doe",
    "email": "jane.doe@example.com",
    "role": {
      "roleId": 2,
      "roleName": "Employee"
    },
    "dlNum": "D1234567",
    "dlState": "FL",
    "streetAddress": "123 Main St",
    "city": "Orlando",
    "state": "FL",
    "zipCode": "32801",
    "contactNumber": "407-555-1234",
    "dateOfBirth": "1990-01-01",
    "createdAt": "2025-11-28T12:00:00",
    "updatedAt": "2025-11-28T12:00:00",
    "locationAccess": [
      {
        "location": {
          "locationId": 1,
          "locationName": "Downtown Recreation Center"
        }
      }
    ]
  }
  // ... more users
]
```

---

## Get User by ID
This function allows an authorized user to retrieve a specific user record by its ID.
```
GET /api/app-users/{id}
```
**Response:**
```json
200 OK
{
  "userId": 5,
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "role": {
    "roleId": 2,
    "roleName": "Employee"
  },
  "dlNum": "D1234567",
  "dlState": "FL",
  "streetAddress": "123 Main St",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "407-555-1234",
  "dateOfBirth": "1990-01-01",
  "createdAt": "2025-11-28T12:00:00",
  "updatedAt": "2025-11-28T12:00:00",
  "locationAccess": [
    {
      "location": {
        "locationId": 1,
        "locationName": "Downtown Recreation Center"
      }
    }
  ]
}
```
**Error Response:**
```json
404 Not Found
{
  "error": "User not found with ID {id}"
}
```

---

## Update User
This function allows an authorized user to update an existing user record.
```
PUT /api/app-users/{id}
```
**Request Body:**
```json
{
  "fullName": string,
  "email": string,
  "password": string,
  "role": {
    "roleId": integer
  },
  "dlNum": string,
  "dlState": string,
  "streetAddress": string,
  "city": string,
  "state": string,
  "zipCode": string,
  "contactNumber": string,
  "dateOfBirth": localdate (YYYY-MM-DD)
}
```
**Example Request:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "newpassword",
  "role": {
    "roleId": 2
  },
  "dlNum": "D1234567",
  "dlState": "FL",
  "streetAddress": "123 Main St",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "407-555-1234",
  "dateOfBirth": "1990-01-01"
}
```
**Response:**
```json
200 OK
{
  "userId": 5,
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "role": {
    "roleId": 2,
    "roleName": "Employee"
  },
  "dlNum": "D1234567",
  "dlState": "FL",
  "streetAddress": "123 Main St",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "407-555-1234",
  "dateOfBirth": "1990-01-01",
  "createdAt": "2025-11-28T12:00:00",
  "updatedAt": "2025-11-28T12:10:00"
}
```
**Error Responses:**
```json
404 Not Found
{
  "error": "User not found with ID {id}"
}
```
```json
404 Not Found
{
  "error": "Role not found"
}
```

---

## Delete User
This function allows an authorized user to delete a user record from the system.
```
DELETE /api/app-users/{id}
```
**Response:**
- Status: 204 No Content (on success, no content returned)

**Error Response:**
```json
404 Not Found
{
  "error": "User not found with ID {id}"
}
```