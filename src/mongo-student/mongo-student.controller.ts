import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MongoStudentService } from './mongo-student.service';
import { Student } from './mongo-student.schema';

@Controller('mongo-student')
export class MongoStudentController {
  constructor(private readonly studentService: MongoStudentService) {}

  @Post()
  async createStudent(@Body() studentData: Partial<Student>): Promise<Student> {
    return this.studentService.createStudent(studentData);
  }

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<Student | null> {
    return this.studentService.getStudentById(id);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() studentData: Partial<Student>,
  ): Promise<Student | null> {
    return this.studentService.updateStudent(id, studentData);
  }

  @Patch(':id')
  async patchStudent(
    @Param('id') id: string,
    @Body() studentData: Partial<Student>,
  ): Promise<Student | null> {
    return this.studentService.patchStudent(id, studentData);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string): Promise<Student | null> {
    return this.studentService.deleteStudent(id);
  }
}
