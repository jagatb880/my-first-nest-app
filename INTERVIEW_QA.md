# NestJS Interview Q&A — Based on my-nest-app Implementation

This document contains interview-style questions and answers derived from the actual implementation in this project. Use it to prepare for NestJS/backend interviews and to explain your code during reviews.

---

## 1. NestJS Basics

### Q1. What is NestJS, and how is the application bootstrapped in this project?

**Answer:** NestJS is a progressive Node.js framework for building efficient, scalable server-side applications using TypeScript. It combines OOP, FP, and FRP principles.

In this project, bootstrapping happens in [`src/main.ts`](src/main.ts):

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ ... }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
```

`NestFactory.create(AppModule)` initializes the root module, and `app.listen()` starts the HTTP server on port 3000 (or the value from `PORT` env).

---

### Q2. What is a Module in NestJS, and how are modules organized here?

**Answer:** A Module (`@Module()`) is a class annotated with `@Module` that organizes related controllers, providers, and imports into a single unit. NestJS uses modules to manage dependency injection scope.

In this project:
- [`src/app.module.ts`](src/app.module.ts) is the root `AppModule`.
- Feature modules include `EmployeeModule`, `CategoryModule`, `StudentModule`, `CustomerModule`, `MongoStudentModule`, `MongoUserModule`, etc.
- Each feature module declares its own `controllers` and `providers`.

Example: [`src/employee/employee.module.ts`](src/employee/employee.module.ts)

```typescript
@Module({
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
```

Modules listed in `AppModule`'s `imports` array are loaded when the app starts.

---

### Q3. How does Dependency Injection (DI) work in this project?

**Answer:** NestJS DI is powered by TypeScript decorators and the `reflect-metadata` library. Classes marked `@Injectable()` can be injected into constructors of controllers or other services.

Example: [`src/student/student.controller.ts`](src/student/student.controller.ts)

```typescript
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  // ...
}
```

Here, `StudentService` (marked `@Injectable()`) is automatically instantiated and injected into `StudentController`.

---

## 2. Controllers & Routing

### Q4. How are routes defined in this project?

**Answer:** Controllers handle incoming requests. The `@Controller()` decorator defines a base route prefix, and method decorators (`@Get()`, `@Post()`, etc.) define HTTP methods and paths.

Example: [`src/student/student.controller.ts`](src/student/student.controller.ts)

```typescript
@Controller('student')
export class StudentController {
  @Get()               // GET /student
  getAllStudents() { ... }

  @Get(':id')          // GET /student/:id
  getStudentById(@Param('id') id: number) { ... }

  @Post()              // POST /student
  createStudent(@Body() body: ...) { ... }
}
```

Route parameters are extracted using `@Param()`, request bodies with `@Body()`, and query strings with `@Query()`.

---

### Q5. What does `@Controller()` with no argument do? Give an example from the project.

**Answer:** When `@Controller()` is used without a string argument, the controller responds at the root path `/`.

Example: [`src/app.controller.ts`](src/app.controller.ts)

```typescript
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

This serves `GET /` and returns `"Hello World!"`.

---

## 3. Services

### Q6. What is the role of a Service in this project?

**Answer:** Services (`@Injectable()`) contain business logic and data access. Controllers delegate work to services, keeping controllers thin and testable.

Example: [`src/category/category.service.ts`](src/category/category.service.ts)

```typescript
@Injectable()
export class CategoryService {
  getCategory(): string[] {
    return ['Mobile', 'Laptop', 'Tablet'];
  }
}
```

`CategoryController` calls `this.categoryService.getCategory()` to return the list.

---

## 4. Middleware

### Q7. What is Middleware in NestJS, and how is it applied globally in this project?

**Answer:** Middleware functions execute before the route handler. They have access to `Request`, `Response`, and `NextFunction`.

In this project, [`LoggerMiddleware`](src/middleware/logger/logger.middleware.ts) logs every request:

```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${req.method} - ${req.originalUrl}]`);
    next();
  }
}
```

It is applied globally in [`AppModule`](src/app.module.ts) via `NestModule`:

```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

