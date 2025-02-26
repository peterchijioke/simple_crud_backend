# User Management API

## Description
A RESTful API built with NestJS, TypeORM, and PostgreSQL to manage user information, including contact details, addresses, and academic backgrounds. This project provides endpoints to create, update, delete, and retrieve user data with validation and relational data handling.

## Features
- **User Management**: CRUD operations for users.
- **Relational Data**: Separate entities for contact info, address, and academic background.
- **Validation**: Input validation using `class-validator`.
- **Database**: PostgreSQL with automatic database creation if it doesn’t exist.
- **API Versioning**: Uses `/v1` prefix for endpoints.

## Tech Stack
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: ORM for PostgreSQL with entity relationships.
- **PostgreSQL**: Relational database for persistent storage.
- **Class-Validator**: Validation library for DTOs.
- **Class-Transformer**: Automatic transformation of payloads to DTOs.

## Prerequisites
- **Node.js**: v16 or higher
- **PostgreSQL**: v13 or higher
- **pnpm**: v8 or higher

## Installation
### Clone the Repository
```sh
git clone https://github.com/peterchijioke/simple_crud_backend.git
cd user-management-api
```

### Install Dependencies
```sh
pnpm install
```

### Set Up PostgreSQL
Ensure PostgreSQL is installed and running locally or on a hosted service.
Create a `.env` file in the root directory with the following content:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=userdb
NODE_ENV=development
```
Replace `yourpassword` and `userdb` with your PostgreSQL credentials and desired database name.

## Running the Application
```sh
pnpm run start
```
The API will be available at `http://localhost:3000`.

## Database Setup
- The app automatically creates the database specified in `DB_NAME` if it doesn’t exist (requires the PostgreSQL user to have `CREATEDB` privileges).
- Tables (`user`, `user_contact`, `user_address`, `academic_background`) are created automatically via TypeORM’s `synchronize` option in development mode.

## API Endpoints
All endpoints are prefixed with `/v1/users`.

| Method | Endpoint | Description | Request Body |
|--------|---------|-------------|--------------|
| POST | `/` | Create a new user | See Example |
| PUT | `/:id` | Update an existing user | Same as POST |
| DELETE | `/:id` | Delete a user | None |
| GET | `/` | Get all users | None |
| GET | `/:id` | Get a single user by ID | None |

### Create User Example
```json
{
  "profilePhoto": "https://example.com/photos/john_doe.jpg",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-05-15",
  "occupation": "Software Engineer",
  "gender": "Male",
  "contact": {
    "email": "john.doe@example.com",
    "phoneNumber": "+1-555-123-4567",
    "fax": "+1-555-987-6543",
    "linkedInUrl": "https://www.linkedin.com/in/johndoe"
  },
  "address": {
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "zipCode": "10001"
  },
  "academicBackgrounds": [
    {
      "schoolName": "University of Example",
      "degree": "Bachelor of Science",
      "fieldOfStudy": "Computer Science",
      "startDate": "2008-09-01",
      "endDate": "2012-05-15"
    }
  ]
}
```
