# Setup Guide

This document outlines how to set up the IAM (Internship Application Management) project locally for review and development.

## Prerequisites

- **Node.js**: v18 or later.
- **Package Manager**: pnpm (v8+) is highly recommended but npm works fine.
- **Docker & Docker Compose**: Required for running the PostgreSQL database locally without manual installation.

## Step-by-Step Setup

### 1. Clone the Repository
Clone the project repository to your local machine and navigate into the project directory.

### 2. Install Dependencies
This project uses `pnpm` to manage dependencies. Run the following command:
```bash
pnpm install
```

### 3. Environment Variables
Copy the `.env.example` file to create your own `.env` file:
```bash
cp .env.example .env
```
Ensure your `.env` contains the required variables, particularly the `DATABASE_URL` and `JWT_SECRET`. By default, the `docker-compose.yml` is configured to match the default `.env.example` credentials.

### 4. Start the Database
Use Docker Compose to spin up the local PostgreSQL database:
```bash
docker-compose up -d
```
> [!NOTE]  
> This will start a container named `iam-db` running PostgreSQL on port 5432.

### 5. Run Database Migrations
Initialize your database schema and run the seed script to populate initial data (like the default Administrator account):
```bash
npx prisma migrate dev
```
> [!TIP]
> The database seed script will automatically run after the migration, creating a default admin user you can use to log in. Check `prisma/seed.ts` for the exact credentials.

### 6. Run the Application
Start the NestJS server in development mode:
```bash
pnpm run start:dev
```
The application will be available at `http://localhost:3000`.

## Testing the API
You can test the API using:
1. **Swagger UI**: Navigate to `http://localhost:3000/api/docs` to see the complete REST API documentation and interact with the endpoints.
2. **GraphQL Playground**: Navigate to `http://localhost:3000/graphql` to explore the GraphQL schema and run queries/mutations.
