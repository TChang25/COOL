-- DDL SCRIPT FOR CEN4910 PROJECT: CITY OF ORLANDO LOANERS (COOL) DATABASE 

-- Notes: Script is ordered by dependency.
--       1. Lookup tables (no external dependencies)
--       2. Core entity tables (depend on lookups)
--       3. Join tables (depend on core entities)

-- Temporarily disable foreign key checks to allow table creation in any order
-- Prevents "table doesn't exist" errors during initial setup
SET FOREIGN_KEY_CHECKS = 0; 

-- ===================================================
-- 1. LOOKUP TABLES
-- ===================================================

-- Defines user roles and their attributes. [LOOKUP]
CREATE TABLE user_role (
    user_role_id INT PRIMARY KEY AUTO_INCREMENT, 
    user_role_name VARCHAR(50) NOT NULL UNIQUE, -- Admin, Employee, Citizen
    dl_required BOOLEAN NOT NULL DEFAULT 0, -- (1 = dl REQUIRED, 0 = dl NOT REQUIRED)
    is_active BOOLEAN NOT NULL DEFAULT TRUE -- (1 = role ACTIVE, 0 = role INACTIVE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Defines the types of actions that users can perform in the system. [LOOKUP]
CREATE TABLE user_action_type (
    user_action_type_id INT PRIMARY KEY AUTO_INCREMENT,
    user_action_type_name VARCHAR(50) NOT NULL UNIQUE, -- (Create, Read, Update, Delete)
    is_active BOOLEAN NOT NULL DEFAULT TRUE -- (1 = action ACTIVE, 0 = action INACTIVE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Defines the allowed types of devices in the system. [LOOKUP]
CREATE TABLE device_type (
    device_type_id INT PRIMARY KEY AUTO_INCREMENT, 
    device_type_name VARCHAR(50) NOT NULL UNIQUE, -- (Tablet, Laptop, Hotspot)
    is_active BOOLEAN NOT NULL DEFAULT TRUE -- (1 = type ACTIVE, 0 = type INACTIVE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Defines the allowed states for a device. [LOOKUP]
CREATE TABLE device_status (
    device_status_id INT PRIMARY KEY AUTO_INCREMENT,
    device_status_name VARCHAR(50) NOT NULL UNIQUE -- (Available, Loaned, Maintenance, Retired, Lost)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Defines the allowed physical condition values for a device. [LOOKUP]
CREATE TABLE device_condition (
    device_condition_id INT PRIMARY KEY AUTO_INCREMENT,
    device_condition_name VARCHAR(50) NOT NULL UNIQUE -- (Excellent, Good, Fair, Poor, Damaged)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Defines the lifecycle states for a loan. [LOOKUP]
CREATE TABLE loan_status (
    loan_status_id INT PRIMARY KEY AUTO_INCREMENT,
    loan_status_name VARCHAR(50) NOT NULL UNIQUE -- (Open, Returned, Overdue, Lost, Cancelled)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Defines actions specific to a loan transaction. [LOOKUP]
CREATE TABLE loan_action_type (
    loan_action_type_id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- This covers the cases when a device might need a status change outside of a normal checkout/return
    loan_action_name VARCHAR(50) NOT NULL UNIQUE, -- (Checkout, Return, Status_Change, (NOT NULL UNIQUE))
   
    is_active BOOLEAN NOT NULL DEFAULT TRUE -- (1 = action ACTIVE, 0 = action INACTIVE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Defines the outcome of a logged action. [LOOKUP]
CREATE TABLE transaction_status (
    transaction_status_id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_status_name VARCHAR(50) NOT NULL UNIQUE  -- Success, Failure, Pending
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- ===================================================
-- 2. CORE ENTITY TABLES
-- ===================================================

-- Stores user account information and links to the roles table. [CORE ENTITY]
CREATE TABLE app_user (
    app_user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    -- Ensures every user has a role, a user cannot exist in the system without one
    user_role_id INT NOT NULL,

    -- Citizen-specific fields (nullable if role does not require DL)
    dl_num VARCHAR(50), -- (nullable unless role.dl_required = 1)
    dl_state CHAR(2), -- Citizen DL state
    address VARCHAR(255), -- Citizen address
    city VARCHAR(100), -- Citizen city
    state CHAR(2), -- Citizen state
    zip_code VARCHAR(10), -- Citizen zip code
    date_of_birth DATE, -- Citizen DOB
    contact_number VARCHAR(20), -- Citizen contact number
    
    -- Auto-updates timestamp whenever the row is modified (on update CURRENT_TIMESTAMP)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE, -- (TRUE = active user, FALSE = deactivated user) Used for soft deletes (employees on leave/quitting/rehires) and account suspensions

    -- Enforce referential integrity with user_role table
    CONSTRAINT fk_app_user_role 
        FOREIGN KEY (user_role_id) REFERENCES user_role(user_role_id)
        ON DELETE RESTRICT -- prevents deletion of a role if users are assigned to it
        ON UPDATE NO ACTION -- role ids are immutable
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Stores all community center locations. [CORE ENTITY]
CREATE TABLE location (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(100) NOT NULL,
    address VARCHAR(255), 
    city VARCHAR(100), 
    state CHAR(2), 
    zip_code VARCHAR(10),
    contact_number VARCHAR(20),
    
    -- Auto-updates timestamp whenever the row is modified (on update CURRENT_TIMESTAMP)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Stores information about each physical device that can be loaned. [CORE ENTITY]
CREATE TABLE device (
    device_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    
    -- a device's name and type are critical attributes and cannot be empty
    device_name VARCHAR(100) NOT NULL,
    device_type_id INT NOT NULL,
   
    -- serial_number must be unique to prevent duplicate entries
    serial_number VARCHAR(100) NOT NULL UNIQUE,
    device_status_id INT NOT NULL,
    location_id INT NOT NULL,
    
    -- The user ID of the employee who registered this device.
    created_by_user_id BIGINT NOT NULL, -- a device must have a creator (employee)

    -- Auto-updates timestamp whenever the row is modified (on update CURRENT_TIMESTAMP)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_device_type 
        FOREIGN KEY (device_type_id) REFERENCES device_type(device_type_id)
        ON DELETE RESTRICT -- prevents deletion of a device type if devices are assigned to it
        ON UPDATE CASCADE, -- if a device_type_id changes, all linked devices are updated automatically to stay in sync

    CONSTRAINT fk_device_status 
        FOREIGN KEY (device_status_id) REFERENCES device_status(device_status_id)
        ON DELETE RESTRICT -- prevents deletion of a device status if devices are assigned to it
        ON UPDATE CASCADE, -- if a device_status_id changes, all linked devices are updated automatically to stay in sync

    CONSTRAINT fk_device_location
        FOREIGN KEY (location_id) REFERENCES location(location_id)
        ON DELETE RESTRICT -- prevents deletion of a location if devices are assigned to it
        ON UPDATE NO ACTION, -- location_id should rarely change, handle at application level

    CONSTRAINT fk_device_creator
        FOREIGN KEY (created_by_user_id) REFERENCES app_user(app_user_id)
        
        -- a creator_user_id must always reference a valid employee user
        -- for auditing purposes, prevents deletion of an employee if they created devices (preserves the audit trail, no orphaned records, no lost accountability)
        -- to retire a user, set their role to inactive instead of deleting them. 
        ON DELETE RESTRICT -- prevents deletion of an employee if they created devices (preserves the audit trail, no orphaned records, no lost accountability)
        ON UPDATE NO ACTION -- created_by_user_id is a surrogate key
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Stores information about storage bins for organizing devices at locations. [CORE ENTITY]
CREATE TABLE bin (
    bin_id INT PRIMARY KEY AUTO_INCREMENT,
    asset_tag VARCHAR(50) NOT NULL UNIQUE, -- unique identifier for the bin used for inventory tracking (bin # already in use by county)
    bin_contents VARCHAR(255), -- description of what is stored in the bin (e.g. "Laptop + hotspot", "Tablet", etc.)
    created_by_user_id BIGINT NOT NULL, -- a bin must have a creator (employee)

    device_id BIGINT, -- can be NULL if bin is empty
    location_id INT NOT NULL, -- a bin must be associated with a location

    -- Auto-updates timestamp whenever the row is modified (on update CURRENT_TIMESTAMP)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_bin_device
        FOREIGN KEY (device_id) REFERENCES device(device_id)
        ON DELETE SET NULL -- if a device is deleted, set device_id to NULL (to allow reusing the bin)
        ON UPDATE CASCADE, -- if a device_id changes, all linked bins are updated automatically to stay in sync (to avoid orphaned bins)

    CONSTRAINT fk_bin_location
        FOREIGN KEY (location_id) REFERENCES location(location_id)
        ON DELETE RESTRICT -- prevents deletion of a location if bins are assigned to it
        ON UPDATE NO ACTION, -- location_id should rarely change, handle at application level

    CONSTRAINT fk_bin_creator
        FOREIGN KEY (created_by_user_id) REFERENCES app_user(app_user_id)
        ON DELETE RESTRICT -- prevents deletion of an employee if they created bins (preserves the audit trail, no orphaned records, no lost accountability)
        ON UPDATE NO ACTION -- user_id is a surrogate key
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Tracks each loan transaction, linking a device to a citizen and employee. [CORE ENTITY]
CREATE TABLE loan (
    loan_id INT PRIMARY KEY AUTO_INCREMENT,
    bin_id INT NOT NULL, -- loan references the bin the device came from
    loan_status_id INT NOT NULL, -- a loan must have a status

    -- The user who is borrowing the device (citizen) and the employee processing the loan
    citizen_id BIGINT NOT NULL, -- a loan must be associated with a citizen
    employee_id BIGINT NOT NULL, -- a loan must be processed by an employee
          
    start_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- TIMESTAMP automatically records the loan's start time, this cannot be empty
    due_at TIMESTAMP NOT NULL, -- a loan must have a due date, also TIMESTAMP accounts for specific return times like business hours (by 5pm).
    returned_at TIMESTAMP, -- can be NULL if not yet returned

    -- Condition of the device at loan time and return time, can be NULL if not yet returned
    loan_condition_id INT NOT NULL, 
    loan_condition_notes TEXT, -- should be filled out at loan time
    return_condition_id INT, -- can be NULL if not yet returned
    return_condition_notes TEXT, -- descriptive notes about the device's condition at return time
    
    -- Fees and accessories information
    damage_fee DECIMAL(10,2) DEFAULT 0.00, -- defaults to 0.00 if no damage
    all_accessories_returned BOOLEAN DEFAULT TRUE, -- defaults to TRUE if all accessories are returned
    missing_accessories TEXT, -- can be NULL if all accessories are returned
    notes TEXT, -- optional notes about the loan

    -- Auto-updates timestamp whenever the row is modified (on update CURRENT_TIMESTAMP)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_loan_bin
        FOREIGN KEY (bin_id) REFERENCES bin(bin_id)
        ON DELETE RESTRICT -- prevents deletion of a bin if loans are associated with it
        ON UPDATE CASCADE, -- if a bin_id changes, all linked loans are updated automatically to stay in sync
        
    CONSTRAINT fk_loan_status
        FOREIGN KEY (loan_status_id) REFERENCES loan_status(loan_status_id)
        ON DELETE RESTRICT -- prevents deletion of a loan status if loans are associated with it
        ON UPDATE CASCADE, -- if a loan_status_id changes, all linked loans are updated automatically to stay in sync

    CONSTRAINT fk_loan_citizen
        FOREIGN KEY (citizen_id) REFERENCES app_user(app_user_id)       
        ON DELETE RESTRICT -- prevents deletion of a citizen if loans are associated with them
        ON UPDATE NO ACTION, -- citizen_id should rarely change, handle at application level

    CONSTRAINT fk_loan_employee
        FOREIGN KEY (employee_id) REFERENCES app_user(app_user_id)      
        ON DELETE RESTRICT -- prevents deletion of an employee if loans are associated with them
        ON UPDATE NO ACTION, -- employee_id should rarely change, handle at application level

    CONSTRAINT fk_loan_loan_condition
        FOREIGN KEY (loan_condition_id) REFERENCES device_condition(device_condition_id)
        ON DELETE RESTRICT -- prevents deletion of a device condition if loans are associated with it
        ON UPDATE CASCADE, -- if a condition_id changes, all linked loans are updated automatically to stay in sync

    CONSTRAINT fk_loan_return_condition
        FOREIGN KEY (return_condition_id) REFERENCES device_condition(device_condition_id)
        ON DELETE SET NULL -- if a device condition is deleted, set return_condition_id to NULL
        ON UPDATE CASCADE -- if a condition_id changes, all linked loans are updated automatically to stay in sync
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Provides an audit trail of all significant actions taken in the system. [CORE ENTITY]
CREATE TABLE loan_log (
    loan_log_id INT PRIMARY KEY AUTO_INCREMENT,
    loan_id INT NOT NULL, -- a log entry must be associated with a loan 
    app_user_id BIGINT NOT NULL, -- a log entry must be associated with a user (employee or citizen) associated with app_user
    loan_action_type_id INT NOT NULL, -- a log entry must have an action type    
    success_message VARCHAR(255), -- can be NULL if action failed
    transaction_status_id INT NOT NULL, -- a log entry must have a transaction status
    error_details TEXT, -- can be NULL if action succeeded
    loan_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- TIMESTAMP automatically records when the action occurred

    CONSTRAINT fk_loanlog_loan 
        FOREIGN KEY (loan_id) REFERENCES loan(loan_id)
        ON DELETE CASCADE -- if a loan is deleted, all associated log entries are also deleted
        ON UPDATE NO ACTION, -- loan_id is immutable
    CONSTRAINT fk_loanlog_user
        FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id)
        ON DELETE RESTRICT -- prevents deletion of a user if log entries are associated with them
        ON UPDATE NO ACTION, -- user IDs are primary keys

    CONSTRAINT fk_loanlog_action_type
        FOREIGN KEY (loan_action_type_id) REFERENCES loan_action_type(loan_action_type_id)
        ON DELETE RESTRICT -- prevents deletion of a loan action type if log entries are associated with it
        ON UPDATE CASCADE, -- if a loan_action_type_id changes, all linked log entries are updated automatically to stay in sync

    CONSTRAINT fk_loanlog_transaction_status
        FOREIGN KEY (transaction_status_id) REFERENCES transaction_status(transaction_status_id)
        ON DELETE RESTRICT -- prevents deletion of a transaction status if log entries are associated with it
        ON UPDATE CASCADE -- if a transaction_status_id changes, all linked log entries are updated automatically to stay in sync
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Logs all significant actions taken in the system. [CORE ENTITY]
CREATE TABLE action_log (
    action_log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    app_user_id BIGINT NOT NULL, -- a log entry must be associated with a user (employee or citizen)
    user_action_type_id INT NOT NULL,

    -- Links this log entry to a specific USER row affected by the action, if applicable
    -- Lets auditors and developers trace which user account was created, updated, or deleted. 
    -- Supports queries like: "Show all actions performed on user_id = 12345"
    user_record_id BIGINT,

    -- Points to the exact LOAN row affected by the action, if applicable
    -- Critical for reconstructing loan history, troubleshooting overdue returns, and auditing loan transactions. 
    -- Supports queries like: "Show all actions performed on loan_id = 67890"
    loan_record_id INT,

    -- Identifies the specific DEVICE row affected by the action, if applicable
    -- Essential for tracking device lifecycle events, status changes, maintenance history,
    -- or changes to inventory status (e.g. "who retired device_id = 54321?")
    device_record_id BIGINT,

    current_url VARCHAR(500), -- can be NULL if action is not web-based
    api_endpoint VARCHAR(500), -- can be NULL if action is not API-based
    action_details TEXT, -- additional context about the action
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- TIMESTAMP automatically records when the action occurred

    CONSTRAINT fk_actionlog_user
        FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id)
        ON DELETE RESTRICT -- prevents deletion of a user if log entries are associated with them
        ON UPDATE NO ACTION, -- core entity does not cascade

    CONSTRAINT fk_actionlog_action_type
        FOREIGN KEY (user_action_type_id) REFERENCES user_action_type(user_action_type_id)
        ON DELETE RESTRICT -- prevents deletion of a user action type if log entries are associated with it
        ON UPDATE CASCADE, -- if a user_action_type_id changes, all linked log entries are updated automatically to stay in sync

    -- Each row should use exactly ONE of these three foreign keys to reference the affected record.
    CONSTRAINT fk_actionlog_user_record
        FOREIGN KEY (user_record_id) REFERENCES app_user(app_user_id)
        ON DELETE SET NULL -- if a user is deleted, set user_record_id to NULL
        ON UPDATE NO ACTION, -- references are immutable

    CONSTRAINT fk_actionlog_loan_record
        FOREIGN KEY (loan_record_id) REFERENCES loan(loan_id)
        ON DELETE SET NULL -- if a loan is deleted, set loan_record_id to NULL
        ON UPDATE NO ACTION, -- loan IDs are immutable
    CONSTRAINT fk_actionlog_device_record
        FOREIGN KEY (device_record_id) REFERENCES device(device_id)     
        ON DELETE SET NULL -- if a device is deleted, set device_record_id to NULL
        ON UPDATE NO ACTION -- device IDs are immutable
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)



-- ==================================================
-- 3. JOIN TABLES
-- ==================================================
-- Many-to-many join table for employee location access permissions. [JOIN TABLE]
CREATE TABLE user_location_access (
    app_user_id BIGINT NOT NULL, -- an access entry must be associated with a user
    location_id INT NOT NULL, -- an access entry must be associated with a location
    PRIMARY KEY (app_user_id, location_id), -- composite primary key to prevent duplicate entries

    CONSTRAINT fk_ula_user
        FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id)
        ON DELETE CASCADE -- if a user is deleted, all their access entries are also deleted
        ON UPDATE CASCADE, -- if a user_id changes, all linked access entries are updated automatically to stay in sync

    CONSTRAINT fk_ula_location
        FOREIGN KEY (location_id) REFERENCES location(location_id)
        ON DELETE CASCADE -- if a location is deleted, all associated access entries are also deleted
        ON UPDATE CASCADE -- if a location_id changes, all linked access entries are updated automatically to stay in sync
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Links devices to bins [JOIN TABLE]
CREATE TABLE bin_device (
    bin_id INT NOT NULL, -- an entry must be associated with a bin
    device_id BIGINT NOT NULL, -- a device can be in only one bin at a time
    
    -- Composite primary key so that each device can only be in one bin at a time
    PRIMARY KEY (bin_id, device_id), 

    -- Unique Key constraint to keep a device from being in multiple bins at once
    UNIQUE KEY uk_device_id (device_id),

    CONSTRAINT fk_bindevice_bin
        FOREIGN KEY (bin_id) REFERENCES bin(bin_id)
        ON DELETE CASCADE -- if a bin is deleted, remove all devices from that bin
        ON UPDATE CASCADE, 

    CONSTRAINT fk_bindevice_device
        FOREIGN KEY (device_id) REFERENCES device(device_id)
        ON DELETE CASCADE -- if a device is deleted, remove from bin 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- MySQL's transactional storage engine to support foreign keys and transactions (required for Hibernate and FKs)

-- Re-enable foreign key checks now that all tables are created
SET FOREIGN_KEY_CHECKS = 1;

-- End of DDL Script

-- Notes: 
-- Null handling for *_record_id fields should be enforced at the application level.