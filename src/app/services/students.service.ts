import { STUDENTS } from '../models/mocks/students.mock';
import Student from '../models/student';
import {BaseService} from './baseService';


export class StudentsService extends BaseService {

  public student: Student;

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
