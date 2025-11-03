# Location(CRUD) + Admin Management API

**Author:** Jose Cartagena  
**Course:** COP-3330C-14319  
**Project:** Location CRUD + Management (Admin)

This project implements a Location Management API backed by a MySQL database. A new database called tech_loan_system was created to serve as the backend data store for the API. Within this database, tables were designed to represent the core entities of the system, such as Location, AppUser, and Role.

Relationships between entities were established to reflect real-world interactions. For example, users can be linked to multiple locations and roles, enabling flexible management of access and permissions. This relational structure provides a strong foundation for the API, ensuring that data can be stored, retrieved, and managed effectively through the application.

The diagram below illustrates how the entities interact and how data flows through the system:

![alt text](../../../MD1_images/ProjectGraph.png)

Using this database structure, the API is able to map each table to a corresponding Java entity using Hibernate (JPA). These entities serve as the foundation for repositories, services, and controllers, allowing the application to perform CRUD operations on the data. The following sections will guide you through setting up the project environment, configuring dependencies, and preparing the application for development and testing.

## 1. Database Setup
For the initial database configuration, we followed the structure and conventions outlined in `[COOL Database Setup Guide (Dev Testing)]` created by Nova Robb. That document provides detailed SQL table creation scripts, relationships, and sample data for the core entities.

In this section, we build upon that foundation by referencing the same schema and focusing on how our implementation integrates these tables into our Spring Boot application for API testing and validation.
### Requirements
- MySQL 8.0+  
- A database named `tech_loan_system` (or update `application.properties` with your DB name). 
- Configure connection in `application.properties`.

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

![alt text](../../../MD1_images/FolderSetup.png)

### 2.3 Why this structure?

- entity keeps database-mapped objects organized.
- repository separates persistence logic from business logic.
- service encapsulates operations that use repositories.
- controller exposes REST endpoints for API consumers.
- This layered style is a best practice in Spring Boot projects and keeps the code modular, testable, and easy to expand.

First we must fill the entity folder with java class where we will Ensure proper JPA annotations (@Entity, @Table, @Id, @ManyToOne, @ManyToMany, etc.). Each database table is mirrored as a Java entity class. Annotations like @Entity, @Table, @Id, and relationships (@ManyToOne, @ManyToMany) map Java objects to SQL tables.

Hibernate allows working with Java objects instead of raw SQL. This makes the code cleaner and less error-prone while still enforcing database constraints.

### 2.4 Creating Entity Classes (`AppUser`,`Device`,`DeviceStatus`,`DeviceType`,`UserLocation`,`UserLocationid`,`Location`,`UserLocationAccess`,`UserLocationAccessid`,`UserRole`).

This section will be a bit larger so that we could work on all sections of the Location Management section.
Place these files inside:
java/com/example/prototypesetup/entity

`AppUser.java`
```java
package com.example.prototypesetup.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "app_user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "app_user_id")
    private Long userId;

    @Column(name = "app_user_full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "user_role_id", nullable = false)
    private UserRole role;

    // Citizen-specific fields
    @Column(name = "dl_num", length = 50)
    private String dlNum;

    @Column(name = "dl_state", length = 2)
    private String dlState;

    @Column(name = "street_address", length = 255)
    private String streetAddress;

    @Column(length = 100)
    private String city;

    @Column(length = 2)
    private String state;

    @Column(name = "zip_code", length = 10)
    private String zipCode;

    @Column(name = "contact_number", length = 20)
    private String contactNumber;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
        name = "user_location",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    
    @JsonBackReference
    private Set<Location> locations = new HashSet<>();
}

```

