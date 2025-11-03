# LocationAPI

The Location API is designed to manage all physical site data within the system. It provides full CRUD (Create, Read, Update, Delete) functionality for handling location records, allowing the system to store and retrieve important information such as address, city, state, and contact details for each site. These endpoints serve as the foundation for connecting users, devices, and activities to specific physical locations.

This API is primarily intended for administrative and system-level operations. Employees or system administrators will use it to register new locations, update existing details, or remove outdated entries. Regular users will typically only see this information displayed through the application interface rather than modify it directly.

The main interactions will take place through the system’s user interface or via API testing tools such as Postman. Each location can be viewed, created, modified, or deleted using the provided REST endpoints.

## Table of Contents
- [Location API](#locationapi)
- [User Location Access API](#user_location_access)
- [User Location API](#user-location)


## Location (http://localhost:8080/api/locations)
### POST — Create a New Location
URL: http://localhost:8080/api/locations

Request Body:
```JSON
{
  "locationName": "Downtown Recreation Center",
  "streetAddress": "500 S Orange Ave",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "32801",
  "contactNumber": "407-555-1234"
}
```
Expected Response:
```
{
    "locationId": 2,
    "locationName": "Downtown Recreation Center",
    "streetAddress": "500 S Orange Ave",
    "city": "Orlando",
    "state": "FL",
    "zipCode": "32801",
    "contactNumber": "407-555-1234",
    "createdAt": null,
    "updatedAt": null
}
```
---
### GET — Retrieve All Locations
URL: http://localhost:8080/api/locations

Expected:
```
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
    },
    {
        "locationId": 2,
        "locationName": "Downtown Recreation Center",
        "streetAddress": "500 S Orange Ave",
        "city": "Orlando",
        "state": "FL",
        "zipCode": "32801",
        "contactNumber": "407-555-1234",
        "createdAt": null,
        "updatedAt": null
    }
]
```
---
### GET (by ID) — Retrieve a Specific Location
URL: http://localhost:8080/api/locations/1


Expected:
```
{
    "zipCode": "32801",
    "locationName": "Callahan Neighborhood Center",
    "address": "101 N. Parramore Ave Ste. 1713",
    "city": "Orlando",
    "locationId": 1,
    "state": "FL"
}
```
---
### PUT — Update an Existing Location
URL: http://localhost:8080/api/locations/2

body raw JSON
```JSON
{
  "locationName": "Downtown Recreation Center",
  "streetAddress": "500 S Orange Ave",
  "city": "Orlando",
  "state": "FL",
  "zipCode": "11111",
  "contactNumber": "407-555-1234"
}
```

Expected:
```
{
    "locationId": 2,
    "locationName": "Downtown Recreation Center",
    "streetAddress": "500 S Orange Ave",
    "city": "Orlando",
    "state": "FL",
    "zipCode": "11111",
    "contactNumber": "407-555-1234",
    "createdAt": null,
    "updatedAt": null
}
```
---

### DELETE — Remove a Location
URL:http://localhost:8080/api/locations/2

Expected:
1



---

### ⚠️ **Warning – Composite Key Dependencies**
If you encounter issues when making **POST** requests for `user-locations` or `user-locations-access`, ensure that the corresponding entries already exist in the **AppUser**, **UserRole**, and **Location** tables.  

These endpoints rely on **composite keys** (such as `userId` and `locationId`), so valid user, role, and location records must be present in the database **before** creating a new user-location mapping.

---


## user_location_access (http://localhost:8080/api/user-locations-access)

> **Note:** Locations with composite keys do not require PUT requests in Postman.


### POST
URL: http://localhost:8080/api/user-locations-access

body raw JSON
```JSON

{
  "userId": 1,
  "locationId": 1
}
```

Expected:
```

{
    "appUser": {
        "userId": 1,
        "fullName": "Test Admin",
        "email": "admin@workemail.com",
        "password": "hashed_pw_here",
        "role": {
            "roleId": 1,
            "roleName": "Admin",
            "dlRequired": false,
            "active": true
        },
        "dlNum": null,
        "dlState": null,
        "streetAddress": null,
        "city": null,
        "state": null,
        "zipCode": null,
        "contactNumber": null,
        "dateOfBirth": null,
        "createdAt": "2025-10-16T01:21:09",
        "updatedAt": "2025-10-16T01:21:09"
    },
    "location": {
        "locationId": 1,
        "locationName": "Callahan Neighborhood Center",
        "streetAddress": "101 N. Parramore Ave Ste. 1713",
        "city": "Orlando",
        "state": "FL",
        "zipCode": "32801",
        "contactNumber": "407-246-4442",
        "createdAt": "2025-10-16T01:21:09",
        "updatedAt": "2025-10-16T01:21:09"
    }
}
```
---
### GET
URL: http://localhost:8080/api/user-locations-access

Expected:
```

[
    {
        "appUser": {
            "userId": 1,
            "fullName": "Test Admin",
            "email": "admin@workemail.com",
            "password": "hashed_pw_here",
            "role": {
                "roleId": 1,
                "roleName": "Admin",
                "dlRequired": false,
                "active": true
            },
            "dlNum": null,
            "dlState": null,
            "streetAddress": null,
            "city": null,
            "state": null,
            "zipCode": null,
            "contactNumber": null,
            "dateOfBirth": null,
            "createdAt": "2025-10-16T01:21:09",
            "updatedAt": "2025-10-16T01:21:09"
        },
        "location": {
            "locationId": 1,
            "locationName": "Callahan Neighborhood Center",
            "streetAddress": "101 N. Parramore Ave Ste. 1713",
            "city": "Orlando",
            "state": "FL",
            "zipCode": "32801",
            "contactNumber": "407-246-4442",
            "createdAt": "2025-10-16T01:21:09",
            "updatedAt": "2025-10-16T01:21:09"
        }
    }
]
```
---
### GET selected ID
URL: http://localhost:8080/api/user-locations-access/1/1

Expected:
```

{
    "appUser": {
        "userId": 1,
        "fullName": "Test Admin",
        "email": "admin@workemail.com",
        "password": "hashed_pw_here",
        "role": {
            "roleId": 1,
            "roleName": "Admin",
            "dlRequired": false,
            "active": true
        },
        "dlNum": null,
        "dlState": null,
        "streetAddress": null,
        "city": null,
        "state": null,
        "zipCode": null,
        "contactNumber": null,
        "dateOfBirth": null,
        "createdAt": "2025-10-16T01:21:09",
        "updatedAt": "2025-10-16T01:21:09"
    },
    "location": {
        "locationId": 1,
        "locationName": "Callahan Neighborhood Center",
        "streetAddress": "101 N. Parramore Ave Ste. 1713",
        "city": "Orlando",
        "state": "FL",
        "zipCode": "32801",
        "contactNumber": "407-246-4442",
        "createdAt": "2025-10-16T01:21:09",
        "updatedAt": "2025-10-16T01:21:09"
    }
}
```

---
### DELETE
URL: http://localhost:8080/api/user-locations-access/1/1

Expected:
```
1
```
---

## user location(http://localhost:8080/api/user-locations)

> **Note:** Locations with composite keys do not require PUT requests in Postman.

### POST
URL: http://localhost:8080/api/user-locations

body raw JSON
```JSON

{
  "user": { "userId": 1 },
  "location": { "locationId": 1 }
}
```

Expected:
```

{
    "id": {
        "userId": 1,
        "locationId": 1
    },
    "user": {
        "userId": 1,
        "fullName": "Test Admin",
        "email": "admin@workemail.com",
        "password": "hashed_pw_here",
        "role": {
            "roleId": 1,
            "roleName": "Admin",
            "dlRequired": false,
            "active": true
        },
        "dlNum": null,
        "dlState": null,
        "streetAddress": null,
        "city": null,
        "state": null,
        "zipCode": null,
        "contactNumber": null,
        "dateOfBirth": null,
        "createdAt": "2025-10-16T13:25:59",
        "updatedAt": "2025-10-16T13:25:59"
    },
    "location": {
        "locationId": 1,
        "locationName": "Callahan Neighborhood Center",
        "streetAddress": "101 N. Parramore Ave Ste. 1713",
        "city": "Orlando",
        "state": "FL",
        "zipCode": "32801",
        "contactNumber": "407-246-4442",
        "createdAt": "2025-10-16T13:25:59",
        "updatedAt": "2025-10-16T13:25:59"
    }
}
```
---
### GET
URL: http://localhost:8080/api/user-locations

Expected:
```

[
    {
        "id": {
            "userId": 1,
            "locationId": 1
        },
        "user": {
            "userId": 1,
            "fullName": "Test Admin",
            "email": "admin@workemail.com",
            "password": "hashed_pw_here",
            "role": {
                "roleId": 1,
                "roleName": "Admin",
                "dlRequired": false,
                "active": true
            },
            "dlNum": null,
            "dlState": null,
            "streetAddress": null,
            "city": null,
            "state": null,
            "zipCode": null,
            "contactNumber": null,
            "dateOfBirth": null,
            "createdAt": "2025-10-16T13:25:59",
            "updatedAt": "2025-10-16T13:25:59"
        },
        "location": {
            "locationId": 1,
            "locationName": "Callahan Neighborhood Center",
            "streetAddress": "101 N. Parramore Ave Ste. 1713",
            "city": "Orlando",
            "state": "FL",
            "zipCode": "32801",
            "contactNumber": "407-246-4442",
            "createdAt": "2025-10-16T13:25:59",
            "updatedAt": "2025-10-16T13:25:59"
        }
    }
]
```
---
### GET selected ID
URL: http://localhost:8080/api/user-locations/1/1

Expected:
```

{
    "id": {
        "userId": 1,
        "locationId": 1
    },
    "user": {
        "userId": 1,
        "fullName": "Test Admin",
        "email": "admin@workemail.com",
        "password": "hashed_pw_here",
        "role": {
            "roleId": 1,
            "roleName": "Admin",
            "dlRequired": false,
            "active": true
        },
        "dlNum": null,
        "dlState": null,
        "streetAddress": null,
        "city": null,
        "state": null,
        "zipCode": null,
        "contactNumber": null,
        "dateOfBirth": null,
        "createdAt": "2025-10-16T13:25:59",
        "updatedAt": "2025-10-16T13:25:59"
    },
    "location": {
        "locationId": 1,
        "locationName": "Callahan Neighborhood Center",
        "streetAddress": "101 N. Parramore Ave Ste. 1713",
        "city": "Orlando",
        "state": "FL",
        "zipCode": "32801",
        "contactNumber": "407-246-4442",
        "createdAt": "2025-10-16T13:25:59",
        "updatedAt": "2025-10-16T13:25:59"
    }
}

```

---
### DELETE
URL: http://localhost:8080/api/user-locations/1/1

Expected:
```
1
```