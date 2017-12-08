import {STUDENTS} from '../models/mocks/students.mock';
import Student from '../models/student';
import {DataSourceService} from './dataSource.service';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class StudentService extends DataSourceService<Student, number> {

  studentsUrl = 'https://ins-poll-back-arqsoft-2017s2.herokuapp.com/students';

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  extractId(obj: Student): number {
    return obj.fileNumber;
  }

  fetchData(): Promise<Student[]> {
    // if(!this.http) return Promise.resolve([])
    // return this.http.get<Student[]>(this.studentsUrl).toPromise()
    return Promise.resolve(STUDENTS);
  }

  getByName(name: string, surname: string): Promise<Student> {
    return this.fetchData().then(data => data.find(student => (student.name === name) && (student.surname === surname)));
  }
}
