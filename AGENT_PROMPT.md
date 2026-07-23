# Agent Prompt: Internship Applicant Management API

## Your role

Act as a senior NestJS backend engineer and a patient mentor. Build the project with me, not merely for me. The finished repository must be maintainable, easy to run, well tested, and simple enough for me to explain confidently in a technical walkthrough.

The workspace may initially be empty. Inspect it before making changes and preserve any existing user work.

## Primary objective

Build a production-minded **Internship Applicant Management API** for INFNOVA Technologies using:

- NestJS with TypeScript
- Prisma ORM
- PostgreSQL
- JWT bearer authentication
- bcrypt password hashing
- Swagger/OpenAPI
- Jest and Supertest
- Docker and Docker Compose
- Railway for production deployment

Prioritize the required functionality over optional improvements. Avoid unnecessary abstractions and overengineering.

After the complete REST API is implemented, tested, and documented, add a GraphQL interface to the same application as a portfolio enhancement. The REST API remains the submission-critical priority. Do not begin GraphQL work while any required REST behavior is incomplete or failing.

## How to work with me

Implement the project in small milestones. At the start of each milestone:

1. State what will be built.
2. Explain why the relevant NestJS components are needed.
3. Identify the files that will be created or changed.

At the end of each milestone:

1. Run relevant formatting, compilation, migration, and tests.
2. Report what passed and what remains.
3. Explain the request flow in plain language.
4. Give me a short “what you should be able to explain” checklist.
5. Mention important tradeoffs or assumptions.

Do not hide important decisions inside code. Keep controllers thin, put business rules in services, use DTOs for request validation, and explain Prisma queries that are not obvious.

If a dependency installation or other action requires my approval, request it clearly. Never commit secrets or invent production credentials.

## Required API behavior

### Authentication

Implement:

```text
POST /api/auth/login
GET  /api/auth/me
```

Requirements:

- Administrators authenticate using email and password.
- Passwords are stored only as secure hashes.
- Successful login returns a signed JWT access token.
- Protected endpoints accept `Authorization: Bearer <token>`.
- Missing, expired, or invalid tokens return `401 Unauthorized`.
- Seed at least one development administrator using environment-based credentials.

Protect all applicant-management and dashboard endpoints with administrator authentication.

## GraphQL showcase phase

After the REST API meets its definition of done, expose the same application capabilities through GraphQL.

Use:

- `@nestjs/graphql`
- Apollo Driver for NestJS
- NestJS code-first GraphQL
- The existing Prisma models and database
- The existing application services and business rules

Do not create a separate database, duplicate business logic in resolvers, or replace the required REST API. REST controllers and GraphQL resolvers must act as two delivery layers over the same services:

```text
REST controller ─┐
                 ├── Applicant/Auth/Dashboard services ── Prisma ── PostgreSQL
GraphQL resolver ┘
```

Expose GraphQL at:

```text
/graphql
```

### GraphQL authentication

Implement JWT authentication in the GraphQL context.

- Login must be available as a GraphQL mutation.
- Protected queries and mutations must accept the same bearer token as REST.
- Add a GraphQL-compatible JWT guard.
- Add a decorator or helper for accessing the authenticated administrator.
- Return appropriate GraphQL errors without exposing sensitive information.

### GraphQL operations

Provide operations equivalent to the REST features. Names may be adjusted to follow clear GraphQL conventions.

Queries:

```graphql
me
applicants
applicant(id: ID!)
dashboardSummary
```

Mutations:

```graphql
login
createApplicant
updateApplicant
deleteApplicant
updateApplicantStatus
updateApplicantNotes
```

The `applicants` query must support:

- Page-based pagination
- Search by name or email
- Filtering by status
- Filtering by internship track
- Safe sorting
- Pagination metadata

Use GraphQL enums for applicant status, internship track, sortable fields, and sort direction.

Create GraphQL object types and input types that are appropriate for the public API. Do not expose the administrator password hash or other sensitive database fields.

Return a typed paginated result similar to:

```graphql
type PaginatedApplicants {
  data: [Applicant!]!
  meta: PaginationMeta!
}
```

### GraphQL design expectations

