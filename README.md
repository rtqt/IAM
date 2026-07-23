# IAM: Internship Application Management

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

IAM is a robust, production-ready backend service designed to manage internship applications seamlessly. Built natively with NestJS, Prisma, and PostgreSQL, it provides both REST and GraphQL interfaces for maximum integration flexibility.

## Documentation 

We have prepared comprehensive documentation for reviewers and developers in the `/docs` folder:

- 🚀 **[Setup Guide](./docs/setup.md)**: How to run the database via Docker and start the server.
- 🏗 **[Architecture & Database Design](./docs/architecture.md)**: Explore the NestJS structure and PostgreSQL data schema.
- 🔐 **[Security & Validation](./docs/security-and-validation.md)**: Details on our JWT strategy, Bcrypt hashing, and global error handling/DTO validation.
- 🧪 **[Testing Strategy](./docs/testing.md)**: How to run our unit and e2e tests.
- 📚 **[API Overview](./docs/api.md)**: How to access our interactive Swagger REST UI and GraphQL Playground.

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
*For detailed setup instructions, please refer to the [Setup Guide](./docs/setup.md).*

## Reviewer Notes

This project was built focusing deeply on **functional correctness** and **code readability**. You will find:
- Strict modularity using NestJS features.
- Clean database transactions and unique constraint handling with Prisma.
- Comprehensive request validation via `class-validator` to ensure data integrity.
- Both Swagger UI and GraphQL Playgrounds enabled out of the box for easy API exploration.