`forRoutes('*')` applies it to all routes.

---

## 5. Guards (Authentication & Authorization)

### Q8. What is a Guard, and how does `AuthGuard` work in this project?

**Answer:** A Guard (`CanActivate`) determines whether a request can proceed to the handler. It returns `true` (allow), `false` (deny), or a Promise/Observable.

In this project, [`AuthGuard`](src/guards/auth/auth.guard.ts) checks for a hardcoded Bearer token:

```typescript
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    return authHeader === 'Bearer my-secret-token';
  }
}
```

It is used on [`ProductController`](src/product/product.controller.ts):

```typescript
@Get()
@UseGuards(AuthGuard)
getAllProducts() { ... }
```

If the `Authorization` header is missing or incorrect, the request is denied.

---

### Q9. How is Role-Based Access Control (RBAC) implemented in this project?

**Answer:** RBAC is implemented using a custom `RolesGuard`, a `Roles` decorator, and a `Role` enum.

Files involved:
- [`roles.enums.ts`](src/guards/roles/roles.enums.ts) — defines `Role.ADMIN` and `Role.USER`.
- [`roles.decorator.ts`](src/guards/roles/roles.decorator.ts) — sets metadata using `SetMetadata`.
- [`roles.guard.ts`](src/guards/roles/roles.guard.ts) — reads metadata via `Reflector` and checks the `x-user-roles` header.

Usage in [`UserRolesController`](src/user-roles/user-roles.controller.ts):

```typescript
@Get('admin-data')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
getAdminData() {
  return { message: 'Only admin can access this data.' };
}
```

The guard compares the role from the request header against the required roles set by the decorator.

---

## 6. Pipes

### Q10. What is a Pipe, and how is `UppercasePipe` implemented?

**Answer:** A Pipe transforms input data or validates it before it reaches the route handler.

In this project, [`UppercasePipe`](src/common/pipes/uppercase/uppercase.pipe.ts) transforms a parameter value to uppercase:

```typescript
@Controller('myname')
export class MynameController {
  @Post('custom')
  transform(@Body('name', new UppercasePipe()) name: string) {
    return { message: `Received name: ${name}` };
  }
}
```

If you send `{ "name": "john" }`, the pipe converts it to `"JOHN"` before the handler runs.

---

### Q11. How is global validation configured in this project?

