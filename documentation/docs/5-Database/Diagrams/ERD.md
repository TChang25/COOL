<script src="https://unpkg.com/mermaid@10/dist/mermaid.min.js"></script>
<script>mermaid.initialize({ startOnLoad: true });</script>

Please ensure to run this in mkdocs serve or deploy for complete rendering of the ERD diagram.

<div class="mermaid">
---
title: "City of Orlando Loaners (COOL)"
---

erDiagram
    %% ===[ LOOKUP TABLES ]===
    user_role {
        %% [LOOKUP] Defines Admin, Employee, Citizen and flags like dl_required (citizen ONLY)
        INT user_role_id PK
        
        VARCHAR(50) user_role_name "Admin, Employee, Citizen (NOT NULL UNIQUE)"
        BOOLEAN dl_required "(1 = DL REQUIRED), (0 = NOT required), (NOT NULL)"
        
        %% useful for debugging user roles
        BOOLEAN is_active "(DEFAULT TRUE)" 
    }

    user_action_type {
        %% [LOOKUP] Defines system-wide actions by any user
        %% MVP 2.0 might want to include: Login, Logout, Export, Update
        %% This is used by action_log to describe *what* the user did
        INT user_action_type_id PK
       
        VARCHAR(50) user_action_name "Create, Read, Update, Delete (NOT NULL UNIQUE)"
        BOOLEAN is_active "(DEFAULT TRUE NOT NULL)"
    }

    device_type {
        %% [LOOKUP] Allowed types of devices in the system
        INT device_type_id PK
       
        VARCHAR(50) device_type_name "Mobile Phone, Laptop, Tablet, etc. (NOT NULL UNIQUE)"
        BOOLEAN is_active "(DEFAULT TRUE)"
    }

    device_status{
        %% [LOOKUP] Allowed device states
        INT device_status_id PK
        
        VARCHAR(50) device_status_name "Available, Loaned, Maintenance, Retired, Lost (NOT NULL UNIQUE)"
    }

    device_condition {
        %% [LOOKUP] Allowed physical condition values
        INT device_condition_id PK
       
        VARCHAR(50) device_condition_name "Excellent, Good, Fair, Poor, Damaged, (NOT NULL UNIQUE)"
    }

    loan_status {
        %% [LOOKUP] Allowed loan lifecycle states
        INT loan_status_id PK
       
        VARCHAR(50) loan_status_name "Open, Returned, Overdue, Lost, (NOT NULL UNIQUE)" 
    }

    loan_action_type {
        %% [LOOKUP] Defines loan-specific actions
        INT loan_action_type_id PK
       
        VARCHAR(50) loan_action_type_name "Checkout, Return, Status_Change, (NOT NULL UNIQUE)"
       
        %% allows you to turn off loans durings maintenance
        BOOLEAN is_active "(DEFAULT TRUE)" 
    }

    transaction_status {
       %% [LOOKUP] Defines the outcome of a logged action
       INT transaction_status_id PK
       
       VARCHAR(50) transaction_status_name "Success, Failed, Pending, (NOT NULL UNIQUE)"
    }

    %% ===[ CORE ENTITY TABLES ]===
    
    app_user {
        %% [CORE] All users (Admins, Employees, Citizens)
        %% NOTE: Initialize with root admin  
        BIGINT app_user_id PK
       
        VARCHAR(100) app_user_full_name "(NOT NULL)"
        VARCHAR(100) email "(UNIQUE NOT NULL)"
        VARCHAR(255) password_hash "(NOT NULL)"
        VARBINARY(64) password_salt "per-user salt for hashing passwords NOT NULL"
        
        %% INT role_id (NOT NULL) Ensures that every user has a role, a user cannot exist in the system without one
        INT user_role_id FK "NOT NULL"  
       
        VARCHAR(50) dl_num "(nullable unless role.dl_required = 1)"
        CHAR(2) dl_state "Citizen DL state"
        VARCHAR(255) street_address "Citizen address"
        VARCHAR(100) city "Citizen City"
        CHAR(2) state "Citizen State"
        VARCHAR(10) zip_code "Citizen zip code" 
        DATE date_of_birth "Citizen DOB"
        VARCHAR(20) phone_number "Citizen phone number"
       
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    location {
        %% [CORE] Community Center Sites
        INT location_id PK
      
        VARCHAR(100) location_name "NOT NULL"
        VARCHAR(255) street_address "Community Center address"
        VARCHAR(100) city "Community Center city"
        CHAR(2) state "Community Center state"
        VARCHAR(10) zip_code "community center zip"
        VARCHAR(20) contact_phone "Community Center phone"
      
        TIMESTAMP created_at 
        TIMESTAMP updated_at
    }

    bin {
        %% [CORE] Physical bins used to contain devices (laptops, hotspots, tablets, accessories)
        INT bin_id PK 
        VARCHAR(255) bin_contents "Bin contents (NOT NULL) - example: Laptop + hotspot, tablet, hotspot"

        BIGINT device_id FK "Points to the device table (nullable if bin is empty)"
        INT location_id FK "Points to location table (NOT NULL)"
        BIGINT created_by_user_id FK "A bin must have a creator (employee),(NOT NULL)"

        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    device {
        %% [CORE] Physical devices that can be loaned
        BIGINT device_id PK
      
        VARCHAR(100) device_name "(NOT NULL)"
        INT device_type_id FK "Points to device_type"
        VARCHAR(100) serial_number "(NOT NULL UNIQUE)"
        
        %% device_status_id FK - This column links each device to a row in the device_status table. 
        %% For example: A device might have a status of "Available" or "Loaned".
        %% This tracks the device's current state (Avail, Loaned, Maintenance, Retired, Lost)
        %% Allows for easy changes by an admin
        INT device_status_id FK  
        
        INT location_id FK

        %% The user ID of the employee who registered this device.        
        BIGINT created_by_user_id FK "A device must have a creator (employee),(NOT NULL)"
        
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    loan {
        %% [CORE] One device loaned to a citizen, process by an employee
        INT loan_id PK 
       
        BIGINT citizen_id FK "Points to app_user (the borrower)(NOT NULL)"
        BIGINT employee_id FK "Points to app_user (staff)(NOT NULL)"
        BIGINT device_id FK
        INT loan_status_id FK "Points to loan_status (Open, Returned,etc.)"
       
        TIMESTAMP start_at "when the loan begin (NOT NULL)"
        TIMESTAMP due_at "when the device should be returned (NOT NULL)"
        TIMESTAMP returned_at "when the device was actually returned"
        
        INT loan_condition_id FK "points to device_condition"
        TEXT loan_condition_notes
        INT return_condition_id FK "points to device_condition"
        TEXT return_condition_notes

        DECIMAL damage_fee 
        BOOLEAN all_accessories_returned
        TEXT missing_accessories
        TEXT notes
       
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    loan_log {
        %% [CORE] Audit trail of actions on a loan
        INT loan_log_id PK 
       
        INT loan_id FK "Which loan this action belongs to (NOT NULL)"
        BIGINT app_user_id FK "Points to app_user (NOT NULL)"
        INT loan_action_type_id FK "Points to loan_action_type (NOT NULL)"
        VARCHAR(255) success_message
        INT transaction_status_id FK "Points to transaction_status table"
        TEXT error_details
        TIMESTAMP loan_timestamp "DEFAULT CURRENT_TIMESTAMP"
    }

    action_log {
        %% [CORE] System-wide audit trail of all user actions
        BIGINT action_log_id PK
      
        BIGINT app_user_id FK "Points to app_user (NOT NULL)"
        INT user_action_type_id FK "Points to user_action_type (NOT NULL)"

        %% Links this log entry to a specific USER row affected by the action, if applicable
        %% Lets auditors and developers trace which user account was created, updated, or deleted. 
        %% Supports queries like: "Show all actions performed on user_id = 12345"
        BIGINT user_record_id FK

        %% Points to the exact LOAN row affected by the action, if applicable
        %% Critical for reconstructing loan history, troubleshooting overdue returns, and auditing loan 
        %% transactions. 
        %% Supports queries like: "Show all actions performed on loan_id = 67890"
        INT loan_record_id FK

        %% Identifies the specific DEVICE row affected by the action, if applicable
        %% Essential for tracking device lifecycle events, status changes, maintenance history,
        %% or changes to inventory status (e.g. "who retired device_id = 54321?")
        BIGINT device_record_id FK

        %% CHECK CONSTRAINT: Exactly one of user_record_id, loan_record_id, or device_record_id must be NON-NULL (you need at least one per row)

        VARCHAR(500) current_url "Webpage user was on"
        VARCHAR(500) api_endpoint "API endpoint called" 
                
        TEXT action_details "Additional context"
        TIMESTAMP created_at "(DEFAULT CURRENT_TIMESTAMP)"
   } 

    %% ===[ JOIN TABLE ]===
    user_location_access {
        %% [JOIN] Allows one employee to work at many locations, and one location to have many employees
        BIGINT app_user_id FK "(NOT NULL)"
      
        INT location_id FK "(NOT NULL)"
        %% PK (app_user_id, location_id)
    }

    %% ===[ RELATIONSHIPS ]===

    user_role ||--o{ app_user : "user_role_id"

    loan_status ||--o{ loan : "loan_status_id"
    device_condition ||--o{ loan : "loan_condition_id"
    device_condition ||--o{ loan : "return_condition_id"
    app_user ||--o{ loan : "citizen_id"
    app_user ||--o{ loan : "employee_id"
    device ||--o{ loan : "device_id"

    app_user ||--o{ user_location_access : "app_user_id"
    location ||--o{ user_location_access : "location_id"   
    
    app_user ||--o{ device : "created_by_user_id"
    device_status ||--o{ device : "device_status_id"
    device_type ||--o{ device : "device_type_id"
    location ||--o{ device : "location_id"

    loan ||--o{ loan_log : "loan_id"
    app_user ||--o{ loan_log : "app_user_id"
    loan_action_type ||--o{ loan_log : "loan_action_type_id"
    transaction_status ||--o{ loan_log : "transaction_status_id"

    app_user ||--o{ action_log : "app_user_id"
    app_user ||--o{ action_log : "user_record_id"
    loan ||--o{ action_log : "loan_record_id"
    device ||--o{ action_log : "device_record_id"
    user_action_type ||--o{ action_log : "user_action_type_id"

    device ||--o{ bin : "device_id"
    location ||--o{ bin : "location_id"
</div>




