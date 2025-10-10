# API Usage and Testing for the Location Management System

This document provides a step-by-step guide for running, testing, and interacting with the Location Management API. Unlike the setup document, which focused on configuring the environment and preparing the project, this markdown is intended for end-to-end usage of the API, including:

- Launching the application using Spring Boot.
- Verifying that the server and Hibernate are properly connected to the database.
- Testing REST endpoints for each entity (Location, AppUser, Role, UserLocation) using tools like Postman.
- Performing CRUD operations (Create, Read, Update, Delete) through HTTP requests.
- Troubleshooting common errors and ensuring the database reflects API operations.

This guide is aimed at developers who have the project already set up and want to quickly start testing and using the API without modifying the underlying configuration.


## 1. Starting the Application
Once the project is set up, the first step is to launch the Spring Boot application and confirm that it is running correctly. Spring Boot comes with an embedded Tomcat server, so no additional server configuration is required.
How to launch Spring Boot (mvn spring-boot:run)
Verifying server is running (console logs)

### 1.1 Launching with Maven
From the project’s root directory, run the following commands in your terminal:
```bash
mvn clean install
mvn spring-boot:run
```
Here is an example on how your terminal should look like running these commands:
`mvn clean install`


![alt text](./Management_images/MD2_images/Running%20mvn%20clean%20install.png)


- mvn clean install → Cleans old builds, compiles the project, and ensures all dependencies are downloaded.

`mvn spring-boot:run`

![alt text](./Management_images/MD2_images/Running%20mvn%20spring-boot%20run.png)

- mvn spring-boot:run → Starts the Spring Boot application and initializes Hibernate with the database connection.

### 1.2 Verifying the Server is Running

When the application starts successfully, the console will display logs similar to the following:
```bash
Tomcat started on port(s): 8080 (http) with context path ''
Started PrototypeSetupApplication in 5.678 seconds (JVM running for 6.123)
```
This confirms that:
- The application booted successfully.
- The embedded Tomcat server is listening on port 8080.
- Hibernate connected to the configured database (as defined in application.properties).

At this point, you can open your browser and visit:
```
http://localhost:8080/
```
If you have the HomeController (or a similar test controller) configured, you should see a confirmation message like:

```
Welcome to Prototype Setup!
```
An example pic of the page 

![alt text](./Management_images/MD2_images/Prototype%20setup%20page.png)





### 1.3 How to turn the api off
When you are finished testing or working with the API, it is important to stop the Spring Boot server to free up system resources and avoid port conflicts. To do this:

- In the terminal or command prompt where the Spring Boot application is running, press:
```
ctrl + c 
```
- You should see the console output indicating that the application has been terminated and the embedded Tomcat server has stopped.

- After stopping, the API endpoints will no longer respond to requests at `http://localhost:8080/`....

- If you want to restart the API later, simply run the application again (e.g., using mvn spring-boot:run or running the main class in your IDE).

**Tip:** Always ensure that no other process is using port 8080 before restarting, otherwise the API may fail to start.



---

### 2. Home Endpoint Test
After starting the Spring Boot application, the first step in testing is to confirm that the server is responding correctly. By default, Spring Boot exposes a simple home endpoint (/) that can be used as a quick connectivity check.

### 2.1 Why Use Postman for API Testing?
Postman is a popular tool for testing REST APIs because it allows you to:
- Quickly send requests (GET, POST, PUT, DELETE) to your API.
- Inspect both the request and the response in a clear interface.
- Save collections of requests so you don’t need to type URLs repeatedly.
- Debug issues by examining response codes, headers, and payloads.

While you can check simple endpoints like / directly in your browser, Postman provides a more flexible and powerful way to interact with the API—especially when sending POST or PUT requests that require JSON bodies.

### 2.2 Sending a Request
Launch the Postman application on your PC.

From the home page, click the `+` button in the tab bar next to Import to create a new request, as shown below:

![alt text](./Management_images/MD2_images/SendRequestTest.png)

After that make sure to to to copy the URL `http://localhost:8080/` over to the URL line and make sure the `GET` option is selected from dropdown. 

**Important:** Ensure your Spring Boot application is running before hitting Send, so Postman can connect to the API.

![alt text](./Management_images/MD2_images/SendRequestPostHomeController.png)

As you can see here wew where able to have a successful GET and seeing the page being posted, as you will see the results in the `Body` console as shown above. This confirms that your Spring Boot server is running and successfully handling requests through the HomeController endpoint.


## 3. Controllers Overview
Once the Spring Boot application is running, we can interact with the main entities through the REST controllers. Each controller maps HTTP requests to the corresponding service/repository layer for CRUD operations.

### 3.1 Controllers in the Project
| Controller               | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `LocationController`     | Handles operations related to locations (create, read, update, delete). |
| `AppUserController`      | Manages user accounts and related information.                          |
| `RoleController`         | Handles user roles and permissions.                                     |
| `UserLocationController` | Manages the associations between users and locations.                   |


