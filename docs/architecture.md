# Project Architecture

I built the IAM project on **NestJS** and organized it into modules.

## NestJS Project Structure

I separated the codebase into specific layers so it's easier to maintain:
- **Controllers / Resolvers**: These handle the incoming HTTP or GraphQL requests and send back responses. They pass the actual work down to the services.
- **Services**: This is where the core logic lives. They process data and talk to the database.
- **Modules**: I grouped related components into modules (like `ApplicantsModule` and `AuthModule`).

### Directory Layout
```text
src/
├── applicants/       # Applicant REST endpoints, DTOs, and logic
├── auth/             # Authentication (JWT strategy and guards)
├── common/           # Shared filters, decorators, and interfaces
├── dashboard/        # Analytics logic
├── graphql/          # GraphQL inputs, types, and resolvers
├── prisma/           # The PrismaClient wrapper
├── app.module.ts     # Root module
└── main.ts           # Application entry point
```

## Database Design

I used **Prisma ORM** to connect to a PostgreSQL database.

### Schema Overview

The database tracks two main things:
1. **Administrator**:
   - Accounts for people managing the system.
   - Stores hashed passwords and unique emails.
2. **Applicant**:
   - People applying for internships.
   - Stores `firstName`, `lastName`, `email`, `phone`, `track`, and `status`.
   - I added a `deletedAt` field so we can soft-delete records instead of destroying the history.

### Relationship
Administrators manage Applicants, but I didn't add a strict foreign-key relationship between them in the schema. This keeps the applicant data decoupled from whichever admin happens to be reviewing it.

> [!NOTE]  
> I used Postgres Enums (`InternshipTrack`, `ApplicantStatus`) to force data consistency and prevent anyone from saving an invalid status.