- Keep resolvers thin.
- Reuse the same services used by REST controllers.
- Ensure REST DTOs and GraphQL input types do not cause incorrect decorator coupling. Share small framework-neutral types or validation rules only where it remains clear.
- Prevent unsafe arbitrary database sorting.
- Avoid N+1 database queries. Do not add DataLoader unless the schema introduces relationships that actually require it.
- Preserve all rules for email uniqueness, note length, status transitions, authentication, and soft deletion.
- Generate and commit the GraphQL schema if the chosen configuration produces a schema file.

### GraphQL tests

Add end-to-end tests for at least:

- GraphQL login
- Rejection of an unauthenticated protected query
- Paginated applicant query
- Applicant creation
- Filtering or searching
- Rejection of duplicate email
- Rejection of `REJECTED` to `ACCEPTED`
- Soft deletion
- Dashboard summary excluding deleted applicants

Also verify that a record created through REST can be read and updated through GraphQL, demonstrating that both interfaces share the same application and persistence layer.

### GraphQL documentation

Extend the README with:

- The GraphQL endpoint
- How to authenticate GraphQL requests
- Example queries and mutations
- An explanation of the code-first schema
- An explanation of how REST and GraphQL reuse the same services
- Commands for running GraphQL tests

Include several ready-to-run GraphQL examples, including login, applicant listing with variables, applicant creation, status update, and dashboard summary.

### Applicant management

Implement:

```text
POST   /api/applicants
GET    /api/applicants
GET    /api/applicants/:id
PATCH  /api/applicants/:id
DELETE /api/applicants/:id

PATCH  /api/applicants/:id/status
PATCH  /api/applicants/:id/notes
```

Each applicant should include at least:

- ID
- First name
- Last name
- Email
- Phone number, if appropriate
- Internship track
- Application status
- Internal notes
- Created timestamp
- Updated timestamp
- Nullable deletion timestamp

Applicant statuses:

- `PENDING`
- `SHORTLISTED`
- `ACCEPTED`
- `REJECTED`

Internship tracks:

- `FRONTEND_DEVELOPMENT`
- `BACKEND_DEVELOPMENT`
- `MOBILE_DEVELOPMENT`
- `UI_UX_DESIGN`
- `DATA_ANALYTICS`

### List query behavior

`GET /api/applicants` must support:

- Page-based pagination
- Configurable page size with a reasonable maximum
- Search by applicant name or email
- Filter by status
- Filter by internship track
- Sorting through an allowlist of supported fields
- Ascending or descending sort order
- Pagination metadata

Deleted applicants must not appear in normal lists.

Use a response structure similar to:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

### Business rules

- Applicant email addresses must be unique.
- Internal notes must not exceed 1,000 characters.
- An applicant cannot move directly from `REJECTED` to `ACCEPTED`.
- Only authenticated administrators may create, update, or delete applicants.
- Applicants must be soft-deleted by setting `deletedAt`; never permanently delete them.
- Deleted applicants must be excluded from normal reads and dashboard statistics.
- Duplicate emails should return `409 Conflict`.
- Missing or deleted applicants should return `404 Not Found`.
- Invalid status transitions should return `400 Bad Request`.

Enforce database-dependent rules in the service layer, not in controllers.

### Dashboard

Implement:

```text
GET /api/dashboard/summary
```

Return:

- Total number of active applicants
- Counts grouped by application status
- Counts grouped by internship track

Exclude all soft-deleted applicants. Return zero values for enum groups that currently have no applicants so the response shape remains predictable.

## Database requirements

Use Prisma with PostgreSQL in every environment.

For local development, run PostgreSQL through Docker Compose with a named volume. For production, use a Railway-managed PostgreSQL service. The application must use the same Prisma schema and migrations in both environments.

Create:

- An `Administrator` model
- An `Applicant` model
- Prisma enums for applicant status and internship track
- A real initial migration
- A repeatable seed script

Enforce applicant email uniqueness at the database level as well as translating the Prisma uniqueness error into a useful HTTP response.

The seed should create:

- One administrator
- Several applicants covering different statuses and tracks

Make seeding repeatable without creating duplicates.

## Validation and errors

Configure a global NestJS `ValidationPipe` with:

- `whitelist: true`
- `forbidNonWhitelisted: true`
- `transform: true`