---
`Device.java`
```java
package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id")
    private Long deviceId;

    @Column(name = "device_name", nullable = false)
    private String deviceName;

    @Column(name = "serial_number", nullable = false)
    private String serialNumber;

    @ManyToOne
    @JoinColumn(name = "device_type_id", nullable = false)
    private DeviceType type;

    @ManyToOne
    @JoinColumn(name = "device_status_id", nullable = false)
    private DeviceStatus status;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private AppUser createdBy;

    @Column(name = "created_at", insertable = false, updatable = false)
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private java.time.LocalDateTime updatedAt;

    @Override
    public String toString() {
        return "Device{" +
                "deviceId=" + deviceId +
                ", deviceName='" + deviceName + '\'' +
                ", type=" + (type != null ? type.getDeviceTypeName() : "null") +
                ", status=" + (status != null ? status.getStatusName() : "null") +
                ", location=" + (location != null ? location.getLocationName() : "null") +
                ", createdBy=" + (createdBy != null ? createdBy.getFullName() : "null") +
                '}';
    }
}



```

---
`DeviceStatus.java`
```java
package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "device_status")
public class DeviceStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_status_id")
    private Integer deviceStatusId;

    @Column(name = "status_name", nullable = false)
    private String statusName;
}

```

---
`DeviceType.java`
```java
package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "device_type")
public class DeviceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_type_id")
    private Integer deviceTypeId;

    @Column(name = "device_type_name", nullable = false)
    private String deviceTypeName;
}

```

---
`Location`
```java
package com.example.prototypesetup.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "location")
public class Location {

      @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Integer locationId;

    @Column(name = "location_name", nullable = false)
    private String locationName;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "city")
    private String city;

    @Column(name = "state", length = 2)
    private String state;

    @Column(name = "zip_code", length = 10)
    private String zipCode;

    @Column(name = "contact_number", length = 20)
    private String contactNumber;

       @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Prevent infinite recursion when serializing
    @ManyToMany(mappedBy = "locations")
    @JsonIgnore
    private Set<AppUser> users = new HashSet<>();

}

```

---
`UserLocation.java`
```java
package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_location")
public class UserLocation {

    @EmbeddedId
    private UserLocationId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private AppUser user;

    @ManyToOne
    @MapsId("locationId")
    @JoinColumn(name = "location_id")
    private Location location;
}

```

---
`UserLocationAccess.java`
```java
package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(UserLocationAccessId.class)
@Table(name = "user_location_access")
public class UserLocationAccess implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "app_user_id", nullable = false)
    private AppUser appUser;

    @Id
    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

}

```

---
`UserLocationAccessid`
```java
package com.example.prototypesetup.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserLocationAccessId implements Serializable {

    private Long appUser;   // must match entity field name: appUser
    private Integer location;  // must match entity field name: location

    public UserLocationAccessId() {}

    public UserLocationAccessId(Long appUser, Integer location) {
        this.appUser = appUser;
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserLocationAccessId that = (UserLocationAccessId) o;
        return Objects.equals(appUser, that.appUser) &&
               Objects.equals(location, that.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(appUser, location);
    }
}

```

---

`UserLocationid`
```java
package com.example.prototypesetup.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserLocationId implements Serializable {
    private Long userId;
    private Integer locationId;
}
```

---

`UserRole.java`
```java
package com.example.prototypesetup.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_role") // matches your SQL table
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_role_id")
    private Long roleId;

    @Column(name = "user_role_name", nullable = false, unique = true, length = 50)
    private String roleName;

    @Column(name = "dl_required", nullable = false)
    private boolean dlRequired;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    // Getters and setters
    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }

    public boolean isDlRequired() { return dlRequired; }
    public void setDlRequired(boolean dlRequired) { this.dlRequired = dlRequired; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
}
```

---

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

```<?xml version="1.0" encoding="UTF-8"?>
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

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.32</version>
    <scope>provided</scope>
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
    <sourceDirectory>${project.basedir}/java</sourceDirectory>
    <resources>
        <resource>
            <directory>${project.basedir}/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.yml</include>
            </includes>
        </resource>
    </resources>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>3.2.4</version>
            <configuration>
                <mainClass>com.example.prototypesetup.PrototypeSetupApplication</mainClass>
            </configuration>
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

---

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

### 4.3 Creating Repository Layer Classes (`AppUserRepository`,`DeviceRepository`,`DeviceStatusRepository`,`DeviceTypeRepository`,`LocationRepository`,`UserLocationAccessRepository`,`UserLocationRepository`,`UserRoleRepository`).
Place these files inside:
java/com/example/prototypesetup/repository

`AppUserRepository.java`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByfullName(String fullName);
}

```

