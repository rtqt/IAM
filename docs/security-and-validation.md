# Security and Validation

I prioritized making the API secure and capable of handling bad data.

## Authentication and Security

### JWT Strategy
I used **JSON Web Tokens (JWT)** for stateless authentication. 
- When an Administrator logs in, the `AuthService` checks their credentials and issues a signed JWT.
- I added the `@UseGuards(JwtAuthGuard)` decorator to protected endpoints, so you can only access them if you pass a valid token.

### Password Hashing
I didn't store plaintext passwords. I used **bcrypt** to hash passwords before they go into the database.

## Validation and Error Handling

### DTOs & Class-Validator
I set up Data Transfer Objects (DTOs) with `class-validator` rules for every incoming request.
- **Whitelist**: I configured it to strip out extra fields that aren't defined in the DTO (`whitelist: true`).
- **Forbid Non-Whitelisted**: If someone sends an unknown field, the request fails with a 400 error instead of silently ignoring it (`forbidNonWhitelisted: true`).

### Global Exception Filter
I wrote a custom `AllExceptionsFilter` to catch unhandled errors globally.
- Standard HttpExceptions map to the correct HTTP responses.
- **Prisma Integration**: I caught database-level errors (like Prisma's `P2002` Unique Constraint violation) and mapped them to a `409 Conflict`. This stops the app from returning a generic `500 Internal Server Error` just because someone submitted a duplicate email.
- The frontend gets a predictable error response with `statusCode`, `error`, `message`, `path`, and `timestamp`.