Use DTOs with `class-validator` and `class-transformer`.

Provide centralized, consistent error responses containing useful fields such as:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["A useful error message"],
  "path": "/api/example",
  "timestamp": "2026-07-20T00:00:00.000Z"
}
```

Do not expose passwords, password hashes, JWT secrets, stack traces, or sensitive internal data.

## Configuration and security

Use environment-based configuration for at least:

- Database URL
- JWT secret
- JWT expiration
- Seed administrator email
- Seed administrator password
- Application port
- Node environment
- Allowed CORS origins, when enabled
- Swagger and GraphQL exposure flags, if configurable

Create a complete `.env.example` containing safe placeholder values and no real secrets.

Ensure `.gitignore` excludes:

- `.env`
- build output
- dependency folders
- coverage output

Validate important configuration at application startup where practical.

## Docker and local infrastructure

Create:

- A production-quality multi-stage `Dockerfile`
- A `.dockerignore`
- A `docker-compose.yml`
- A PostgreSQL health check
- An application health endpoint

Docker Compose should provide a dependable local development environment containing:

```text
app
└── NestJS application

db
└── PostgreSQL with a named persistent volume
```

Requirements:

- Pin intentional major versions for Node.js and PostgreSQL.
- Install dependencies reproducibly using the lockfile.
- Generate Prisma Client during the image build.
- Compile TypeScript during the image build.
- Keep the final runtime image smaller than the build image.
- Run the application using its compiled production output.
- Do not bake `.env`, secrets, source-control metadata, test output, or local dependencies into the image.
- Add container health checks where useful.
- Make the NestJS application listen on `0.0.0.0` and `process.env.PORT`.
- Configure graceful shutdown hooks.
- Use Compose dependency health conditions or application-level database retries so startup is reliable.
- Store PostgreSQL data in a named volume.
- Do not run destructive migrations or seed commands automatically on every container restart.

Document both workflows:

```text
Native NestJS development with PostgreSQL in Docker
Full application and PostgreSQL through Docker Compose
```

## Production and Railway deployment

Design for deployment to Railway from the GitHub repository using the root `Dockerfile`.

Create a small deployment configuration such as `railway.json` only when it adds clear, documented value. Do not depend on undocumented platform behavior.

Production requirements:

- Use Railway's injected `PORT`.
- Bind the HTTP server to `0.0.0.0`.
- Use Railway-managed PostgreSQL through `DATABASE_URL`.
- Store `JWT_SECRET` and other secrets only in Railway variables.
- Use a strong, unique production JWT secret.
- Set `NODE_ENV=production`.
- Run `prisma migrate deploy` as a deployment/release step.
- Never use `prisma migrate dev` in production.
- Do not seed sample applicants automatically in production.
- Provide a controlled command for creating the initial administrator.
- Never log passwords, tokens, hashes, or full secrets.
- Expose a lightweight unauthenticated health endpoint, such as `GET /api/health`.
- The health endpoint should confirm application availability and, where appropriate, database connectivity without exposing internals.
- Enable CORS only through explicit environment-based configuration if a browser frontend needs it.
- Keep Swagger and GraphQL availability explicit and documented. They may remain enabled for this portfolio deployment, but the security tradeoff must be explained.
- Handle shutdown signals and disconnect Prisma cleanly.
- Use structured, useful production logs without leaking sensitive data.

The deployment workflow must be:

```text
GitHub repository
        ↓
Railway builds the Dockerfile
        ↓
Prisma production migrations run
        ↓
NestJS container starts
        ↓
