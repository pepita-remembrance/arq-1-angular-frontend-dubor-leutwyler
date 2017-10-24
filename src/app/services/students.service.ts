import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { STUDENTS } from '../models/mocks/students.mock';
import Student from '../models/student';


@Injectable()
export class StudentsService {

  public student: Student;

  constructor(private http: Http) {}

  getStudents(): Promise<Student[]> {
    return Promise.resolve(STUDENTS);
  }

  getStudent(id: number): Promise<Student> {
    return this.getStudents().then(students => students.find(student => student.id === id));
  }

  getStudentBy(name: string, surname: string): Promise<Student> {
    return this.getStudents().then(students =>
      students.find(student => student.name === name && student.surname === surname));
  }
}
