# Project Flow Analysis

This document explains the flow and architecture of the **my-nest-app** project.

## 1. Project Overview
This is a NestJS-based backend application designed to practice various core concepts of the framework, including Dependency Injection, Middleware, Guards, Pipes, Exception Filters, and complex MongoDB relationships using Mongoose.

## 2. Project Flow & Request Lifecycle

When a request is made to the server, it follows this typical NestJS lifecycle:

1.  **Entry Point ([main.ts](src/main.ts))**: The application starts here. It bootstraps the `AppModule`, sets custom DNS servers, and applies global configurations like `ValidationPipe`.
2.  **Middleware ([logger.middleware.ts](src/middleware/logger/logger.middleware.ts))**: The `LoggerMiddleware` is applied globally in `AppModule`. Every request is logged (Method and URL) before reaching any controller.
3.  **Guards**: 
    - `AuthGuard`: Checks for a Bearer token in the `Authorization` header.
    - `RolesGuard`: Checks user roles (Admin/User) from custom headers using metadata.
4.  **Pipes ([uppercase.pipe.ts](src/common/pipes/uppercase/uppercase.pipe.ts))**: Used for data transformation (e.g., converting names to uppercase) or validation (using `class-validator`).
5.  **Controllers**: Routes the request to the appropriate method based on the path (e.g., `/user`, `/mongo-student`).
6.  **Services**: Contains the business logic and interacts with the database (Mongoose models).
7.  **Exception Filters ([http-exception.filter.ts](src/filters/http-exception/http-exception.filter.ts))**: If an error occurs, this filter catches it and returns a formatted JSON response.

---

## 3. Key Modules & Features

| Feature | Location | Description |
| :--- | :--- | :--- |
| **Authentication** | [auth.guard.ts](src/guards/auth/auth.guard.ts) | Simple token-based protection for routes. |
| **RBAC** | [roles.guard.ts](src/guards/roles/roles.guard.ts) | Role-based access control using custom decorators. |
| **Exception Handling** | [exception.controller.ts](src/exception/exception.controller.ts) | Demonstrates custom filters and `ParseIntPipe`. |
| **Global Validation** | [main.ts](src/main.ts) | Uses `ValidationPipe` with `whitelist` and `transform` enabled. |
| **Lifecycle Hooks** | [database.service.ts](src/database/database.service.ts) | Uses `onModuleInit` and `onApplicationShutdown`. |

---

## 4. MongoDB Relationships (Mongoose)

The project heavily demonstrates different ways to model data in MongoDB:

### A. Embedded Documents (Denormalization)
- **User & Address**: The `Address` is stored directly inside the `User` document.
- **Product & Tags**: `Tags` are stored as an array of sub-documents within the `Product`.

### B. Referencing (Normalization)
- **One-to-One (1:1)**: `Employee` references a `Profile` document using `ObjectId`.
- **One-to-Many (1:N)**: `Library` references multiple `Book` documents. The service handles `insertMany` for books and then links them to the library.
- **Many-to-Many (N:M)**: `Developer` and `Project` reference each other. When a developer is created with projects, the service updates both collections to maintain the relationship.

---

## 5. How to Run & Test
- **Start App**: `npm run start:dev`
- **Endpoints**: 
    - `GET /user`: Basic service injection.
    - `POST /myname/custom`: Custom pipe demo (converts body `name` to uppercase).
    - `GET /user-roles/admin-data`: Guard demo (requires `x-user-roles: admin` header).
    - `POST /mongo-library`: Relationship demo (creates books and links them to a library).

This project serves as a comprehensive reference for building scalable and well-structured NestJS applications with MongoDB.
