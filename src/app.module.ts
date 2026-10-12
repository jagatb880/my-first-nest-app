import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config';
import { EvService } from './ev/ev.service';
import { EvController } from './ev/ev.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoStudentModule } from './mongo-student/mongo-student.module';
import { MongoUserModule } from './mongo-user/mongo-user.module';
import { MongoEmployeeModule } from './mongo-employee/mongo-employee.module';
import { MongoProductModule } from './mongo-product/mongo-product.module';
import { MongoLibraryModule } from './mongo-library/mongo-library.module';

@Module({
  imports: [
    EmployeeModule,
    CategoryModule,
    StudentModule,
    CustomerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    MongoStudentModule,
    MongoUserModule,
    MongoEmployeeModule,
    MongoProductModule,
    MongoLibraryModule,
  ],
  controllers: [
    AppController,
    UserController,
    ProductController,
    MynameController,
    UserRolesController,
    ExceptionController,
    DatabaseController,
    EvController,
  ],
  providers: [
    AppService,
    UserService,
    ProductService,
    DatabaseService,
    EvService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
