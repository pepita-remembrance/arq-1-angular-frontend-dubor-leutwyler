import {STUDENTS} from '../models/mocks/students.mock';
import Student from '../models/student';
import {DataSourceService} from './baseService';
import {Injectable} from '@angular/core';

@Injectable()
export class StudentService extends DataSourceService<Student, number> {
  extractId(obj: Student): number {
    return obj.fileNumber;
  }

  fetchData(): Promise<Student[]> {
    return Promise.resolve(STUDENTS);
  }

  getByName(name: string, surname: string): Promise<Student> {
    return this.fetchData().then(data => data.find(student => student.name === name && student.surname === surname));
  }
}
