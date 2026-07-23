# Project Architecture

The IAM project is built on **NestJS** and follows clean, module-based architectural principles designed for scalability and maintainability.

## NestJS Project Structure

The codebase adheres strictly to the separation of concerns paradigm:
- **Controllers / Resolvers**: Responsible for handling incoming HTTP or GraphQL requests and returning responses. They defer all complex business logic to services.
- **Services**: Contain the core business logic. They process data and interact with the database.
- **Modules**: Group logically related components (e.g., `ApplicantsModule`, `AuthModule`) making the application highly modular.

### Directory Layout
```text
src/
├── applicants/       # Applicant feature module (REST endpoints, DTOs, business logic)
├── auth/             # Authentication & Authorization module (JWT strategy, guards)
├── common/           # Shared resources (Exception filters, decorators, interfaces)
├── dashboard/        # Analytics and aggregation module
├── graphql/          # GraphQL specific implementations (inputs, types, resolvers)
├── prisma/           # Database service wrapper around PrismaClient
├── app.module.ts     # Root module configuring the app
└── main.ts           # Application entry point
```

## Database Design

The data layer is managed by **Prisma ORM** mapping to a PostgreSQL database.

### Schema Overview

The database contains two main entities:
1. **Administrator**:
   - Manages access to the system.
   - Contains securely hashed passwords and unique emails.
2. **Applicant**:
   - Represents a user applying for an internship.
   - Includes fields like `firstName`, `lastName`, `email`, `phone`, `track`, and `status`.
   - Utilizes `deletedAt` for soft-deleting records to preserve historical data.

### Relationship
Currently, the system is designed symmetrically where Administrators manage Applicants. There are no direct foreign-key relations between the two models in the current schema to keep applicant data decoupled from the admin that reviewed it, ensuring clean separation of applicant pipelines.

> [!NOTE]  
> The use of Enums (`InternshipTrack`, `ApplicantStatus`) at the database level ensures data consistency and prevents invalid entries for critical workflow states.
