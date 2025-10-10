# Location(CRUD) + Admin Management API

**Author:** Jose Cartagena  
**Course:** COP-3330C-14319  
**Project:** Location CRUD + Management (Admin)

This project implements a Location Management API backed by a MySQL database. A new database called tech_loan_system was created to serve as the backend data store for the API. Within this database, tables were designed to represent the core entities of the system, such as Location, AppUser, and Role.

Relationships between entities were established to reflect real-world interactions. For example, users can be linked to multiple locations and roles, enabling flexible management of access and permissions. This relational structure provides a strong foundation for the API, ensuring that data can be stored, retrieved, and managed effectively through the application.

The diagram below illustrates how the entities interact and how data flows through the system:

![alt text](./Management_images/MD1_images/ProjectGraph.png)

Using this database structure, the API is able to map each table to a corresponding Java entity using Hibernate (JPA). These entities serve as the foundation for repositories, services, and controllers, allowing the application to perform CRUD operations on the data. The following sections will guide you through setting up the project environment, configuring dependencies, and preparing the application for development and testing.


## 1. Database Setup
The database stores all information about locations, users, and roles for the Location Management API. It uses a normalized schema with foreign key relationships to prevent redundant data and ensure scalability.

### Schema Overview
- **Location**: Stores location details (`location_id`, `location_name`, `address`).  
- **AppUser**: Stores user information (`user_id`, `username`, `email`).  
- **Role**: Stores user roles (`role_id`, `role_name`).  
- **User_Location**: Join table linking users to multiple locations.  

### Requirements
- MySQL 8.0+  
- A database named `tech_loan_system` (or update `application.properties` with your DB name). 
- Configure connection in `application.properties`:

### Example Configuration (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tech_loan_system
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```
It should be noted for the `spring.datasource.password=yourpassword` be sure to use your own password you use for your MYSQL root.


```sql
-- Location Table
CREATE TABLE location (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Role Table
CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    dl_flag BOOLEAN DEFAULT 0,
    other_perm_flag BOOLEAN DEFAULT 0
);

-- AppUser Table
CREATE TABLE app_user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

-- User_Location Join Table
CREATE TABLE user_location (
    user_location_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES location(location_id) ON DELETE CASCADE,
    UNIQUE(user_id, location_id)
);
```
### Insert Sample Data (Optional)
```sql
-- Roles
INSERT INTO role (role_name, dl_flag, other_perm_flag) VALUES
('Admin', 0, 1),
('Employee', 0, 0),
('Citizen', 1, 0);

-- Users
INSERT INTO app_user (username, password, email, role_id) VALUES
('admin1', 'adminPass123', 'admin1@orlando.gov', 1),
('employee1', 'empPass123', 'employee1@orlando.gov', 2),
('citizen1', 'citizenPass123', 'citizen1@email.com', 3);

-- Locations
INSERT INTO location (location_name, address) VALUES
('Downtown Community Center', '123 Main St, Orlando, FL'),
('East Side Center', '456 Oak Ave, Orlando, FL');

-- Assign employee to location
INSERT INTO user_location (user_id, location_id) VALUES (2, 1);

```





## 2. Entities with Hibernate
This project uses Spring Boot with Hibernate (JPA implementation) to map database tables into Java objects. These entities represent the schema we defined in Part 1, and they provide the foundation for repositories, services, and controllers.

### 2.1 Pre-requisites:
Before working with entities, ensure the following are installed:

- Java Development Kit (JDK 17 or later) → required for running the Spring Boot project.
- Maven (3.8+) → used for dependency management and build automation.
- MySQL 8.0+ → the relational database system that stores users, roles, and locations.
- IntelliJ IDEA (Recommended IDE) → while any IDE can be used (Eclipse, VS Code, NetBeans), IntelliJ IDEA offers the best integration with Spring Boot and Hibernate.

### 2.2 Why Hibernate/JPA?
We chose Hibernate (via JPA annotations) because it:
- Simplifies database interactions (no need to write SQL for common CRUD).
- Keeps database schema and Java classes synchronized.
- Handles relationships (One-to-Many, Many-to-Many) through annotations instead of manual join queries.
- Plays well with Spring Boot’s dependency injection and repository pattern.

![alt text](./Management_images/MD1_images/FolderSetup.png)

### 2.3 Why this structure?

- entity keeps database-mapped objects organized.
- repository separates persistence logic from business logic.
- service encapsulates operations that use repositories.
- controller exposes REST endpoints for API consumers.
- This layered style is a best practice in Spring Boot projects and keeps the code modular, testable, and easy to expand.

First we must fill the entity folder with java class where we will Ensure proper JPA annotations (@Entity, @Table, @Id, @ManyToOne, @ManyToMany, etc.). Each database table is mirrored as a Java entity class. Annotations like @Entity, @Table, @Id, and relationships (@ManyToOne, @ManyToMany) map Java objects to SQL tables.

Hibernate allows working with Java objects instead of raw SQL. This makes the code cleaner and less error-prone while still enforcing database constraints.

### 2.4 Creating Entity Classes (`Location`, `AppUser`, `Role`, `UserLocation`).
Place these files inside:
src/main/java/com/example/prototypesetup/entity

`Create the Role.java class`
```java
package com.example.prototypesetup.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    @Column(nullable = false, unique = true, length = 50)
    private String roleName;

    private boolean dlFlag;          // requires Driver’s License?
    private boolean otherPermFlag;   // extra permissions

    // Getters and setters
    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }

    public boolean isDlFlag() { return dlFlag; }
    public void setDlFlag(boolean dlFlag) { this.dlFlag = dlFlag; }

    public boolean isOtherPermFlag() { return otherPermFlag; }
    public void setOtherPermFlag(boolean otherPermFlag) { this.otherPermFlag = otherPermFlag; }
}

