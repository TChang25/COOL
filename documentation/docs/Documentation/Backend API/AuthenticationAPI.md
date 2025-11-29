# Authentication API

Enables users to log in and out of the system.

---

## Login Function

Users must provide an **email** and **password** to log in. Failed logins return error messages. Only registered users (employee and admin) can log in.

```
POST /api/auth/login
```

**Request:**
```json
{
  "email": string,
  "password": string
}
```
**Required fields:**
- email (string)
- password (string)

**Response:**
```json
200 OK
{
  "message": "Login successful",
  "user": {
    "user_id": 2,
    "name": "user@example.com",
    "user_role": "employee"
  }
}
```

**Error Responses:**
```json
401 Unauthorized
{
  "error": "Invalid password"
}
```
```json
404 Not Found
{
  "error": "Account not found."
}
```
```json
500 Internal Server Error
{
  "error": "An unexpected error has occurred."
}
```

---

## Logout Function

Allows a logged-in user to log out of the system. Once logged out, the user will no longer have access until they log in again.

```
POST /api/auth/logout
```

**Request:**
```json
{
  "email": string
}
```
**Required fields:**
- email (string)

**Response:**
```json
200 OK
{
  "message": "Logout successful",
  "user": {
    "user_id": 21,
    "name": "user@example.com",
    "user_role": "employee"
  }
}
```

**Error Responses:**
```json
401 Unauthorized
{
  "error": "User not logged in"
}
```
```json
500 Internal Server Error
{
  "error": "An unexpected error has occurred."
}
```