### 3.2 Planned Endpoints
For each controller, the typical REST endpoints include:
| HTTP Method | Path              | Description                       |
| ----------- | ----------------- | --------------------------------- |
| **GET**     | `/locations`      | Retrieve all locations.           |
| **GET**     | `/locations/{id}` | Retrieve a single location by ID. |
| **POST**    | `/locations`      | Create a new location.            |
| **PUT**     | `/locations/{id}` | Update an existing location.      |
| **DELETE**  | `/locations/{id}` | Delete a location.                |

The same pattern applies to AppUser, Role, and UserLocation controllers. GET for all or by ID, POST to create, PUT to update, and DELETE to remove.

This overview gives users a clear idea of which endpoints exist and what operations are supported before moving on to testing them with Postman.





## 4. Testing CRUD Endpoints with Postman 
In this section, we use Postman to test the CRUD (Create, Read, Update, Delete) endpoints for each of our controllers: LocationController, RoleController, AppUserController, and UserLocationController. For each controller, we demonstrate how to:

- GET all entries or a single entry by ID
- POST new entries into the database
- PUT (update) existing entries
- DELETE entries

Each example includes the HTTP method, endpoint URL, request body (if applicable), and expected response. Screenshots from Postman show the actual requests and responses to ensure the endpoints work as expected. By following this testing approach, we can validate that all CRUD operations function correctly across all entities in the application.

### 4.1 RoleController
#### 4.1.1 GET All Locations
First, navigate to our `LocationController` URL: `http://localhost:8080/api/locations`. This page should load without errors and display the test items from the `location` table in the database.


![alt text](./Management_images/MD2_images/ApiLocationsPage.png)

Next, open a new Postman tab, select the `GET` method, and enter the same URL to retrieve a list of all locations stored in the database.

![alt text](./Management_images/MD2_images/GetAllLocations.png)


##### 4.1.2 GET Single Location
Use the `GET` method to retrieve a specific location by its ID. Replace `{id}` with the numeric ID of the location you want to retrieve.
**URL:**
`http://localhost:8080/api/locations/{id}`

![alt text](./Management_images/MD2_images/GetSelectedID.png)

#### 4.1.3 POST a New Location
The `POST` method allows us to create a new location in the database. In Postman, select `POST`, set the URL to `http://localhost:8080/api/locations`, and use the `Body` tab with `raw` JSON.

**Example JSON:**

```JSON
{
    "locationName": "West Side Center",
    "address": "789 Pine Rd, Orlando, FL"
}
```

![alt text](./Management_images/MD2_images/PostLocationData.png)



#### 4.1.4 PUT / Update Location
The `PUT` method updates an existing location. Replace `{id}` with the location ID you want to update, then provide the updated information in the body as raw JSON.


**Example JSON for update:**
```JSON
{
    "locationName": "Downtown Hub",
    "address": "123 Main St, Orlando, FL"
}
```

![alt text](./Management_images/MD2_images/PutUpdate.png)

#### 4.1.5 DELETE a Location
The `DELETE` method removes a specific location from the database. Replace `{id}` with the ID of the location to delete.

**URL:**


![alt text](./Management_images/MD2_images/DELETElocation.png)


Now that we’ve tested the Location endpoints in real time, we will apply the same testing approach to the remaining controllers.

### 4.2 RoleController
#### 4.2.1 GET All Roles
URL: `http://localhost:8080/api/roles`

This retrieves all roles from the role table.

![alt text](./Management_images/MD2_images/GetRoleList.png)


#### 4.2.2 GET Single Role
URL: `http://localhost:8080/api/roles/{id}`

Replace {id} with the role ID you want to retrieve.

![alt text](./Management_images/MD2_images/GetSelectedRole.png)

#### 4.2.3 POST a New Role
URL: `http://localhost:8080/api/roles`
Method: POST
Body (raw JSON):
```JSON
{
    "roleName": "DISTRICT MANAGER",
}
```

![alt text](./Management_images/MD2_images/PostRole.png)

#### 4.2.4 PUT / Update Role
URL: `http://localhost:8080/api/roles/{id}`
Method: PUT
Body (raw JSON):
```JSON
{
    "roleName": "GENERAL MANAGER",
}
```
![alt text](./Management_images/MD2_images/PutRole.png)

#### 4.2.5 DELETE a Role
URL: `http://localhost:8080/api/roles/{id}`
Method: DELETE

![alt text](./Management_images/MD2_images/DeleteRole.png)


### 4.3 AppUserController
#### 4.3.1 GET All Users
URL: `http://localhost:8080/api/users`

![alt text](./Management_images/MD2_images/GetUserList.png)

#### 4.3.2 GET Single User
URL: `http://localhost:8080/api/users/{id}`

![alt text](./Management_images/MD2_images/GetSelectedUser.png)

