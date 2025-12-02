# COOL Project Setup Guide

This guide will walk you through setting up the COOL (City of Orlando Loaners) system.

---

## Prerequisites

Before you begin, ensure you have the following installed:

**Required**
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (for running the MySQL database container)
- **[Java 17+ JDK](https://adoptopenjdk.net/)**
- **[Maven](https://maven.apache.org/download.cgi)**
- **[Git](https://git-scm.com/downloads)** (to clone the repository)
- **[Node.js & npm](https://nodejs.org/)** (for running the front-end)
- **[Visual Studio Code](https://code.visualstudio.com/)** or another code editor (for code review)

**Optional**
- **[Postman](https://www.postman.com/downloads/)** (for API testing)
- **[OpenSSL](https://www.openssl.org/)** (for generating RSA keys; or use the Docker method)

---

## 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/CityOfOrlando-2025/COOL.git
```

---

## 2. Prepare the Database with Docker

The project uses MySQL, which is run in a Docker container.

### 2.1. Create Your `.env` File

Copy the sample environment file `.env.sample` into a new file named `.env`.

Edit `.env` and set your own values for `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_ROOT_PASSWORD`:

```
MYSQL_ROOT_PASSWORD=rootPassword123
MYSQL_USER=devCOOL
MYSQL_PASSWORD=devPassword123
MYSQL_DATABASE=cool_db
```

### 2.2. Launch the MySQL Container with Docker Compose

Make sure Docker Desktop is running before proceeding.

Open a terminal from the `/database` directory and use the following command:

```bash
docker compose up -d
```

This will:
- Build and start a MySQL container named `cool-mysql`
- Initialize the database schema and seed data.

---

## 3. Generate and Configure RSA Keys

The backend uses RSA key pairs for secure JWT authentication.
**You must generate these keys before building the backend.**

The Docker Compose method is recommended for key generation, as it does not require OpenSSL to be installed locally.

`private.pem` and `public.pem` must be present in the `back-end/src/main/resources/certs/` directory.
These files are referenced by the backend for signing and verifying tokens.

### Option 1 (Recommended): Generate Keys Using Docker Compose

Open a terminal from the `/database` directory and use the following command:

```bash
docker compose --profile openssl run --rm rsakeys
```

This will:
- Generate `private.pem` and `public.pem` in `back-end/src/main/resources/certs/` if they do not already exist.
- You will see a message confirming key generation or that the keys already exist.

### Option 2: Generate Keys Using OpenSSL Locally

To generate the keys manually with OpenSSL, open a terminal from the `back-end/src/main/resources/certs/` directory and use the following commands:

```bash
# Navigate terminal to the certs directory
cd back-end/src/main/resources/certs

# Generate a 2048-bit private key in PKCS#1 format
openssl genrsa -out keypair.pem 2048

# Generate a corresponding public key
openssl rsa -in keypair.pem -pubout -out public.pem

# Convert the private key to PKCS#8 format
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out private.pem

# Remove the file keypair.pem  (or just delete it manually)
rm keypair.pem
```

---

## 4. Configure Application Properties

Open `/back-end/resources/application.properties` and ensure the database connection matches your Docker setup.

Make sure the username and password match your `.env` file:

```
spring.datasource.url=jdbc:mysql://localhost:3307/cool_db
spring.datasource.username=devCOOL
spring.datasource.password=devPassword123
spring.jpa.hibernate.ddl-auto=update
```

---

## 5. Build and Run the Backend Spring Boot Application

Open a terminal from the `/back-end` directory and run:

```bash
mvn clean install
```
Then run:
```bash
mvn spring-boot:run
```

The back-end will run on http://localhost:8080/ by default.

---

## 6. Build and Run the Front-End VITE Application

Open a terminal from the `/database` directory and run:

```bash
npm install
```
Then run:
```bash
npm run dev
```

The front-end will run on http://localhost:3307/ by default.

---

## 7. Initialize the Database

The database should be populated with seed data on its creation.
You may adjust its data as needed to create more roles, users, devices, bins, and locations. 

Most of this data should be created using the front-end service. However, if needed you can do this using Postman or another API client.
Refer to API documentation under `/Backend API/` for more information on using API endpoints.

A user `devAdmin` is included in the seed data, as an authenticated user is required to perform API requests; some requests, such as creating users, require an admin role. 
```
email: dev@workemail.com
password: devPassword123
```

It's recomended that you use the Dev Admin included in the seed data to create real users then delete the users created from the seed file.

---

## 8. Stopping and Restarting the Application

To stop the Spring Boot server, press `Ctrl+C` in the terminal where it is running.

To start the server open a terminal from the `/back-end` directory and run: 
```bash
mvn spring-boot:run
```

To stop the VITE application, press `Ctrl+C` in the terminal where it is running.

To start the application open a terminal from the `/database` directory and run: 
```bash
npm run dev
```

<br>

To stop the MySQL Docker container:
```bash
docker compose stop
```

To start the container:
```bash
docker compose start
```

---

## 9. Additional Notes

- Never commit your private key (`private.pem`) to version control. Keep it secure.
- The backend will automatically generate and validate JWT tokens using your RSA keys.

- For advanced configuration, see the `application.properties` file (backend) or config files (front-end).
- For more details on each API, see the markdown files in `documentation/docs/Documentation/Backend API/`.

---

#### You are now ready to use the COOL system!