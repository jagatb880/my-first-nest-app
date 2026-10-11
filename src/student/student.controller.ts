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
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  getStudentById(@Param('id') id: number) {
    return this.studentService.getStudentById(Number(id));
  }

  @Post()
  createStudent(@Body() body: { name: string; age: number }) {
    return this.studentService.createStudent(body);
  }

  @Put(':id')
  updateStudent(
    @Param('id') id: number,
    @Body() updatedStudent: { name: string; age: number },
  ) {
    return this.studentService.updateStudent(Number(id), updatedStudent);
  }

  @Patch(':id')
  patchStudent(
    @Param('id') id: number,
    @Body() updatedFields: Partial<{ name: string; age: number }>,
  ) {
    return this.studentService.patchStudent(Number(id), updatedFields);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: number) {
    return this.studentService.deleteStudent(Number(id));
  }
}
