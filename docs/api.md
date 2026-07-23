# API Documentation

I exposed both a REST and GraphQL API for the application so you can test and consume it however you prefer.

## REST API (Swagger)

I documented all the traditional REST endpoints using **Swagger**. I used NestJS decorators like `@ApiTags` and `@ApiBearerAuth` to generate the OpenAPI specs automatically.

You can access the interactive Swagger UI by navigating to:
```text
http://localhost:3000/api/docs
```

Through Swagger, you can test endpoints like:
- `POST /api/applicants` - Create a new applicant
- `GET /api/applicants` - List applicants (with pagination, sorting, and filtering options)
- `PATCH /api/applicants/:id/status` - Change an applicant's lifecycle status

## GraphQL Integration

I also added a **GraphQL** layer using the code-first approach. This lets clients query only the specific data fields they need.

You can access the GraphQL Playground by navigating to:
```text
http://localhost:3000/graphql
```

## Authentication Flow
For both REST and GraphQL, you need a Bearer Token for protected endpoints.
1. Run the `login` endpoint or mutation to get an `access_token`.
2. Add the token to your `Authorization` header as `Bearer <access_token>`.
3. In Swagger UI, click the "Authorize" button at the top right to inject this into your requests automatically.