```
------
`Create the AppUser.java class`
```java
package com.example.prototypesetup.entity;


import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "app_user")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToMany
    @JoinTable(
        name = "user_location",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    @JsonBackReference
    private Set<Location> locations = new HashSet<>();

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Set<Location> getLocations() { return locations; }
    public void setLocations(Set<Location> locations) { this.locations = locations; }
}

```
------
`Create the Location.java class`
```java
package com.example.prototypesetup.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id") // maps to MySQL column
    private Long locationId;

    @Column(nullable = false, unique = true, length = 100)
    private String locationName;

    private String address;

    // Prevent infinite recursion when serializing
    @ManyToMany(mappedBy = "locations")
    @JsonIgnore
    private Set<AppUser> users = new HashSet<>();

    // Getters and setters
    public Long getLocationId() { return locationId; }
    public void setLocationId(Long locationId) { this.locationId = locationId; }

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Set<AppUser> getUsers() { return users; }
    public void setUsers(Set<AppUser> users) { this.users = users; }
}

```
------
`Create UserLocation.java class`
```java
package com.example.prototypesetup.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_location")
public class UserLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userLocationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    private LocalDateTime assignedAt = LocalDateTime.now();

    // Getters and setters
    public Long getUserLocationId() { return userLocationId; }
    public void setUserLocationId(Long userLocationId) { this.userLocationId = userLocationId; }

    public AppUser getUser() { return user; }
    public void setUser(AppUser user) { this.user = user; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public LocalDateTime getAssignedAt() { return assignedAt; }
    public void setAssignedAt(LocalDateTime assignedAt) { this.assignedAt = assignedAt; }
}

```





## 3. Create pom file

### 3.1 Why pom.xml?

In a Maven-based project, the `pom.xml` (Project Object Model) file is the heart of the build system. It defines all project dependencies, plugins, and build configurations in one central place.  

Without `pom.xml`, developers would need to manually download libraries, manage versions, and set up classpaths — a process that is error-prone and hard to maintain across teams.  

Benefits of using `pom.xml`:  
- **Dependency Management:** Maven automatically downloads required JARs and ensures compatible versions.  
- **Consistency:**  Every developer (or server) builds the project the same way, reducing "works on my machine" issues.  
- **Portability:**  Moving the project to another environment only requires Maven to re-sync dependencies.  
- **Extensibility:**  Plugins (like `spring-boot-maven-plugin`) allow building, packaging, and running the project with simple commands.  

In short, `pom.xml` acts as a blueprint for the project setup, ensuring smooth collaboration and reproducible builds.

### 3.2 Core Dependencies
 Create the pom.xml file in the root directory and include the following dependencies:
- **spring-boot-starter-web:** Enables REST APIs and embedded Tomcat.
- **spring-boot-starter-data-jpa:** Brings Hibernate + JPA.
- **mysql-connector-java:** Allows Spring Boot to talk to MySQL.
- **lombok:** Optional, reduces boilerplate (like getters/setters).
- **spring-boot-starter-test:** Includes JUnit, Mockito, Spring Test.

### 3.3 Full pom.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>prototypesetup</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>Prototype Setup</name>
    <description>Prototype Setup for Tech Loan System</description>

    <properties>
        <java.version>17</java.version>
        <spring-boot.version>3.2.4</spring-boot.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>


    <dependencies>
        <!-- Spring Boot Starter for REST APIs -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot Starter Data JPA (Hibernate + Jakarta Persistence) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Connector (version controlled by Spring Boot) -->
        <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
    <scope>runtime</scope>
</dependency>



        <!-- Lombok (optional, reduces boilerplate getters/setters) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Spring Boot Maven Plugin -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>${spring-boot.version}</version>
            </plugin>
        </plugins>
    </build>

</project>

```

