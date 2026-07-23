# IAM: Internship Application Management

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

IAM is a backend service I built to manage internship applications. I wrote it in NestJS and used Prisma with PostgreSQL for the database. It exposes both a REST API and a GraphQL endpoint depending on what the frontend needs to query.

## Documentation 

I put together some docs in the `/docs` folder so you can see how things work under the hood:

- [Setup Guide](./docs/setup.md): How to get the database running in Docker and start the server.
- [Architecture & Database Design](./docs/architecture.md): The NestJS file structure and the Postgres schema.
- [Security & Validation](./docs/security-and-validation.md): How I handled JWTs, bcrypt hashing, and request validation.
- [Testing Strategy](./docs/testing.md): Running the unit and e2e tests.
- [API Overview](./docs/api.md): Finding the Swagger UI and GraphQL Playground.

## Quickstart

```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment 
cp .env.example .env

# 3. Spin up Postgres locally
docker-compose up -d

# 4. Run migrations and seed data
npx prisma migrate dev

# 5. Start the server
pnpm run start:dev
```
*If you run into issues, check the [Setup Guide](./docs/setup.md).*

## Reviewer Notes

I focused on functional correctness and readable code while building this. A few things to look out for:
- I used standard NestJS modules to separate the domains.
- Prisma handles the database transactions and unique constraints.
- `class-validator` validates incoming requests before they hit the controllers.
- Swagger UI and GraphQL Playground are both enabled if you want to test the endpoints directly.
