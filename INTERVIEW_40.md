Below is the transcript converted into **interview-ready Q&A**. I’ve kept the answers as close as possible to the original content, only shortening and cleaning them where needed.

# NestJS Interview Questions & Answers

## 1. What is NestJS?

**Answer:**  
NestJS is a framework that can be used to build **HTTP servers/APIs, microservices, and standalone applications**.

---

## 2. What types of applications can we build using NestJS?

**Answer:**  
We can build three main types:

1. **HTTP applications** using `NestFactory.create()`
2. **Microservices** using `NestFactory.createMicroservice()`
3. **Standalone applications** using `NestFactory.createApplicationContext()`

---

## 3. What is a standalone application in NestJS?

**Answer:**  
A standalone application is an application that **doesn't have a network listener**.

It is useful for:
- Scheduled tasks
- CLI tools

---

## 4. What do all NestJS applications have in common?

**Answer:**  
All NestJS applications need a **root module**.

---

# Modules

## 5. What is a Module in NestJS?

**Answer:**  
Modules are the **building blocks of a NestJS application**.

A NestJS application can be pictured as a graph of modules, with a **root module at the top**.

---

## 6. Can one module use another module in NestJS?

**Answer:**  
Yes. The root module can use other modules, and those modules can themselves use other modules.

For example:

```text
AppModule
 ├── ProductModule
 ├── OrderModule
 │    ├── CartModule
 │    └── PaymentModule
 └── ConfigurationModule
```

---

## 7. How do we define a Module in NestJS?

**Answer:**  
A module is a class annotated with the `@Module()` decorator.

---

## 8. How do we define relationships between modules?

**Answer:**  
We define related modules using the **`imports` property** inside the `@Module()` decorator.

Example:

```typescript
@Module({
  imports: [ProductModule, OrderModule]
})
export class AppModule {}
```

---

# Decorators

## 9. What is a decorator in NestJS?

**Answer:**  
A decorator is a **special kind of function** that can be attached to classes, methods, or properties.

It can **modify their behavior and add metadata**.

---

## 10. Why are decorators important in NestJS?

**Answer:**  
Decorators are used everywhere in NestJS to define things like:

- Modules
- Controllers
- Providers
- Routes
- Injectable services

Examples:

```typescript
@Module()
@Controller()
@Injectable()
@Get()
@Post()
```

---

# Controllers

## 11. What is a Controller in NestJS?

**Answer:**  
A controller is a class annotated with the **`@Controller()` decorator**.

Its main responsibility is to **receive incoming requests and return responses**.

---

## 12. How do we define routes inside a controller?

**Answer:**  
We add methods inside the controller and annotate them with HTTP method decorators.

Example:

```typescript
@Controller('users')
export class UserController {

  @Get()
  getUsers() {
  }

  @Post()
  createUser() {
  }
}
```

---

## 13. What is the main responsibility of a Controller?

**Answer:**  
The controller's main role is to **receive requests and return responses**.

Other business logic should be delegated to other classes, such as providers/services.

---

# Providers

## 14. What is a Provider in NestJS?

**Answer:**  
A provider is a **class that can be injected into other classes as a dependency**.

---

## 15. How do we create a Provider?

**Answer:**  
We annotate the class with the `@Injectable()` decorator and declare it as a provider inside the module.

Example:

```typescript
@Injectable()
export class UserService {
}
```

---

## 16. How do we inject a Provider into a Controller?

**Answer:**  
We can inject the provider through the **constructor**.

```typescript
constructor(private userService: UserService) {}
```

---

## 17. What is Dependency Injection in NestJS?

**Answer:**  
Dependency Injection means NestJS **provides the required dependency to a class instead of the class creating the dependency itself**.

For example, `UserService` can be injected into `UserController` through its constructor.

---

# Middleware

## 18. What is Middleware in NestJS?

**Answer:**  
Middleware allows a request to **go through some processing before reaching the route handler**.

For example, middleware can be used to **log every incoming request**.

---

## 19. Give a use case for Middleware.

**Answer:**  
A common example is **request logging**.

```text
Request
   ↓
Middleware
   ↓
Controller/Handler
```

---

# Guards

## 20. What is a Guard in NestJS?

**Answer:**  
A Guard determines **whether a request should be handled by the route handler** based on conditions such as:

- Authentication
- Roles
- Permissions
- Custom logic