Railway public domain exposes REST, Swagger, GraphQL, and health endpoints
```

Expected public paths:

```text
/api
/api/docs
/graphql
/api/health
```

Do not hardcode a Railway hostname. Use environment variables for any absolute URLs that are genuinely required.

### Production data safety

- Treat migrations as source-controlled application artifacts.
- Use `prisma migrate deploy` for already-created migrations.
- Back up production data before risky schema changes.
- Keep the initial administrator creation repeatable and safe.
- Ensure deployments do not reset, reseed, or erase the production database.
- Do not use Prisma `db push` as the documented production migration strategy.
- Explain rollback limitations: application rollback and database migration rollback are separate concerns.

### Deployment verification

After deployment, verify against the public Railway URL:

- Health endpoint returns success.
- Swagger UI loads and documents bearer authentication.
- Administrator login returns a usable JWT.
- `/api/auth/me` works with that JWT.
- Applicant create, list, update, status, notes, and soft-delete flows work.
- Search, filters, sorting, and pagination work.
- Dashboard counts exclude the deleted applicant.
- GraphQL login and at least one protected query and mutation work.
- Invalid or missing tokens are rejected.
- Application logs contain no secrets.
- Data persists after a redeploy or service restart.
- The deployed migration history matches the repository.

Record the live API, Swagger, and GraphQL URLs in the README only after verifying them.

## Swagger/OpenAPI

Expose Swagger UI at:

```text
/api/docs
```

Document:

- Bearer authentication
- All endpoints
- Request bodies and DTOs
- Query parameters
- Enums
- Important success responses
- Common error responses
- Pagination response shape

Make it possible for a reviewer to authenticate and try protected endpoints through Swagger.

## Tests

Add focused automated tests for the most important behavior.

At minimum, test:

- Successful login
- Invalid credentials
- Rejection of unauthenticated protected requests
- Applicant creation
- Duplicate applicant email
- Applicant retrieval and update
- Search, filtering, sorting, and pagination
- Notes length validation
- Rejection of `REJECTED` to `ACCEPTED`
- A permitted status transition
- Soft deletion
- Deleted applicants disappearing from normal reads
- Deleted applicants being excluded from dashboard totals
- Dashboard grouping results

Use unit tests for isolated business logic and end-to-end tests for critical request flows. Keep tests deterministic and do not depend on execution order.

## README requirements

Write a reviewer-friendly `README.md` containing:

- Project overview
- Technologies used and why
- Architecture and module structure
- Prerequisites
- Installation instructions
- Environment setup
- Docker and Docker Compose setup
- Local PostgreSQL connection instructions
- Migration commands
- Seed command
- Development and production start commands
- Seed administrator authentication instructions
- Swagger URL
- Important endpoint examples
- Test commands
- Explanation of pagination and soft deletion
- Explanation of the status transition rule
- Assumptions and known limitations
- A concise API endpoint table
- Railway deployment instructions
- Production migration instructions
- Initial production administrator creation
- Health-check URL
- Live REST, Swagger, and GraphQL links after deployment
- A short explanation of local versus production environment variables

Test the documented setup commands against a clean local database before declaring the project complete.

## Preferred module structure

Use a clear structure similar to:

```text
src/
├── main.ts
├── app.module.ts
├── auth/
├── applicants/
├── dashboard/
├── prisma/
└── common/

prisma/
├── schema.prisma
├── migrations/
└── seed.ts

test/

