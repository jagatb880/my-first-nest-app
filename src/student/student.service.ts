import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
  private students: { id: number; name: string; age: number }[] = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 22 },
    { id: 3, name: 'Alice Johnson', age: 19 },
  ];

  getAllStudents() {
    return this.students;
  }

  getStudentById(id: number) {
    const student = this.students.find((student) => student.id === id);
    if (!student)
      throw new NotFoundException(`Student with ID ${id} not found.`);
    return student;
  }

  //Post data for add and delete student
  createStudent(student: { name: string; age: number }) {
    const newStudent = {
      id: this.students.length + 1,
      ...student,
    };
    this.students.push(newStudent);
    return newStudent;
  }
}