### 3.4 Next Steps
Once the `pom.xml` file is saved, Maven will automatically download the required dependencies.  
You can trigger this by running:  


```bash
mvn clean install
```




## 4. Repository Layer (Spring Data JPA)

The **Repository Layer** is where Spring Data JPA comes in. Instead of writing SQL manually, we create repository interfaces that extend `JpaRepository`. Each entity (User, Role, Location, UserLocation) has a corresponding repository.  

By doing this, Spring Boot generates all the common database operations for us:  
- `save()`:  insert or update an entity  
- `findById()`:  fetch by primary key  
- `findAll()`:  get all records  
- `deleteById()`:  remove a record  

This removes boilerplate code and keeps the focus on business logic instead of persistence details.  

### 4.1 Why Repositories?
- **Separation of Concerns:**  Persistence is isolated from business logic.  
- **Less Code:**  No need to write repetitive CRUD SQL.  
- **Consistency:**  Uses a standard Spring Data pattern recognized by most developers.  
- **Extendable:**  You can add custom query methods (e.g., `findByUsername`, `findByRoleName`) using naming conventions or `@Query` annotations.  

### 4.2 Implementation
- Create one interface per entity inside the `repository` package.  
- Each interface extends `JpaRepository<Entity, PrimaryKeyType>`.  
- Example:  
```java
public interface AppUserRepository extends JpaRepository<AppUser, Integer> {} 
```

### 4.3 Creating Repository Layer Classes (`LocationRepository.java`, `AppUserRepository.java`, `RoleRepository.java`, `UserLocationRepository.java`).
Place these files inside:
src/main/java/com/example/prototypesetup/repository


`Create RoleRepository.java class`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(String roleName);
}
```
------
`Create AppUserRepository.java`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
```
------
`Create LocationRepository.java`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findByLocationName(String locationName);
}
```
------
`Create UserLocationRepository.java (only if you kept UserLocation.java) `
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLocationRepository extends JpaRepository<UserLocation, Long> {
}
```

With repositories in place, the next step is to build the **Service Layer**, which will use these repositories to implement business logic.




## 5. Creating the Hibernate File
The Hibernate (JPA) configuration file is stored in src/main/resources/application.properties. This file acts as the central configuration hub for database connectivity and ORM behavior in the Spring Boot application. By keeping all database connection details here, we gain flexibility — switching from one database system (e.g., MySQL) to another (e.g., PostgreSQL) only requires adjusting this configuration rather than rewriting business logic or entity classes.

The file includes:
- Database connection properties: URL, username, password, and driver class.
- Hibernate (JPA) settings: Whether to auto-generate tables (ddl-auto), show SQL logs, and set the database dialect.
- Logging options: Enable SQL query and parameter logging for debugging.

Below is the example configuration:`application.properties`
```
# Database connection
spring.datasource.url=jdbc:mysql://localhost:3306/tech_loan_system
spring.datasource.username=root
spring.datasource.password=F@110utD05
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate (JPA) settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

# Optional: log SQL queries to console
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

# Show full stack traces in console for debugging
server.error.include-message=always
server.error.include-binding-errors=always
server.error.include-stacktrace=always

# Spring logging
logging.level.org.springframework=DEBUG
logging.level.org.hibernate=DEBUG
```
Tip: For security, credentials like spring.datasource.password should not be committed to version control. Use environment variables or Spring Boot’s application.yml profiles in production.



## 6. Main Application to run hibernate 
Spring Boot eliminates the need to manually configure and start an application server. Instead, it provides a built-in launcher through a main class. This class automatically bootstraps the entire application, including the Hibernate configuration defined earlier.

Our entry point is the PrototypeSetupApplication class:



`PrototypeSetupApplication`
```java
package com.example.prototypesetup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PrototypeSetupApplication {
    public static void main(String[] args) {
        SpringApplication.run(PrototypeSetupApplication.class, args);
    }
}
```
### 6.1 Details
@SpringBootApplication → Marks this class as the starting point. It enables auto-configuration, component scanning, and integrates Spring Boot features.

SpringApplication.run(...) → Launches the application, initializes the Spring context, and connects Hibernate to the configured database.

### 6.2 Running the Application