---
`DeviceRepository.java`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.Device;
import com.example.prototypesetup.entity.DeviceStatus;
import com.example.prototypesetup.entity.DeviceType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

    // Custom finder methods (optional but helpful)
    List<Device> findByStatus(DeviceStatus status);
    List<Device> findByType(DeviceType type);

}

```

---
`DeviceStatusRepository.java`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.DeviceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceStatusRepository extends JpaRepository<DeviceStatus, Integer> {
    // Optional custom methods
}

```

---
`DeviceTypeRepository.java`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.DeviceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceTypeRepository extends JpaRepository<DeviceType, Integer> {
    // You can add custom finder methods if needed, e.g., findByIsActive
}

```

---
`LocationRepository.java`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {
    Location findByLocationName(String locationName);
}

```

---
`UserLocationAccessRepository`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.UserLocationAccess;
import com.example.prototypesetup.entity.UserLocationAccessId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLocationAccessRepository extends JpaRepository<UserLocationAccess, UserLocationAccessId> {
}

```

---
`UserLocationRepository.java`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.UserLocation;
import com.example.prototypesetup.entity.UserLocationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLocationRepository extends JpaRepository<UserLocation, UserLocationId> {
}

```

---
`UserRoleRepository.java`
```java
package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    UserRole findByRoleName(String roleName);
}

```


With repositories in place, the next step is to build the **Service Layer**, which will use these repositories to implement business logic.

---

## 5. Creating the Hibernate File
The Hibernate (JPA) configuration file is stored in src/main/resources/application.properties. This file acts as the central configuration hub for database connectivity and ORM behavior in the Spring Boot application. By keeping all database connection details here, we gain flexibility — switching from one database system (e.g., MySQL) to another (e.g., PostgreSQL) only requires adjusting this configuration rather than rewriting business logic or entity classes.

The file includes:
- Database connection properties: URL, username, password, and driver class.
- Hibernate (JPA) settings: Whether to auto-generate tables (ddl-auto), show SQL logs, and set the database dialect.
- Logging options: Enable SQL query and parameter logging for debugging.

Below is the example configuration:`application.properties`
```# Database connection
spring.datasource.url=jdbc:mysql://localhost:3306/cool_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=cooldev
spring.datasource.password=Password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate (JPA) settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Debug logging
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
logging.level.org.springframework=DEBUG
logging.level.org.hibernate=DEBUG

# Error details
server.error.include-message=always
server.error.include-binding-errors=always
server.error.include-stacktrace=always

```
Tip: For security, credentials like spring.datasource.password should not be committed to version control. Use environment variables or Spring Boot’s application.yml profiles in production.

---

## 6. Main Application to run Hibernate 
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
- @SpringBootApplication → Marks this class as the starting point. It enables auto-configuration, component scanning, and integrates Spring Boot features.

- SpringApplication.run(...) → Launches the application, initializes the Spring context, and connects Hibernate to the configured database.

### 6.2 Running the Application

Before starting the application, make sure Docker is running — this is required for the MySQL container that hosts your project database.
You can verify that Docker is running by using the command at the docker terminal:
```bash
docker ps
```
Expected:
```
CONTAINER ID   IMAGE       COMMAND                  CREATED      STATUS          PORTS                               NAMES     
c10660064467   mysql:8.0   "docker-entrypoint.s…"   3 days ago   Up 14 seconds   0.0.0.0:3306->3306/tcp, 33060/tcp   cool-mysql
```
If the container list shows your MySQL container (e.g., cool_db), then Docker is active and ready.