#### 4.3.3 POST a New User
URL: `http://localhost:8080/api/users`
Method: POST
Body (raw JSON):
```JSON
{
    "username": "jdoe",
    "email": "jdoe@example.com",
    "password": "securepassword",
    "role": {
        "roleId": 2
    }
}
```
![alt text](./Management_images/MD2_images/PostUser.png)

#### 4.3.4 PUT / Update User
URL: `http://localhost:8080/api/users/{id}`
Method: PUT
Body (raw JSON):
```JSON
{
    "username": "john.doe",
    "email": "jdoe@example.com",
    "password": "securepassword",
    "role": {
        "roleId": 2
    }
}
```
![alt text](./Management_images/MD2_images/PutUpdateUser.png)

#### 4.3.5 DELETE a User
URL: `http://localhost:8080/api/users/{id}`
Method: DELETE

![alt text](./Management_images/MD2_images/DeleteUser.png)


### 4.4 UserLocationController

#### 4.4.1 GET All User-Locations
URL: `http://localhost:8080/api/user-locations`

![alt text](./Management_images/MD2_images/GetListUserLocation.png)


#### 4.4.2 GET Single User-Location
URL: `http://localhost:8080/api/user-locations/{id}`

![alt text](./Management_images/MD2_images/GetSelectedUserLocation.png)

#### 4.4.3 POST a New User-Location
URL: `http://localhost:8080/api/user-locations`
Method: POST
Body (raw JSON using userId and locationId):
```JSON
{
    "userId": 5,
    "locationId": 1
}
```

![alt text](./Management_images/MD2_images/PostUserLocation.png)

#### 4.4.4 PUT / Update User-Location
URL: `http://localhost:8080/api/user-locations/{id}`
Method: PUT
Body (raw JSON):
```JSON
{
    "userId": 5,
    "locationId": 2
}
```

![alt text](./Management_images/MD2_images/PutUserLocation.png)

#### 4.4.5 DELETE a User-Location
URL: `http://localhost:8080/api/user-locations/{id}`
Method: DELETE

![alt text](./Management_images/MD2_images/DeleteUserLocation.png)


## 5. Error Handling Notes
When testing endpoints, you may encounter errors such as 500 Internal Server Error. These often occur due to:

- Null pointer exceptions or missing data in the controller.
- Incorrect path variables or request body structure.
- Repository queries returning empty results unexpectedly.

Best Practice: Be careful when writing your controller logic. Always check that all input values exist before using them, handle optional objects properly, and validate request bodies. Clear and defensive coding reduces runtime errors significantly.


## 6. Verifying Database Changes
After performing POST, PUT, or DELETE operations via Postman, it’s a good practice to verify that the changes actually took place in the database.
Open MySQL Workbench or your preferred SQL client.
Query the relevant table, for example:

```sql
SELECT * FROM user_location;
SELECT * FROM app_user;
SELECT * FROM location;
```
- Confirm that new entries were inserted, updates were applied, or deletions removed the correct records.

- Optionally, include screenshots of MySQL Workbench showing the changes for clarity.

## 7. Notes and Best Practices
When working with Spring Boot controllers and testing endpoints, following best practices ensures your application runs smoothly and is easier to maintain:

- **Refresh and Rebuild:** Always refresh your Maven project and rebuild whenever you add new endpoints, update entity classes, or modify repositories. This ensures that Spring Boot recognizes your changes and compiles them correctly.

- **Organize Tests with Postman Collections:** Use Postman collections to group requests by controller or functionality. This makes it easy to rerun tests, share with teammates, and avoid manually entering URLs or payloads each time.

- **Database Verification:** After performing POST, PUT, or DELETE operations, verify the changes directly in the MySQL database. This ensures that the requests are not only returning the correct responses but are actually modifying the underlying data.

- **Handle Optional and Null Data Carefully:** Always check optional values from repositories (Optional<T>) before using them. Null pointer exceptions are a common source of 500 Internal Server Error. Use proper null checks or .orElseThrow() for safer handling.

- **Validate Request Bodies:** Ensure that incoming JSON payloads match your DTOs or entity expectations. Missing fields, extra fields, or incorrect types can cause errors.

- **Secure Sensitive Data:** Avoid committing sensitive credentials or secrets in your source code. Use environment variables or configuration files excluded from version control.

- **Logging and Debugging:** Use Spring Boot logging (DEBUG or INFO) to track requests and database operations. It helps identify which part of the controller or repository is failing during testing.

By following these practices, you reduce errors, improve maintainability, and make your testing and debugging process much more efficient.

This document demonstrates how to set up, run, and test the API endpoints for the Location, Role, AppUser, and UserLocation controllers. By following the outlined steps for CRUD operations, verifying database changes, and adhering to best practices, developers can ensure that the application behaves as expected and is maintainable. Postman testing, combined with careful controller design and logging, provides an effective workflow for both development and troubleshooting.