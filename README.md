# API with PostgreSQL and user routes

TypeScript | PostgreSQL | Node.js | Express | Dotenv | Db-migrate | Jsonwebtoken | Jasmine | Supertest | Bcrypt | CORS

A RESTful API containing a Database SQL schema intended for use by frontend developers. It includes authentication, required endpoints, and data types for users.


## Instructions

### 1. **ENV**

In repo, you will see a `.env-example` file. Rename the file to `.env`. All variables already configured

### 2. **Install Docker on your computer and create database**

After Docker have been installed use this command in terminal in the project directory

```bash
  docker-compose up
```

### 3. **Install the dependencies**

```bash
  yarn install
```

The dependencies include Postgres, Node/Express, dotenv, db-migrate, jsonwebtoken, jasmine
and also TypeScript, Supertest, bcrypt, cors.

### 4. **Database setup**

Open psql and write this commands:
```bash
      CREATE USER full_stack_user WITH PASSWORD 'password123';
      CREATE DATABASE full_stack_dev;
      CREATE DATABASE full_stack_test;
      \c full_stack_dev
      GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
      GRANT ALL ON SCHEMA public TO full_stack_user;
      \c full_stack_test
      GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO full_stack_user;
      GRANT ALL ON SCHEMA public TO full_stack_user;
```
### 5. **Run migrations**

```bash
  yarn migrate
  or
  db-migrate up
```

### 6. Now you can **use the following scripts**:

```bash
  yarn test
  or 
  yarn testAndMigrate
```
```bash
  yarn watch
```

- test: to test models and handlers
- watch: to start the server

### 7. **You can use Postman to interact with database through API Endpoints**

## API Endpoints

### Users

| Function | Description | Method | Endpoint | Token required| 
| - | - | - | - | - |
| create | create a new user | POST | /users | No |
| authenticate | authenticate a user | POST | /users/authenticate | No |
| index | show all users | GET | /users | Yes |
| show | show a specific user | GET | /users/:id | Yes |
| update | update a user | PUT | /users/:id | Yes |
| del | delete a user | DELETE | /users/:id | Yes |

## Data Shapes

### User

| id | userName | firstName | lastName | password |
| - | - | - | - | - |
| number | string | string | string | string |