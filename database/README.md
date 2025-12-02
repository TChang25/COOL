# Database Quick Start

For detailed instructions please refer to ~/documentation/docs/Documentation/database/cool-db-setup-guide.md

1. Install Docker
2. Navigate to ~/database in terminal
4. Run
```bash
$ sudo cp -p .env.sample .env
```
5. Modify .env to include personal password
6. Run
```bash
$ docker compose up -d
```
7. Done 


(MySql is now running port 3306 by default)
Connect to DB in Terminal by running:

```bash
docker exec -it cool-mysql mysql -u root -p
```
^ Enter your password in for root ^