Next, build and run the Spring Boot project from the root directory:
```bash
mvn clean install
mvn spring-boot:run
```
- mvn clean install → Cleans old builds, compiles the project, and installs dependencies.

- mvn spring-boot:run → Starts the application using the embedded Tomcat server with Hibernate initialized.

Once running, Spring Boot automatically connects to the database defined in application.properties. Any entity classes you created earlier will be mapped to their respective tables in the database.

---

## 7. Controllers Layer

The Controller Layer is responsible for exposing RESTful endpoints to external clients.
Controllers handle incoming HTTP requests (such as GET, POST, PUT, and DELETE) and delegate the underlying operations to the appropriate repository or service layer.

Each controller maps to a specific entity in the system and allows interaction with the database through defined endpoints.

- AppUserController — Manages user accounts, including creation, retrieval, updates, and deletion. Handles linking users to roles and locations.

- DeviceController — Manages devices and their related details such as type, condition, and status.

- HomeController — Serves as the default entry point for the API, providing a welcome or health-check endpoint.

- LocationController — Handles CRUD operations for locations such as community centers and departments.

- UserLocationAccessController — Manages the relationship between users and locations where access permissions are assigned.

- UserLocationController — Manages user-to-location assignments and relationships, ensuring proper mapping between entities.

- UserRoleController — Handles CRUD operations for user roles, defining permissions and user types (e.g., Admin, Citizen, Technician).

These controllers will eventually provide full CRUD endpoints for managing data. 

### 7.1 Testing the Controller Setup

Before implementing entity-specific endpoints, we first confirm that Spring Boot is correctly serving HTTP responses. For this, we add a simple HomeController class:

`AppUserController.java`
```java
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.entity.UserRole;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.LocationRepository;
import com.example.prototypesetup.repository.UserRoleRepository;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/app-users")
public class AppUserController {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private LocationRepository locationRepository;

    // GET all users
    @GetMapping
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    //GET selected
    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable("id") Long id) {
    return appUserRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // CREATE user
   @PostMapping
    public AppUser createUser(@RequestBody AppUser user) {

    // Set role
    UserRole role = userRoleRepository.findById(user.getRole().getRoleId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));

    user.setRole(role);

    // Set locations
    if (user.getLocations() != null && !user.getLocations().isEmpty()) {
    Set<Location> savedLocations = user.getLocations().stream()
        .map(loc -> locationRepository.findById(loc.getLocationId())
            .orElseThrow(() -> new RuntimeException("Location not found with id: " + loc.getLocationId())))
        .collect(Collectors.toSet());
    user.setLocations(savedLocations);
    }

    // Map password to password_hash
    user.setPassword(user.getPassword()); // <- this sets the DB field
    return appUserRepository.save(user);
    }

   // UPDATE user
    @PutMapping("/{id}")
    public ResponseEntity<AppUser> updateUser(@PathVariable("id") Long id, @RequestBody AppUser updatedUser) {
    return appUserRepository.findById(id).map(user -> {
        user.setFullName(updatedUser.getFullName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setStreetAddress(updatedUser.getStreetAddress());
        user.setCity(updatedUser.getCity());
        user.setState(updatedUser.getState());
        user.setZipCode(updatedUser.getZipCode());
        user.setContactNumber(updatedUser.getContactNumber());
        user.setDlNum(updatedUser.getDlNum());
        user.setDlState(updatedUser.getDlState());
        user.setDateOfBirth(updatedUser.getDateOfBirth());

        if (updatedUser.getRole() != null) {
    UserRole role = userRoleRepository.findById(updatedUser.getRole().getRoleId())
    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));
    user.setRole(role);
    }

    if (updatedUser.getLocations() != null) {
    Set<Location> updatedLocations = updatedUser.getLocations().stream()
        .map(loc -> locationRepository.findById(loc.getLocationId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found")))
        .collect(Collectors.toSet());
    user.setLocations(updatedLocations);
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

---
`DeviceController.java`
```java
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.Device;
import com.example.prototypesetup.entity.DeviceStatus;
import com.example.prototypesetup.entity.DeviceType;
import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.repository.DeviceRepository;
import com.example.prototypesetup.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.prototypesetup.repository.DeviceTypeRepository;
import com.example.prototypesetup.repository.DeviceStatusRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

