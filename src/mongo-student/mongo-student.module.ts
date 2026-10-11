import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './mongo-student.schema';
import { MongoStudentService } from './mongo-student.service';
import { MongoStudentController } from './mongo-student.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [MongoStudentService],
  controllers: [MongoStudentController],
})
export class MongoStudentModule {}