---

## 21. What happens when a Guard returns true or false?

**Answer:**

If the guard returns:

```text
true  → Request is allowed
false → Request is denied
```

---

## 22. Give a real-time example of a Guard.

**Answer:**  
An **authentication guard** can check whether the user is authenticated and authorized to access the requested resource.

---

## 23. How does a Guard access request information?

**Answer:**  
Guards have access to the **execution context**, which allows them to inspect details about the request.

---

# Interceptors

## 24. What is an Interceptor in NestJS?

**Answer:**  
Interceptors run **before and after the route handler** and give control over the **request-response cycle**.

---

## 25. What are Interceptors used for?

**Answer:**  
Interceptors can perform tasks like:

- Logging
- Caching
- Mapping responses
- Transforming data

---

## 26. Which interface does an Interceptor implement?

**Answer:**

```typescript
NestInterceptor
```

---

# Pipes

## 27. What is a Pipe in NestJS?

**Answer:**  
Pipes are used to **validate and transform data before it reaches the route handler**.

---

## 28. What are the two main purposes of Pipes?

**Answer:**

1. **Validation**
2. **Transformation**

---

## 29. Give an example of validation using Pipes.

**Answer:**  
A pipe can validate request data to ensure that it matches:

- Expected format
- Expected type
- Required constraints

If the data is invalid, the pipe can **throw an exception and prevent the route handler from executing**.

---

## 30. Give an example of transformation using Pipes.

**Answer:**  
A pipe can convert incoming data into a suitable format.

For example:

```text
"123" → 123
```

A string can be converted into an integer before reaching the handler.

---

## 31. What are some built-in Pipes in NestJS?

**Answer:**

Examples include:

- `ValidationPipe`
- Parsing pipes
- UUID parsing pipe

---

## 32. Can we create custom Pipes?

**Answer:**  
Yes. We can create **custom pipes** to handle specific validation or transformation requirements.

---

## 33. Which interface does a Pipe implement?

**Answer:**  
A pipe implements the **PipeTransform interface** and can be annotated with the `@Injectable()` decorator.

---

# Exception Handling / Filters

## 34. What happens if there is an unhandled error in NestJS?

**Answer:**  
By default, NestJS returns a:

```text
500 Internal Server Error
```

---

## 35. Can we manually throw HTTP exceptions in NestJS?

**Answer:**  
Yes. We can manually throw standard **HTTP exceptions** to provide more descriptive error responses.

---

## 36. What is an Exception Filter?

**Answer:**  
Exception Filters provide a **centralized way of handling exceptions**.

They determine how an exception should be handled and what response should be returned to the client.

---

## 37. Which interface does an Exception Filter implement?

**Answer:**

```typescript
ExceptionFilter
```

Exception filters are decorated using the:

```typescript
@Catch()
```

decorator.

---

## 38. Where can an Exception Filter catch errors from?

**Answer:**  
Exception Filters can catch exceptions thrown from:

- Guards
- Interceptors
- Pipes
- Route handlers

---

## 39. What is a Global Exception Filter?

**Answer:**  
A Global Exception Filter can:

- Catch application exceptions
- Log error details
- Return a standard error response
- Prevent sensitive information from being exposed

---

## 40. Why are Exception Filters useful?

**Answer:**  
They provide **centralized error handling**, ensure **consistent error responses**, protect sensitive information, and help maintain application stability and security.

---

# ⭐ Most Important: NestJS Request Lifecycle

A very good interview question from this transcript would be:

## 41. Explain the NestJS request lifecycle.

**Answer:**

A request passes through multiple stages before and after reaching the route handler.

A simplified flow is:

```text
Request
   ↓
Middleware
   ↓
Guard
   ↓
Interceptor (Before)
   ↓
Pipe
   ↓
Controller / Route Handler
   ↓
Interceptor (After)
   ↓
Response
```

If an exception occurs, **Exception Filters** can handle it.

## Easy way to remember

**M → G → I → P → C → I → Response**

- **M**iddleware → Process request
- **G**uard → Can you access?
- **I**nterceptor → Before/after
- **P**ipe → Validate/transform
- **C**ontroller → Handle request
- **Filter** → Handle exceptions

This **request lifecycle question plus Modules, Controllers, Providers, Dependency Injection, Guards, Pipes, Interceptors, and Exception Filters** covers the core interview material contained in your transcript.