**Answer:** In [`main.ts`](src/main.ts), a global `ValidationPipe` is applied:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,        // strips properties not in the DTO
    forbidNonWhitelisted: true, // throws error for non-whitelisted props
    transform: true,        // auto-transforms payloads to DTO types
  }),
);
```

This ensures all incoming request bodies are validated and sanitized across every route.

---

### Q12. How are DTOs used with class-validator in this project?

**Answer:** DTOs (Data Transfer Objects) define the shape of request payloads and are validated using `class-validator` decorators.

Example: [`CreateCustomerDto`](src/customer/DTO/create-customer.dto.ts)

```typescript
export class CreateCustomerDto {
  @IsString()
  readonly name: string;
  @IsInt()
  readonly age: number;
}
```

Used in [`CustomerController`](src/customer/customer.controller.ts):

```typescript
@Post()
createCustomer(@Body() createCustomerDTO: CreateCustomerDto) {
  return this.customerService.addCustomer(createCustomerDTO);
}
```

`ValidationPipe` (global) will reject requests where `name` is not a string or `age` is not an integer.

---

## 7. Exception Filters

### Q13. What is an Exception Filter, and how is it used here?

**Answer:** Exception Filters catch exceptions thrown in the application and convert them into user-friendly error responses.

In this project, [`HttpExceptionFilter`](src/filters/http-exception/http-exception.filter.ts) catches all exceptions:

```typescript
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || 'Internal server error',
    });
  }
}
```

Applied to [`ExceptionController`](src/exception/exception.controller.ts):

```typescript
@Controller('exception')
@UseFilters(HttpExceptionFilter)
export class ExceptionController {
  @Get('hello/:id')
  getException(@Param('id', ParseIntPipe) id: number) {
    return { message: `Hello, your ID is ${id}`, status: 200 };
  }
}
```

If `ParseIntPipe` fails (e.g., `id=abc`), the filter catches it and returns a structured JSON error instead of a raw stack trace.

---

## 8. MongoDB / Mongoose Relationships

### Q14. What MongoDB relationship patterns are demonstrated in this project?

**Answer:** The project demonstrates four patterns:

| Pattern | Example | File |
|---------|---------|------|
| **Embedded (Denormalized)** | `Product` embeds `tags` array | [`mongo-product/schema/product.schema.ts`](src/mongo-product/schema/product.schema.ts) |
| **Embedded (Denormalized)** | `User` embeds `address` object | [`mongo-user/schema/user.schema.ts`](src/mongo-user/schema/user.schema.ts) |
| **Referencing (1:1)** | `Employee` references `Profile` by `ObjectId` | [`mongo-employee/schema/employee.schema.ts`](src/mongo-employee/schema/employee.schema.ts) |
| **Referencing (1:N)** | `Library` references multiple `Book`s | [`mongo-library/schema/library.schema.ts`](src/mongo-library/schema/library.schema.ts) |
| **Referencing (N:M)** | `Developer` ↔ `Project` (many-to-many) | [`mongo-project/schemas/project.schema.ts`](src/mongo-project/schemas/project.schema.ts) |

---

### Q15. How is a One-to-One relationship implemented between Employee and Profile?

**Answer:** Referencing is used. `Employee` stores a `profile` field of type `Types.ObjectId` that references the `Profile` collection.

Schema: [`employee.schema.ts`](src/mongo-employee/schema/employee.schema.ts)

```typescript
@Prop({ type: MongooseSchema.Types.ObjectId, ref: Profile.name })
profile: Types.ObjectId | Profile;
```

Service: [`mongo-employee.service.ts`](src/mongo-employee.service.ts)

```typescript
async createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
  const profile = await this.profileModel.create(employeeData.profile);
  const employee = await this.employeeModel.create({
    name: employeeData.name,
    profile: profile._id,
  });
  return employee.populate('Profile');
}
```

First the `Profile` is created, then its `_id` is stored on the `Employee`. `populate()` is used to fetch the related profile data.

---

### Q16. How is a One-to-Many relationship implemented between Library and Book?

**Answer:** `Library` stores an array of `ObjectId`s referencing `Book` documents.

Schema: [`library.schema.ts`](src/mongo-library/schema/library.schema.ts)

```typescript
@Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }] })
books: Types.ObjectId[] | Book[];
```

Service: [`mongo-library.service.ts`](src/mongo-library.service.ts)

```typescript
async createLibrary(libraryData: CreateLibraryDto): Promise<Library> {
  const createdBooks = await this.bookModel.insertMany(libraryData.books);
  const bookIds = createdBooks.map((book) => book._id);

  const library = await this.libraryModel.create({
    name: libraryData.name,
    books: bookIds,
  });

  return library.populate('books');
}
```

Multiple books are created first, their IDs are collected, and the `Library` document stores references to those IDs.

---

### Q17. How is a Many-to-Many relationship implemented between Developer and Project?

**Answer:** Both sides reference each other using arrays of `ObjectId`s.

Schema: [`project.schema.ts`](src/mongo-project/schemas/project.schema.ts)

```typescript
@Prop({ type: [{ type: Types.ObjectId, ref: 'Developer' }] })
developers: Types.ObjectId[];
```

Service: [`mongo-project.service.ts`](src/mongo-project.service.ts)

```typescript
async createDeveloper(devData: CreateDeveloperDto): Promise<Developer> {
  const createdProjects = await this.projectModel.insertMany(devData.projects);
  const projectIds = createdProjects.map((p) => p._id);

  const developer = await this.developerModel.create({
    name: devData.name,
    projects: projectIds,
  });

  // Update each project to reference this developer (many-to-many)
  await Promise.all(
    createdProjects.map((project) =>
      this.projectModel.findByIdAndUpdate(project._id, {
        $push: { developers: developer._id },
      }),
    ),
  );

  return developer.populate('projects');
}
```

Projects are created, linked to the developer, and then each project is updated to push the developer's ID into its `developers` array. This maintains the bidirectional many-to-many relationship.

---

### Q18. What is `MongooseModule.forFeature()` used for?

**Answer:** It registers a Mongoose schema/model within a specific feature module so it can be injected via `@InjectModel()`.

Example: [`mongo-student.module.ts`](src/mongo-student/mongo-student.module.ts)

```typescript
imports: [
  MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
],
```

This makes `Student` model available for injection in `MongoStudentService` using:

```typescript
constructor(
  @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
) {}
```

The global database connection is established in `AppModule` via `MongooseModule.forRoot(process.env.MONGO_URL!)`.

---

## 9. Configuration & Environment

### Q19. How is environment configuration handled in this project?

**Answer:** `ConfigModule` from `@nestjs/config` is imported globally in `AppModule`:

```typescript
ConfigModule.forRoot({
  isGlobal: true,
}),
```

This makes `ConfigService` available everywhere without importing `ConfigModule` in every feature module.

Example usage: [`ev.service.ts`](src/ev/ev.service.ts)

```typescript
getDbUrl() {
  return this.configureService.get<string>('DATABASE_URL');
}
```

The `MongooseModule.forRoot(process.env.MONGO_URL!)` in `AppModule` reads the MongoDB connection string from environment variables.

---

## 10. Lifecycle Hooks

### Q20. What NestJS lifecycle hooks are demonstrated?

**Answer:** [`DatabaseService`](src/database/database.service.ts) demonstrates `onModuleInit` and `onApplicationShutdown`:

```typescript
@Injectable()
export class DatabaseService {
  private isConnected: boolean = false;

