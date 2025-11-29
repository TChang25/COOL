# COOL Project Setup Guide

This guide will walk you through setting up the COOL (City of Orlando Loaners) system.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (for running the MySQL database container)
- **[Java 17+ JDK](https://adoptopenjdk.net/)**
- **[Maven](https://maven.apache.org/download.cgi)**
- **[Git](https://git-scm.com/downloads)** (to clone the repository)
- **[Visual Studio Code](https://code.visualstudio.com/)** or another code editor (optional, for code review)
- **[Postman](https://www.postman.com/downloads/)** (optional, for API testing)

---

## 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/CityOfOrlando-2025/COOL.git
```

---

## 2. Prepare the Database with Docker

The project uses MySQL, which is run in a Docker container.

### 2.1. Project Structure

Ensure your project root contains:

```
project-root/database
├── docker-compose.yaml
├── .env.sample
├── .gitignore
└── initdb/
    ├── cool-ddl.sql
    └── seed-dev.sql
```

### 2.2. Create Your `.env` File

Copy the sample environment file and edit it with your own secure passwords.

Edit `.env` and set your own values for `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_ROOT_PASSWORD`:

```
MYSQL_ROOT_PASSWORD=rootPassword123
MYSQL_USER=devCOOL
MYSQL_PASSWORD=devPassword123
MYSQL_DATABASE=cool_db
```

### 2.3. Launch the MySQL Container with Docker Compose

Make sure Docker Desktop is running before proceeding.

From `project-root/database`, open a terminal and run:

```bash
docker compose up -d
```

This will:
- Build and start a MySQL container named `cool-mysql`
- Initialize the database schema and seed data if this is the first run

### 2.4. Configure Application Properties

Open `back-end/resources/application.properties` and ensure the database connection matches your Docker setup:

```
spring.datasource.url=jdbc:mysql://localhost:3307/cool_db
spring.datasource.username=devCOOL
spring.datasource.password=devPassword123
spring.jpa.hibernate.ddl-auto=update
```

- Make sure the username and password match your `.env` file.

---

## 3. Build and Run the Application

### 3.1. Build with Maven

From `project-root/back-end`, open a terminal and run:

```bash
mvn clean install
```

### 3.2. Start the Spring Boot Application

```bash
mvn spring-boot:run
```

- The server will start on port 8080 by default.
- You should see logs indicating that the application is available and accepting traffic.

### 3.3. Verify the Application

Open your browser and go to:

```
http://localhost:8080/
```

You should see a welcome message.

---

## 4. Initialize the Database (If Needed)

If your database is empty, you may need to create initial roles, users, or locations. You can do this using Postman or another API client.

### 4.1. Create Roles

Send a `POST` request to `/api/user-roles` with a body like:

```json
{
  "roleName": "Admin",
  "dlRequired": false,
  "active": true
}
```

Repeat for "Employee" and any other roles you need.

### 4.2. Create Locations

Send a `POST` request to `/api/locations`:

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

### 4.3. Create Users

Send a `POST` request to `/api/app-users`:

```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "role": { "roleId": 1 },
  "locationAccess": [
    { "location": { "locationId": 1 } }
  ]
}
```

---

## 5. Making Loans

Once you have users, roles, and locations set up, you can start making loans.

### 5.1. Create a Loan

Send a `POST` request to `/api/loans`:

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

---

## 6. API Testing and Usage

- Use [Postman](https://www.postman.com/downloads/) to test all endpoints.
- Refer to the API documentation in the `documentation/docs/Documentation/Backend API/` folder for details on request/response formats for each endpoint.

---

## 7. Stopping and Restarting the Application

To stop the Spring Boot server, press `Ctrl+C` in the terminal where it is running.

To stop the MySQL Docker container:

```bash
docker compose stop
```

To restart the container:

```bash
docker compose start
```

To remove the container and all data (reset):

```bash
docker compose down -v
docker compose up -d
```

---

## 9. Additional Notes

- For advanced configuration, see the `application.properties` file.
- For more details on each API, see the markdown files in `documentation/docs/Documentation/Backend API/`.
- Always keep your dependencies up to date and follow security best practices.
- To reset your database and seed data, use `docker compose down -v` and `docker compose up -d`.

---

You are now ready to use the COOL system!