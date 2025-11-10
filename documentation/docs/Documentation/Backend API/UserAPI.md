# User CRUD API Documentation: Jordan Esperance

## Overview
These instructions are intended to assist frontend developers when implementing the appropriate API calls:  
```
POST https://website.com/api/users
```

---

## Create (POST)
### Endpoint
```
POST /users
```

### Request Example
#### Creates a new user record in the system. 
- **Required:** `app_user_full_name` — the user's first name.
- **Required:** `email` — the user's email address (must be unique).
- **Required:** `password_hash` — the user's password.
- **Optional:** `user_role_id` — integer that defines user role, e.g., "101", "102", "103".

```json
{  
  "app_user_full_name": "Someone Lastname",
  "email": "someone@example.com",
  "password_hash": "SecurePassword123!",
  "user_role_id": 101
}

```

### Response Example
Success: 201 Created
```json
{
  "app_user_id": 101,
  "app_user_full_name": "Someone Lastname",
  "email": "someone@example.com",
  "user_role_id": 101,
  "notes": "New user created successfully."
}
```
Error: 401 Unauthorized
```json
{
 "error": "Invalid API key/token."
}
```
Error: 403 Forbidden
```json
{
 "error": "Access Denied. You are not authorized to access this resource. Please contact admin."
}
```
Error: 404 Page Not Found
```json
{
 "error": "This page was not found."
}
```
Error: 409 Conflict
```json
{
"error": "Email address already exists."}
```
Error: 500 Unexpected Error
```json
{
 "error": "An unexpected error has occurred."
}
```
---

## Read (GET)
### Endpoint

```
GET /users/{app_user_id}
```

### Request Example
#### Retrieves user records from the database.
- **Required:** `app_user_id` — the user's id.
- **Optional query parameters** can filter or sort results, for example:
- `email` — the user's email address (must be unique).
- `app_user_full_name` → search by full or partial name.

### Response Example
Success: 200 OK
```json
{
  "app_user_id": 101,
  "app_user_full_name": "Someone Lastname",
  "email": "jordan@example.com",
  "user_role_id": 101
}
```
Error: 401 Unauthorized
```json
{
  "error": "Invalid API key/token."
}
```

Error: 403 Forbidden
```json
{
 "error": "Access Denied. You are not authorized to access this resource."
}
```
Error: 404 Record Not Found
```json
{
 "error": "This user was not found."
}
```
Error: 500 Unexpected Error
```json
{
 "error": "An unexpected error has occurred."
}
```

---
## Update (PUT/PATCH)
### Endpoint

```
PUT /users/{app_user_id}
```


### Request Example
#### Updates an existing user record.
- **Required:** `app_user_id` — the ID of the user you want to update.  
- **Optional fields** can be included to modify the record, for example:
  - `app_user_full_name`
  - `email`
  - `user_role_id`

```json
{
  "app_user_full_name": "Someone Lastname",
  "email": "someone.new@example.com",
  "user_role_id": 101
}
```

### Response Example

Success: 200 Record Updated
```json
{
  "app_user_id": 101,
  "app_user_full_name": "Someone Lastname",
  "email": "someone.new@example.com",
  "user_role_id": 101,
  "notes": "User updated successfully."
}
```
Error: 401 Unauthorized
```json
{
  "error": "Invalid API key/token."
}
```
Error: 403 Forbidden
```json
{
 "error": "Access Denied. You are not authorized to access this resource. Please contact admin."
}
```

Error: 404 Record Not Found
```json
{
 "error": "This user was not found."
}
```

Error: 500 Unexpected Error
```json
{
 "error": "An unexpected error has occurred."
}
```
---
## Delete (DELETE)
### Endpoint

```
DELETE /users/{app_user_id}
```

### Request Example
#### Deletes an existing user record.
- **Required:** `app_user_id` — the ID of the user you want to delete.

### Response Example

Success: 200 Record Deleted
```json
{
  "app_user_id": 101,
  "notes": "User deleted successfully."
}
```
Error: 401 Unauthorized
```json
{
  "error": "Invalid API key/token."
}
```
Error: 403 Forbidden
```json
{
 "error": "Access Denied. You are not authorized to access this resource. Please contact admin."
}
```

Error: 404 Record Not Found
```json
{
 "error": "This user was not found."
}
```

Error: 500 Unexpected Error
```json
{
 "error": "An unexpected error has occurred."
}
```
---
  ```
  Content-Type: application/json
  Authorization: Bearer <API_KEY>
  ```
