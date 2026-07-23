# Testing Strategy

I used **Jest** for testing since it integrates cleanly with NestJS. I focused on testing the core business logic components.

## Unit Testing

I wrote unit tests for the services and mocked the Prisma database calls so they run in isolation.

### Covered Areas
- **AuthService**: I tested the login flow to verify it rejects bad passwords and missing users, and that valid credentials return a signed JWT.
- **ApplicantsService**: I wrote tests to ensure the logic catches conflicting applicants (like duplicate emails) before hitting the database, and that the state transitions (like changing a status to ACCEPTED) are restricted correctly.

### Running Tests
To run all unit tests:
```bash
pnpm test
```

For watch mode during development:
```bash
pnpm run test:watch
```

## E2E Testing

End-to-End (E2E) testing hits the HTTP layer to check the full request and response cycle. You can find the E2E setup in the `/test` directory.

To run the E2E test suite:
```bash
pnpm run test:e2e
```