  onModuleInit() {
    this.isConnected = true;
    console.log('DatabaseService initialized and connected to the database.');
  }

  onApplicationShutdown(signal?: string) {
    this.isConnected = false;
    console.log(`DatabaseService is shutting down. Signal: ${signal}`);
  }
}
```

- `onModuleInit()` runs after the module's dependencies are resolved.
- `onApplicationShutdown()` runs when the NestJS application shuts down.

---

## 11. Testing

### Q21. How are tests organized in this project?

**Answer:** The project uses Jest with `ts-jest`. Each service and controller has a corresponding `.spec.ts` file (e.g., [`student.service.spec.ts`](src/student/student.service.spec.ts), [`student.controller.spec.ts`](src/student/student.controller.spec.ts)).

Run tests with:
```bash
npm run test          # unit tests
npm run test:e2e      # end-to-end tests
npm run test:cov      # test coverage
```

---

## Quick Revision Checklist

- [ ] Explain `main.ts` bootstrap flow
- [ ] Difference between `@Controller('user')` and `@Controller()`
- [ ] How `@Injectable()` enables DI
- [ ] Middleware vs Guard vs Pipe vs Filter (execution order)
- [ ] How `ValidationPipe` with `whitelist` works
- [ ] Embedded vs Referenced relationships in Mongoose
- [ ] What `populate()` does in Mongoose
- [ ] How `MongooseModule.forFeature()` differs from `forRoot()`
- [ ] Role of `NestModule` and `MiddlewareConsumer`
- [ ] How `ConfigModule.forRoot({ isGlobal: true })` works

---

Good luck with your interview! All answers above reference real implementation in this project — you can open the linked files to show the interviewer the actual code.