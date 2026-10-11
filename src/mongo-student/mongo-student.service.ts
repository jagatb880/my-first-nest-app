import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './mongo-student.schema';
import { Model } from 'mongoose';

@Injectable()
export class MongoStudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const newStudent = new this.studentModel(studentData);
    return newStudent.save();
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentModel.find().exec(); // Fetch all students from the database and execute the query
  }

  async getStudentById(id: string): Promise<Student | null> {
    return this.studentModel.findById(id).exec(); // Fetch a student by ID from the database and execute the query
  }

  async updateStudent(
    id: string,
    studentData: Partial<Student>,
  ): Promise<Student | null> {
    return this.studentModel
      .findByIdAndUpdate(
        id,
        {
          name: studentData.name ?? null,
          age: studentData.age ?? null,
          email: studentData.email ?? null,
        },
        { overwrite: true, new: true },
      )
      .exec(); // Update a student by ID and return the updated document
  }

  async patchStudent(
    id: string,
    studentData: Partial<Student>,
  ): Promise<Student | null> {
    return this.studentModel
      .findByIdAndUpdate(id, studentData, { new: true })
      .exec(); // Patch a student by ID and return the updated document
  }

  async deleteStudent(id: string): Promise<Student | null> {
    return this.studentModel.findByIdAndDelete(id).exec(); // Delete a student by ID and return the deleted document
  }
}