//Class setup / Autowired fields
@Autowired
private DeviceRepository deviceRepository;

@Autowired
private AppUserRepository appUserRepository;


@Autowired
private DeviceTypeRepository deviceTypeRepository;

@Autowired
private DeviceStatusRepository deviceStatusRepository;



    //GET all devices 
    @GetMapping
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    //GET device by ID
    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable("id") Long id) {
        return deviceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //POST
    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
    // Validate createdBy user
    if (device.getCreatedBy() != null) {
    Optional<AppUser> user = appUserRepository.findById(device.getCreatedBy().getUserId());
    if (!user.isPresent()) {
        return ResponseEntity.badRequest().build();
    }
    device.setCreatedBy(user.get());
    }

    // Validate DeviceType
    if (device.getType() != null) {
    Optional<DeviceType> type = deviceTypeRepository.findById(device.getType().getDeviceTypeId());
    if (!type.isPresent()) return ResponseEntity.badRequest().build();
    device.setType(type.get());
    }

    // Validate DeviceStatus
    if (device.getStatus() != null) {
    Optional<DeviceStatus> status = deviceStatusRepository.findById(device.getStatus().getDeviceStatusId());
    if (!status.isPresent()) return ResponseEntity.badRequest().build();
    device.setStatus(status.get());
    }

    Device savedDevice = deviceRepository.save(device);
    return ResponseEntity.ok(savedDevice);
}

    //PUT - Update existing device
    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(
        @PathVariable("id") Long id,
        @RequestBody Device updatedDevice) {

    Device device = deviceRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Device not found"));

    // Update name & serial number
    if (updatedDevice.getDeviceName() != null) device.setDeviceName(updatedDevice.getDeviceName());
    if (updatedDevice.getSerialNumber() != null) device.setSerialNumber(updatedDevice.getSerialNumber());

    // Update DeviceType
    if (updatedDevice.getType() != null) {
        DeviceType type = deviceTypeRepository
            .findById(updatedDevice.getType().getDeviceTypeId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid DeviceType ID"));
        device.setType(type);
    }

    // Update DeviceStatus
    if (updatedDevice.getStatus() != null) {
        DeviceStatus status = deviceStatusRepository
            .findById(updatedDevice.getStatus().getDeviceStatusId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid DeviceStatus ID"));
        device.setStatus(status);
    }

    // Update location
    if (updatedDevice.getLocation() != null) {
        device.setLocation(updatedDevice.getLocation());
    }

    // Update createdBy user
    if (updatedDevice.getCreatedBy() != null) {
        AppUser user = appUserRepository
            .findById(updatedDevice.getCreatedBy().getUserId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid User ID"));
        device.setCreatedBy(user);
    }

    return ResponseEntity.ok(deviceRepository.save(device));
}


    //DELETE - Remove device by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable("id") Long id) {
        Optional<Device> optionalDevice = deviceRepository.findById(id);
        if (optionalDevice.isPresent()) {
            deviceRepository.delete(optionalDevice.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

```

---
`HomeController.java`
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

---
`LocationController.java`
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
import java.util.Optional;


@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    //  GET all locations
    @GetMapping
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // DTO (optional lightweight response structure)
    public static class LocationDTO {
        private Integer locationId;
        private String locationName;
        private String address;

        public LocationDTO() {}
        public LocationDTO(Integer locationId, String locationName, String address) {
            this.locationId = locationId;
            this.locationName = locationName;
            this.address = address;
        }

        public Integer getLocationId() { return locationId; }
        public String getLocationName() { return locationName; }
        public String getAddress() { return address; }

        public void setLocationId(Integer locationId) { this.locationId = locationId; }
        public void setLocationName(String locationName) { this.locationName = locationName; }
        public void setAddress(String address) { this.address = address; }
    }

    // GET single location by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getLocationById(@PathVariable("id") Integer id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found with ID " + id));

        Map<String, Object> result = new HashMap<>();
        result.put("locationId", location.getLocationId());
        result.put("locationName", location.getLocationName());
        result.put("address", location.getStreetAddress());
        result.put("city", location.getCity());
        result.put("state", location.getState());
        result.put("zipCode", location.getZipCode());

        return ResponseEntity.ok(result);
    }

    // CREATE new location
    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        if (location.getLocationName() == null || location.getLocationName().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Location name is required");
        }
        Location saved = locationRepository.save(location);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // UPDATE existing location
    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable("id") Integer id, @RequestBody Location updatedLocation) {
    Location location = locationRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found with id " + id));

    location.setLocationName(updatedLocation.getLocationName());
    location.setStreetAddress(updatedLocation.getStreetAddress());
    location.setCity(updatedLocation.getCity());
    location.setState(updatedLocation.getState());
    location.setZipCode(updatedLocation.getZipCode());
    location.setContactNumber(updatedLocation.getContactNumber());

    Location savedLocation = locationRepository.save(location);
    return ResponseEntity.ok(savedLocation);
}

    // DELETE a location
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable("id") Integer id) {
        Optional<Location> optionalLocation = locationRepository.findById(id);
        if (optionalLocation.isPresent()) {
            locationRepository.delete(optionalLocation.get());
            return ResponseEntity.noContent().build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found with ID " + id);
        }
    }
}
```

---
`UserLocationAccessController.java`
```java
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.entity.UserLocationAccess;
import com.example.prototypesetup.entity.UserLocationAccessId;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.LocationRepository;
import com.example.prototypesetup.repository.UserLocationAccessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.util.List;

@RestController
@RequestMapping("/api/user-locations-access")
public class UserLocationAccessController {

    @Autowired
    private UserLocationAccessRepository userLocationRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private LocationRepository locationRepository;

    // GET all user-location links
    @GetMapping
    public List<UserLocationAccess> getAll() {
        return userLocationRepository.findAll();
    }

    // GET one by ID
   // GET one by ID
    @GetMapping("/{userId}/{locationId}")
    public ResponseEntity<UserLocationAccess> getById(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationAccessId id = new UserLocationAccessId(userId, locationId);
    return userLocationRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // DTO for create request
    public static class UserLocationCreateRequest {
    public Long userId;
    public Integer locationId;
    }

    // POST
    @PostMapping
    public ResponseEntity<UserLocationAccess> create(@RequestBody UserLocationCreateRequest request) {
    AppUser user = appUserRepository.findById(request.userId).orElse(null);
    Location location = locationRepository.findById(request.locationId).orElse(null);

    if (user == null || location == null) {
        return ResponseEntity.badRequest().build();
    }

    UserLocationAccess ul = new UserLocationAccess();
    ul.setAppUser(user);
    ul.setLocation(location);

    return ResponseEntity.ok(userLocationRepository.save(ul));
    }

    // DTO for update request
    public static class UserLocationUpdateRequest {
    public Long newUserId;
    public Integer newLocationId;
    }

    // UPDATE (reassign user or location)
    @PutMapping("/{userId}/{locationId}")
    public ResponseEntity<UserLocationAccess> update(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId,
        @RequestBody UserLocationUpdateRequest request) {

    UserLocationAccessId oldId = new UserLocationAccessId(userId, locationId);
    Optional<UserLocationAccess> optionalUL = userLocationRepository.findById(oldId);

    //if not found = return 404
    if (!optionalUL.isPresent()) {
        return ResponseEntity.notFound().build();
    }

    // update existing
    UserLocationAccess ul = optionalUL.get();

    if (request.newUserId != null) {
        AppUser newUser = appUserRepository.findById(request.newUserId).orElse(null);
        if (newUser == null) return ResponseEntity.badRequest().build();
        ul.setAppUser(newUser);
    }

    if (request.newLocationId != null) {
        Location newLocation = locationRepository.findById(request.newLocationId).orElse(null);
        if (newLocation == null) return ResponseEntity.badRequest().build();
        ul.setLocation(newLocation);
    }

    // save and return updated relationship
    UserLocationAccess updated = userLocationRepository.save(ul);
    return ResponseEntity.ok(updated);
    }

     // DELETE link
    @DeleteMapping("/{userId}/{locationId}")
    public ResponseEntity<Void> deleteUserLocation(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationAccessId id = new UserLocationAccessId(userId, locationId);

    if (userLocationRepository.existsById(id)) {
        userLocationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
        }
    }

}
```

---
`UserLocationController.java`
```java
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.UserLocation;
import com.example.prototypesetup.entity.UserLocationId;
import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.repository.UserLocationRepository;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-locations")
public class UserLocationController {

    @Autowired
    private UserLocationRepository userLocationRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private LocationRepository locationRepository;

    // GET all
    @GetMapping
    public List<UserLocation> getAllUserLocations() {
        return userLocationRepository.findAll();
    }

   // GET one by composite key
    @GetMapping("/{userId}/{locationId}")
    public ResponseEntity<UserLocation> getById(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationId id = new UserLocationId();
    id.setUserId(userId);       // match your UserLocationId field names
    id.setLocationId(locationId);

    return userLocationRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }


    // POST (create new association)
    @PostMapping
    public ResponseEntity<UserLocation> createUserLocation(@RequestBody UserLocation userLocation) {
        Optional<AppUser> user = appUserRepository.findById(userLocation.getUser().getUserId());
        Optional<Location> location = locationRepository.findById(userLocation.getLocation().getLocationId());

        if (!user.isPresent() || !location.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        userLocation.setUser(user.get());
        userLocation.setLocation(location.get());
        userLocation.setId(new UserLocationId(user.get().getUserId(), location.get().getLocationId()));

        return ResponseEntity.ok(userLocationRepository.save(userLocation));
    }


    // DELETE user-location link
    @DeleteMapping("/{userId}/{locationId}")
    public ResponseEntity<Void> deleteUserLocation(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationId id = new UserLocationId(userId, locationId);

    if (userLocationRepository.existsById(id)) {
        userLocationRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    } else {
        return ResponseEntity.notFound().build(); // 404
        }
    }

}
```

---
`UserRoleController.java`
```java
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.UserRole;
import com.example.prototypesetup.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-roles")
public class UserRoleController {

    @Autowired
    private UserRoleRepository roleRepository;

    // GET all roles
    @GetMapping
    public List<UserRole> getAllRoles() {
        return roleRepository.findAll();
    }

     // GET role by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRoleById(@PathVariable(name = "id") Long id) {
    UserRole role = roleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

    Map<String, Object> result = new HashMap<>();
    result.put("roleId", role.getRoleId());
    result.put("roleName", role.getRoleName());

    return ResponseEntity.ok(result);
    }


    // CREATE role
    @PostMapping
    public UserRole createRole(@RequestBody UserRole role) {
        return roleRepository.save(role);
    }

     // UPDATE role
    @PutMapping("/{id}")
    public UserRole updateRole(@PathVariable("id") Long id, @RequestBody UserRole updatedRole) {
    UserRole role = roleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

    role.setRoleName(updatedRole.getRoleName());
    role.setDlRequired(updatedRole.isDlRequired());
    role.setActive(updatedRole.isActive());

    return roleRepository.save(role);
    }


    // DELETE role
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable("id") Long id) {
    UserRole role = roleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

    roleRepository.delete(role);
    return ResponseEntity.noContent().build();
    }

}

```

---

## 8 Complete Folder with all classesd and files
The image below shows the complete folder structure of the project with all classes and files in place. This provides a quick visual reference for where each component lives (entities, repositories, services, controllers, configuration, and resources).

![alt text](../../../MD1_images/CompleteFolder.png)

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