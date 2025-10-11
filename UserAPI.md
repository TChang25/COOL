# CRUD API Documentation: Jordan Esperance

## Overview
These instructions are intended to assist frontend developers when implementing the appropriate API calls:  
```
POST https://website.com/api/loans
```



---

## Create (POST)
### Endpoint
```
POST /loan
```

### Request Example
#### Retrieves all loan records associated with a specific user.  
- **Required:** `user_id` — the ID of the user whose loans you want to create.  
- **Required:** `device_id` — the ID of the device whose loans you want to create.
- **Required:** `loan_date` → filter by loan start date.
- **Required:** `status` → "active", "returned", "overdue"
- **Required:** `due_date` → filter by due date  
```json
{
  "user_id": 123,            
  "device_id": 456,          
  "loan_date": "2025-09-17", 
  "due_date": "2025-09-24",  
  "status": "active"        
}
```

### Response Example
Success: 201 OK
```json
{
  "loan_id": 457,
  "user_id": 124,
  "device_id": 790,
  "loan_date": "2025-09-17",
  "due_date": "2025-09-24",
  "status": "active",
  "notes": "New loan created successfully."
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
Error 500 Unexpected Error
```json
{
 "error": "An unexpected error has occurred."
}
```
---

## Read (GET)
### Endpoint

```
GET /loan/{loanId}
```

### Request Example
#### Retrieves all loan records associated with a specific user.  
- **Required:** `user_id` — the ID of the user whose loans you want to fetch.  
- **Optional query parameters** can filter or sort results, for example:
  - `status` → "active", "returned", "overdue"
  - `device_id` → filter by specific device
  - `loan_date` → filter by loan start date
  - `due_date` → filter by due date  

```json
[
  {
    "user_id": 123,
    "device_id": 456,
    "loan_date": "2025-09-01",
    "due_date": "2025-09-08",
    "status": "returned",
    "notes": "Returned on time"
  },
  {
    "user_id": 123,
    "device_id": 789,
    "loan_date": "2025-09-10",
    "due_date": "2025-09-17",
    "status": "active",
    "notes": ""
  },
    {
    "user_id": 123,
    "device_id": 789,
    "loan_date": "2025-09-10",
    "due_date": "2025-09-17",
    "status": "overdue",
    "notes": ""
  }]
```



### Response Example
Success: 201 Record Found
```json
{
  "loan_id": 457,
  "user_id": 124,
  "device_id": 790,
  "loan_date": "2025-09-17",
  "due_date": "2025-09-24",
  "status": "active",
  "notes": "New loan created successfully."
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
 "error": "This loan was not found."
}
```
Error: 500 Unexpected Error
```json
{
 "error": "An unexpected error has occurred."
}
```
---

### Request Example
#### Retrieves the loan record associated with a specific loan.  
- **Required:** `loan_id` — the ID of the loan you want to fetch.  
- **Optional query parameters** can filter or refine results, for example:
  - `status` → "active", "returned", "overdue"
  - `device_id` → filter by specific device
  - `user_id` → filter by specific user
  - `loan_date` → filter by loan start date
  - `due_date` → filter by due date

```json
[
  {
    "user_id": 123,
    "device_id": 456,
    "loan_date": "2025-09-01",
    "due_date": "2025-09-08",
    "status": "returned",
    "notes": "Returned on time"
  },
  {
    "user_id": 123,
    "device_id": 789,
    "loan_date": "2025-09-10",
    "due_date": "2025-09-17",
    "status": "active",
    "notes": ""
  },
    {
    "user_id": 123,
    "device_id": 789,
    "loan_date": "2025-09-10",
    "due_date": "2025-09-17",
    "status": "overdue",
    "notes": ""
  }]
```

### Response Example
Success: 201 Record Found
```json
{
  "loan_id": 457,
  "user_id": 124,
  "device_id": 790,
  "loan_date": "2025-09-17",
  "due_date": "2025-09-24",
  "status": "active",
  "notes": ""
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
 "error": "This loan was not found."
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
GET /loan/{loanId}
```


### Request Example
#### Updates the loan record associated with a specific loan.  
- **Required:** `loan_id` — the ID of the loan you want to update.  
- **Optional fields** can be included to modify the record, for example:
  - `status` → "active", "returned", "overdue"
  - `device_id` → update the device
  - `user_id` → update the user
  - `loan_date` → update loan start date
  - `due_date` → update due date
  - `notes` → update any notes

```json
[
  {
    "user_id": 123,
    "device_id": 456,
    "loan_date": "2025-09-01",
    "due_date": "2025-09-08",
    "status": "returned",
    "notes": "Returned on time"
  },
  {
    "user_id": 123,
    "device_id": 789,
    "loan_date": "2025-09-10",
    "due_date": "2025-09-17",
    "status": "active",
    "notes": ""
  },
  {
    "user_id": 123,
    "device_id": 789,
    "loan_date": "2025-09-10",
    "due_date": "2025-09-17",
    "status": "overdue",
    "notes": ""
  }
]
```

### Response Example

Success: 200 Record Updated
```json
{
  "loan_id": 457,
  "user_id": 124,
  "device_id": 790,
  "loan_date": "2025-09-17",
  "due_date": "2025-09-24",
  "status": "active",
  "notes": "Updated successfully"
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
 "error": "This loan was not found."
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
GET /loan/{loanId}
```

Success: 200 Record Deleted
```json
{
  "loan_id": 457,
  "user_id": 124,
  "device_id": 790,
  "loan_date": "2025-09-17",
  "due_date": "2025-09-24",
  "status": "active",
  "notes": "Deleted successfully"
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
 "error": "This loan was not found."
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
