# Testing Strategy

This codebase prioritizes testing the core business logic components to ensure stability as the platform grows. We utilize **Jest** as the primary testing framework, seamlessly integrated with NestJS.

## Unit Testing

Unit tests isolate individual services by mocking external dependencies (such as the database via Prisma). 

### Covered Areas
- **AuthService**: We verify that logins fail gracefully upon invalid passwords or missing users, and that valid credentials successfully generate and return a signed JWT access token.
- **ApplicantsService**: We assert that conflicting applicants (e.g., duplicated emails) are caught by our business logic constraints before hitting the database, and that state transitions (e.g., changing status) are correctly restricted.

### Running Tests
To run all unit tests across the repository:
```bash
pnpm test
```

For watch mode during development:
```bash
pnpm run test:watch
```

## E2E Testing

End-to-End (E2E) testing ensures that the entire stack, from the HTTP layer down to the response format, functions correctly. E2E tests are located in the `/test` directory.

To run the E2E test suite:
```bash
pnpm run test:e2e
```