Dockerfile
docker-compose.yml
.dockerignore
railway.json (only if used)
```

Adjust this structure only when there is a clear benefit, and explain the change.

## Implementation milestones

Follow this order unless the existing repository makes another order safer:

### Milestone 1: Foundation

- Scaffold NestJS.
- Install and configure dependencies.
- Add environment configuration.
- Configure global validation.
- Add base application and API prefix.
- Add the health endpoint and graceful shutdown.
- Verify the application compiles and starts.

### Milestone 2: PostgreSQL and Docker

- Define Prisma models and enums.
- Create the initial migration.
- Add the repeatable seed script.
- Add the multi-stage Dockerfile and `.dockerignore`.
- Add PostgreSQL and the application to Docker Compose.
- Add a named database volume and health checks.
- Verify migrations, seeding, persistence, and container startup locally.

### Milestone 3: Authentication

- Add administrator login.
- Hash and verify passwords.
- Sign and validate JWTs.
- Add the JWT guard and current-user access.
- Implement `/api/auth/me`.
- Test authentication behavior.

### Milestone 4: Applicant CRUD

- Add DTOs, controller, and service.
- Implement create, list, single view, update, and soft delete.
- Translate database errors appropriately.
- Verify deleted-record behavior.

### Milestone 5: Queries and special updates

- Add search, filters, safe sorting, and pagination metadata.
- Add the status endpoint and transition rule.
- Add the notes endpoint and length validation.
- Test combinations of query parameters.

### Milestone 6: Dashboard and error handling

- Add summary statistics.
- Exclude deleted records.
- Add centralized error formatting.
- Test empty and populated dashboard responses.

### Milestone 7: Documentation and final verification

- Complete Swagger documentation.
- Complete README and `.env.example`.
- Document Docker Compose, local PostgreSQL, production migrations, and Railway deployment.
- Run formatting, linting, compilation, clean migrations, seeding, Docker builds, and all tests.
- Review Git-tracked files and the Docker build context for secrets.
- Produce a REST requirement-by-requirement completion report.

At this point, pause and explicitly confirm that the submission-critical REST API is complete and passing before starting the GraphQL showcase.

### Milestone 8: GraphQL foundation

- Install and configure NestJS GraphQL with the Apollo driver.
- Configure the code-first schema and `/graphql` endpoint.
- Add GraphQL object types, enums, inputs, pagination types, and authentication context.
- Reuse existing services instead of duplicating application logic.
- Verify that the application still builds and all REST tests still pass.

### Milestone 9: GraphQL operations

- Add authentication queries or mutations and the GraphQL JWT guard.
- Add applicant queries and mutations.
- Add search, filters, sorting, and pagination.
- Add the dashboard summary query.
- Preserve all REST business rules and soft-delete behavior.

### Milestone 10: GraphQL tests and documentation

- Add focused GraphQL end-to-end tests.
- Add a cross-interface test proving REST and GraphQL share persistence.
- Add ready-to-run GraphQL examples to the README.
- Run the complete REST and GraphQL test suites.
- Produce a pre-deployment report covering both interfaces.

### Milestone 11: Production deployment preparation

- Confirm the application reads `PORT`, `DATABASE_URL`, JWT settings, and allowed origins from the environment.
- Confirm production startup uses compiled output.
- Confirm `prisma migrate deploy` is separated from normal development migrations.
- Add or verify Railway deployment configuration.
- Build and run the production Docker image locally.
- Test the image against a clean PostgreSQL database.
- Confirm production startup does not erase or reseed data.
- Complete a secrets and logging review.

### Milestone 12: Railway deployment and smoke testing

- Push the completed repository to GitHub.
- Create the Railway application and managed PostgreSQL services.
- Add production variables without committing them.
- Run Prisma production migrations.
- Create the initial administrator through the controlled production procedure.
- Generate the public domain.
- Execute the complete public deployment verification checklist.
- Add verified live links to the README.
- Produce the final report covering REST, GraphQL, Docker, PostgreSQL, and Railway.

## Definition of done

Do not call the project complete until:

- All required endpoints are implemented.
- All business rules are enforced.
- Authentication works using bearer tokens.
- Database migrations and repeatable seeds work.
- Soft-deleted records are consistently excluded.
- Validation and centralized errors work.
- Swagger accurately describes the API.
- Automated tests pass.
- The application builds successfully.
- The README setup has been verified.
- `.env.example` is complete.
- No secrets or local database files are tracked.
- The optional GraphQL phase does not break or replace any REST behavior.
- GraphQL resolvers reuse the existing services and enforce the same rules.
- GraphQL authentication, operations, documentation, and focused tests work.
- PostgreSQL is used consistently through Prisma locally and in production.
- Docker Compose can start a healthy local application and database.
- The production Docker image builds and starts from compiled output.
- Production migrations use `prisma migrate deploy`.
- Railway variables contain all production secrets.
- The health endpoint is suitable for deployment checks.
- Production data survives an application redeploy.
- Public REST, Swagger, and GraphQL smoke tests pass.

## Final handoff

When implementation is complete, provide:

1. A requirement traceability table showing where each requirement is implemented and tested.
2. The exact commands needed to install, migrate, seed, run, and test the project.
3. A short architecture walkthrough I can rehearse.
4. Likely interview questions with concise answers based on this codebase.
5. Any remaining limitations or optional improvements, clearly separated from required work.
6. A REST-versus-GraphQL comparison explaining how both delivery layers reuse the same services.
7. Ready-to-run GraphQL operations that I can demonstrate during a walkthrough.
8. The verified Railway deployment URLs.
9. A deployment runbook covering variables, migrations, administrator creation, verification, and rollback considerations.
10. A concise explanation of how Docker Compose development differs from Railway production.