After writing the main class, we can build and run the project directly from the terminal (root directory of the project):
```bash
mvn clean install
mvn spring-boot:run
```
- mvn clean install → Cleans old builds, compiles the project, and installs dependencies.

- mvn spring-boot:run → Starts the application using the embedded Tomcat server with Hibernate initialized.

Once running, Spring Boot automatically connects to the database defined in application.properties. Any entity classes you created earlier will be mapped to their respective tables in the database.



## 7. Controllers Layer

The Controller Layer is responsible for exposing REST endpoints to the outside world. Controllers receive HTTP requests (such as GET, POST, PUT, and DELETE) and delegate the business logic to the service or repository layers.

We plan to create controllers for each entity:
- LocationController
- AppUserController
- RoleController
- UserLocationController

These controllers will eventually provide full CRUD endpoints for managing data. 

### 7.1 Testing the Controller Setup

Before implementing entity-specific endpoints, we first confirm that Spring Boot is correctly serving HTTP responses. For this, we add a simple HomeController class:

`Create HomeController.java class`
```java
package com.example.prototypesetup.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Prototype Setup!";
    }
}
```
When the application is running, visiting http://localhost:8080/ in a browser or testing via Postman should return:

```
Welcome to Prototype Setup!
```
This confirms that Spring Boot is:
1. Successfully launching the embedded server.
2. Able to route HTTP requests through a controller.
3. Properly configured with annotations like @RestController and @GetMapping.




