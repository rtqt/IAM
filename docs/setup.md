# Setup Guide

Here is how to set up the IAM project locally so you can review it.

## Prerequisites

- **Node.js**: v18 or later.
- **Package Manager**: I recommend pnpm (v8+), but npm will work.
- **Docker & Docker Compose**: I used Docker to run PostgreSQL locally so you don't have to install it manually.

## Step-by-Step Setup

### 1. Clone the Repository
Clone the project and navigate into the directory.

### 2. Install Dependencies
Run this to install the packages:
```bash
pnpm install
```

### 3. Environment Variables
Copy the `.env.example` file to create your own `.env` file:
```bash
cp .env.example .env
```
I configured the `docker-compose.yml` to match the default credentials in `.env.example`, so you shouldn't need to change `DATABASE_URL` or `JWT_SECRET` for local testing.

### 4. Start the Database
Spin up the PostgreSQL database:
```bash
docker-compose up -d
```
> [!NOTE]  
> This starts a container named `iam-db` running Postgres on port 5432.

### 5. Run Database Migrations
Initialize the schema and seed the database:
```bash
npx prisma migrate dev
```
> [!TIP]
> The seed script runs automatically after the migration and creates a default admin user. 
> email = admin@infnova.com
> password = password123

### 6. Run the Application
Start the NestJS server:
```bash
pnpm run start:dev
```
The server will run on `http://localhost:3000`.

## Testing the API
I added a few ways to test the API directly from your browser:
1. **Swagger UI**: Go to `http://localhost:3000/api/docs` to see the REST endpoints.
2. **GraphQL Playground**: Go to `http://localhost:3000/graphql` to try out the GraphQL schema.
