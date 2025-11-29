# Role Management API

When a new user registers for an account, their `roleName` is automatically set to "employee."

Only users with the admin role have permission to change another user's role using the user's role ID.

---

## List All Roles
This function allows the admin to retrieve every role available in the system.
```
GET /api/user-roles
```
**Response:**
```json
200 OK
[
  {
    "roleId": 1,
    "roleName": "Admin",
    "dlRequired": false,
    "active": true
  },
  {
    "roleId": 2,
    "roleName": "Employee",
    "dlRequired": false,
    "active": true
  },
  // more roles...
]
```
**Error Responses:**
```json
403 Forbidden
{
  "error": "Access denied. You do not have permission to view roles."
}
```
```json
500 Internal Server Error
{
  "error": "An unexpected error has occurred."
}
```

---

## Get Role by ID
This function allows the admin to retrieve a specific role by its ID.
```
GET /api/user-roles/{id}
```
**Response:**
```json
200 OK
{
  "roleId": 1,
  "roleName": "Admin",
  "dlRequired": false,
  "active": true
}
```
**Error Response:**
```json
404 Not Found
{
  "error": "Role not found with ID {id}"
}
```

---

## Create Role
This function lets the admin add a new role to the system.
```
POST /api/user-roles
```
**Request Body:**
```json
{
  "roleName": string,
  "dlRequired": boolean,
  "active": boolean
}
```
**Required fields:**
- roleName
- dlRequired
- active

**Example Request:**
```json
{
  "roleName": "NewRole",
  "dlRequired": false,
  "active": true
}
```
**Response:**
```json
201 Created
{
  "roleId": 4,
  "roleName": "NewRole",
  "dlRequired": false,
  "active": true
}
```
**Error Responses:**
```json
400 Bad Request
{
  "error": "Role name cannot be empty"
}
```
```json
403 Forbidden
{
  "error": "Unauthorized to create role."
}
```
```json
409 Conflict
{
  "error": "Role already exists."
}
```

---

## Update Role
This function allows an admin to update the properties of a role in the system.
```
PUT /api/user-roles/{id}
```
**Request Body:**
```json
{
  "roleName": string,
  "dlRequired": boolean,
  "active": boolean
}
```
**Required fields:**
- roleName
- dlRequired
- active

**Example Request:**
```json
{
  "roleName": "UpdateRole",
  "dlRequired": false,
  "active": true
}
```
**Response:**
```json
200 OK
{
  "roleId": 4,
  "roleName": "UpdateRole",
  "dlRequired": false,
  "active": true
}
```
**Error Responses:**
```json
403 Forbidden
{
  "error": "Unauthorized to update role."
}
```
```json
404 Not Found
{
  "error": "Role not found with ID {id}"
}
```

---

## Delete Role
This function allows the admin to delete roles in the system.

> **NOTE:** Core roles ("Admin" and "Employee") cannot be deleted.

```
DELETE /api/user-roles/{id}
```
**Response:**
- Status: 204 No Content (on success, no content returned)

**Error Responses:**
```json
403 Forbidden
{
  "error": "Unauthorized to delete role."
}
```
```json
404 Not Found
{
  "error": "Role not found with ID {id}"
}
```
```json
409 Conflict
{
  "error": "Core roles cannot be deleted."
}
```
