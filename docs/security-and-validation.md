# Security and Validation

Ensuring the application is secure and handles bad data gracefully is a top priority for this architecture.

## Authentication and Security

### JWT Strategy
The application employs **JSON Web Tokens (JWT)** for stateless authentication. 
- When an Administrator logs in, the `AuthService` verifies their credentials and issues a signed JWT containing their identity payload (`sub` mapping to the Admin's `id`).
- All protected endpoints use the `@UseGuards(JwtAuthGuard)` decorator, ensuring only authorized tokens can access the API.

### Password Hashing
We never store plaintext passwords. The application uses **bcrypt** to hash passwords before storing them in the database, protecting against database-level leaks.

## Validation and Error Handling

### DTOs & Class-Validator
Every incoming payload (via REST or GraphQL) is strictly validated against Data Transfer Objects (DTOs) heavily decorated with `class-validator` rules.
- **Whitelist**: Extraneous fields sent in the request payload are automatically stripped (`whitelist: true`).
- **Forbid Non-Whitelisted**: If unknown fields are sent, the request explicitly fails rather than ignoring them silently (`forbidNonWhitelisted: true`).

### Global Exception Filter
A custom `AllExceptionsFilter` catches all unhandled exceptions globally.
- Standard HttpExceptions (like `UnauthorizedException` or `BadRequestException`) are mapped clearly to proper HTTP responses.
- **Prisma Integration**: Database-level errors (such as Prisma's `P2002` Unique Constraint violations) are gracefully caught and mapped to `409 Conflict`, instead of causing a `500 Internal Server Error` crash.
- This provides the frontend or API consumer with a predictable, consistent error response structure containing `statusCode`, `error`, `message`, `path`, and `timestamp`.