-----
`Create LocationController.java class`
```java
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    // GET all locations
    @GetMapping
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

// DTO class inside the controller (or a separate file)
public static class LocationDTO {
    private Long locationId;
    private String locationName;
    private String address;

      // No-args constructor (needed for Jackson serialization)
    public LocationDTO() {}

    public LocationDTO(Long locationId, String locationName, String address) {
        this.locationId = locationId;
        this.locationName = locationName;
        this.address = address;
    }

    // Getters
    public Long getLocationId() { return locationId; }
    public String getLocationName() { return locationName; }
    public String getAddress() { return address; }

  // Setters
    public void setLocationId(Long locationId) { this.locationId = locationId; }
    public void setLocationName(String locationName) { this.locationName = locationName; }
    public void setAddress(String address) { this.address = address; }


}


@GetMapping("/{id}")
public ResponseEntity<?> getLocationTest(@PathVariable("id") Long id) {
    Location location = locationRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found with id " + id));

    Map<String, Object> result = new HashMap<>();
    result.put("locationId", location.getLocationId());
    result.put("locationName", location.getLocationName());
    result.put("address", location.getAddress());

    return ResponseEntity.ok(result);
}

    // CREATE location
    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        return locationRepository.save(location);
    }

// UPDATE location
@PutMapping("/{id}")
public ResponseEntity<Location> updateLocation(@PathVariable("id") Long id, @RequestBody Location updatedLocation) {
    Location location = locationRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found with id " + id));

    location.setLocationName(updatedLocation.getLocationName());
    location.setAddress(updatedLocation.getAddress());

    Location savedLocation = locationRepository.save(location);
    return ResponseEntity.ok(savedLocation);
}

// DELETE location safely
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteLocation(@PathVariable("id") Long id) {
    Location location = locationRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found with id " + id));

    // Remove associations with users to avoid foreign key constraint issues
    location.getUsers().forEach(user -> user.getLocations().remove(location));

    locationRepository.delete(location);
    return ResponseEntity.noContent().build(); // HTTP 204 No Content
}

}

```
-----
`Create AppUserController.java class`
```java
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class AppUserController {

    @Autowired
    private AppUserRepository appUserRepository;

    // GET all users
    @GetMapping
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    @GetMapping("/{id}")
public ResponseEntity<AppUser> getUserById(@PathVariable("id") Long id) {
    return appUserRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

    // CREATE user
    @PostMapping
    public AppUser createUser(@RequestBody AppUser user) {
        return appUserRepository.save(user);
    }

    // UPDATE user
@PutMapping("/{id}")
public ResponseEntity<AppUser> updateUser(@PathVariable("id") Long id, @RequestBody AppUser updatedUser) {
    return appUserRepository.findById(id).map(user -> {
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        if (updatedUser.getRole() != null) {
            user.setRole(updatedUser.getRole());
        }
        AppUser savedUser = appUserRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }).orElse(ResponseEntity.notFound().build());
}


    // DELETE user
    @DeleteMapping("/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
    if (appUserRepository.existsById(id)) {
        appUserRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
    }
}

}

```
-----
`Create RoleController.java class`
```java
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.Role;
import com.example.prototypesetup.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    // GET all roles
    @GetMapping
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // GET role by ID safely
    @GetMapping("/{id}")
    public ResponseEntity<?> getRoleById(@PathVariable("id") Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

        Map<String, Object> result = new HashMap<>();
        result.put("roleId", role.getRoleId());
        result.put("roleName", role.getRoleName());

        return ResponseEntity.ok(result);
    }

    // CREATE role
    @PostMapping
    public Role createRole(@RequestBody Role role) {
        return roleRepository.save(role);
    }

    // UPDATE role
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRole(@PathVariable("id") Long id, @RequestBody Role updatedRole) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

        role.setRoleName(updatedRole.getRoleName());
        roleRepository.save(role);

        Map<String, Object> result = new HashMap<>();
        result.put("roleId", role.getRoleId());
        result.put("roleName", role.getRoleName());

        return ResponseEntity.ok(result);
    }

    // DELETE role safely
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable("id") Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));



        roleRepository.delete(role);
        return ResponseEntity.noContent().build();
    }
}
```
----
`Create UserLocationController.java class (Optional)`
```java 
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.entity.UserLocation;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.LocationRepository;
import com.example.prototypesetup.repository.UserLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/user-locations")
public class UserLocationController {

    @Autowired
    private UserLocationRepository userLocationRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private LocationRepository locationRepository;

    // GET all user-location links
    @GetMapping
    public List<UserLocation> getAll() {
        return userLocationRepository.findAll();
    }

    // GET one by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserLocation> getById(@PathVariable("id") Long id) {
        return userLocationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE link (pass userId + locationId) 
    @PostMapping public ResponseEntity<UserLocation> create( @RequestParam("userId") Long userId, @RequestParam("locationId") Long locationId) {
        AppUser user = appUserRepository.findById(userId).orElse(null); 
        Location location = locationRepository.findById(locationId).orElse(null); 
        
        if (user == null || location == null) { 
        return ResponseEntity.badRequest().build(); 
        } 
        
        UserLocation ul = new UserLocation(); 
        ul.setUser(user); 
        ul.setLocation(location); 
        ul.setAssignedAt(LocalDateTime.now()); 
        
        return ResponseEntity.ok(userLocationRepository.save(ul)); 
    }
    

 // UPDATE (reassign user or location)

// DTO for update request
public static class UserLocationUpdateRequest {
    public Long userId;
    public Long locationId;
}

@PutMapping("/{id}")
public ResponseEntity<UserLocation> update(
        @PathVariable("id") Long id,
        @RequestBody UserLocationUpdateRequest request) {

    Optional<UserLocation> optionalUL = userLocationRepository.findById(id);
    if (!optionalUL.isPresent()) {
        return ResponseEntity.notFound().build();
    }

    AppUser user = appUserRepository.findById(request.userId).orElse(null);
    Location location = locationRepository.findById(request.locationId).orElse(null);

    if (user == null || location == null) {
        return ResponseEntity.badRequest().build();
    }

    UserLocation ul = optionalUL.get();
    ul.setUser(user);
    ul.setLocation(location);
    ul.setAssignedAt(LocalDateTime.now());

    return ResponseEntity.ok(userLocationRepository.save(ul));
}


  // DELETE link
@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
    Optional<UserLocation> optionalUL = userLocationRepository.findById(id);

    if (optionalUL.isPresent()) {
        userLocationRepository.delete(optionalUL.get());
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
    }
}

}
```


## 8 Complete Folder with all classesd and files
The image below shows the complete folder structure of the project with all classes and files in place. This provides a quick visual reference for where each component lives (entities, repositories, services, controllers, configuration, and resources).

![alt text](./Management_images/MD1_images/CompleteFolder.png)

### Key points to note:
- **`src/main/java/com/example/prototypesetup/entity:`**  Contains all JPA entity classes.
- **`src/main/java/com/example/prototypesetup/repository:`** Contains repository interfaces.
- **`src/main/java/com/example/prototypesetup/service:`** (Optional) Service layer classes for business logic.
- **`src/main/java/com/example/prototypesetup/controller:`** REST controllers exposing endpoints.
- **`src/main/resources:`** Configuration files, including application.properties and any static resources.
- **`pom.xml:`** Centralized dependency and build management.

This layout follows Spring Boot best practices: separating concerns, keeping files modular, and making it easier to maintain or expand in the future.

### IDE Setup Note:
- Import the project as a Maven project in IntelliJ IDEA (or your preferred IDE).
- Ensure Maven dependencies are refreshed and the project compiles successfully.
- This layout ensures Spring Boot and Hibernate can locate all entities, repositories, and controllers, preventing runtime errors.

---