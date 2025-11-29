# Loan API 

The Loan API manages the lending and returning of devices within the system.  

It tracks loan details such as start date, due date, and condition status while ensuring accurate recordkeeping of all borrowed items.  

Only authorized users can create, update, or delete loan records.  
This API ensures accountability and maintains a clear history of each device loan.

---

## Create Loan
This function allows an authorized user to create a new loan record in the system.  
```
POST /api/loans
```
**Request Body:**
```json
{
  "binId": integer,
  "loanStatusId": integer,
  "citizenId": integer,
  "employeeId": integer,
  "dueAt": timestamp(YYYY-MM-DD),
  "loanConditionId": integer,
  "loanConditionNotes": string,
  "notes": string
}
```
**Required fields:**
- binId
- loanStatusId
- citizenId
- employeeId
- dueAt
- loanConditionId

**Example Request:**
```json
{
  "binId": 5,
  "loanStatusId": 1,
  "citizenId": 1,
  "employeeId": 3,
  "dueAt": "2025-11-30",
  "loanConditionId": 2,
  "loanConditionNotes": "Minor scratch on front right side of device",
  "notes": "DL was verified before checkout"
}
```
**Response:**
```json
success: 201 Created
{
    "message": "Loan created successfully",
    "data": {
        // Loan data
    }
}
```
**Error Responses:**
```json
400 Bad Request
{
  "error": "Missing required fields"
}
```
```json
400 Bad Request
{
  "error": "Invalid bin ID"
}
```
```json
500 Internal Server Error
{
  "error": "An unexpected error has occurred."
}
```

---

## Get All Loans
This function allows an authorized user to retrieve every loan record in the system.    
```
GET /api/loans
```
**Response:** 
```json
200 OK
{
  "message": "Loans retrieved successfully",
  "data": [
    // List of Loans
  ]
}
```
**Error:**
```json
500 Internal Server Error
{
  "error": "An unexpected error has occurred."
}
```

---

## Get Loan by ID
This function allows an authorized user to retrieve a specific loan record by its ID number.  
```
GET /api/loans/{loan_id}
```
**Response:**
```json
200 OK
{
  "message": "Loan retrieved successfully",
  "data": {
    // Loan data
  }
}
```
**Error:**
```json
404 Not Found
{
  "error": "Loan not found"
}
```
```json
500 Internal Server Error
{
  "error": "An unexpected error has occurred."
}
```

---

## Replace Loan
This function allows an authorized user to replace all details of an existing loan record.  
```
PUT /api/loans/{loan_id}
```
**Request Body:**
```json
{
  "binId": integer,
  "loanStatusId": integer,
  "citizenId": integer,
  "employeeId": integer,
  "startAt": timestamp(YYYY-MM-DD),
  "dueAt": timestamp(YYYY-MM-DD),
  "returnedAt": timestamp(YYYY-MM-DD),
  "loanConditionId": integer,
  "loanConditionNotes": string,
  "returnConditionId": integer,
  "returnConditionNotes": string,
  "damageFee": bigdecimal(0.00),
  "allAccessoriesReturned": boolean,
  "missingAccessories": string,
  "notes": string
}
```
**Required fields:**
- binId
- loanStatusId
- citizenId
- employeeId
- startAt
- dueAt
- loanConditionId

**Example Request:**
```json
{
  "binId": 5,
  "loanStatusId": 1,
  "citizenId": 1,
  "employeeId": 3,
  "startAt": "2025-11-25",
  "dueAt": "2025-11-30",
  "returnedAt": "2025-11-30",
  "loanConditionId": 2,
  "loanConditionNotes": "Minor scratch on front right side of device",
  "returnConditionId": 2,
  "returnConditionNotes": "Minor scratch on front right side of device",
  "damageFee": 0.00,
  "allAccessoriesReturned": true,
  "missingAccessories": "none",
  "notes": "Returned in same condition as checkout"
}
```
**Response:**
```json
200 OK
{
  "message": "Loan replaced successfully",
  "data": {
    // // Loan data
  }
}
```
**Error:**
```json
400 Bad Request
{
  "error": "Missing required fields"
}
```
```json
404 Not Found
{
  "error": "Loan not found"
}
```
```json
500 Internal Server Error
{
  "error": "An unexpected error has occurred."
}
```

---

## Update Loan
This function allows an authorized user to update one or more fields of a loan record. (Used to check in a returning loan)  
```
PATCH /api/loans/{loan_id}
```
**Request Body:**
```json
{
  "loanStatusId": integer,
  "returnedAt": timestamp(YYYY-MM-DD),
  "returnCondition": integer,
  "returnConditionNotes": string,
  "damageFee": bigdecimal(0.00),
  "allAccessoriesReturned": boolean,
  "missingAccessories": string,
  "notes": string
}
```
**Required fields:**
- loanStatusId
- returnedAt
- returnCondition
- returnConditionNotes
- damageFee
- allAccessoriesReturned
- missingAccessories
- notes

**Example Request:**
```json
{
  "loanStatusId": 2,
  "returnedAt": "2025-11-30",
  "returnCondition": 2,
  "returnConditionNotes": "Minor scratch on front right side of device",
  "damageFee": 0.00,
  "allAccessoriesReturned": true,
  "missingAccessories": "none",
  "notes": "Returned in same condition as checkout"
}
```
**Response:**
```json
200 OK
{
  "message": "Loan updated successfully",
  "data": {
    // Loan data
  }
}
```
**Error:**
```json
404 Not Found
{
  "error": "Loan not found"
}
```
```json
500 Internal Server Error
{
  "error": "An unexpected error has occurred."
}
```

---

## Delete Loan
This function allows an authorized user to delete a loan record from the system.
```
DELETE /api/loans/{loan_id}
```
**Response**
```json
200 OK
{
  "message": "Loan deleted successfully"
  "data": null
}
```
**Error:**
```json
404 Not Found
{
  "error": "Loan not found"
}
```
```json
500 Internal Server Error
{
  "error": "An unexpected error has occurred."
}
```

