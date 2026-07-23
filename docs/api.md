# API Documentation

The application exposes a robust API designed for easy consumption, high performance, and deep documentation.

## REST API (Swagger)

All traditional REST endpoints are fully documented using **Swagger**. We utilize NestJS Swagger decorators (`@ApiTags`, `@ApiBearerAuth`) to generate real-time OpenAPI specifications.

You can access the interactive Swagger UI by running the application and navigating to:
```text
http://localhost:3000/api/docs
```

Through Swagger, you can test endpoints like:
- `POST /api/applicants` - Create a new applicant
- `GET /api/applicants` - List applicants (with pagination, sorting, and filtering options)
- `PATCH /api/applicants/:id/status` - Change an applicant's lifecycle status

## GraphQL Integration

In addition to REST, the platform provides a **GraphQL** layer (code-first approach). This allows clients who need more flexible data retrieval to query only the specific data fields they require, which is incredibly useful for dashboard and analytics views.

You can access the interactive GraphQL Playground by navigating to:
```text
http://localhost:3000/graphql
```

## Authentication Flow
For both REST and GraphQL, the system requires a Bearer Token for protected endpoints.
1. Authenticate via the `login` endpoint/mutation to receive an `access_token`.
2. Provide the token in the `Authorization` header as `Bearer <access_token>`.
3. In Swagger UI, click the "Authorize" button at the top right to inject this globally into your requests.
