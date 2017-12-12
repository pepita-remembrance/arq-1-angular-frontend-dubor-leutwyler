import {Career} from '../models/career';
import {CAREERS} from '../models/mocks/career.mock';
import {DataSourceService} from './dataSource.service';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class CareerService extends DataSourceService<Career, string> {
  asd = {"shortName":"TPI","longName":"Tecnicatura Universitaria en Programacion Informatica"}

  careersUrl = 'https://ins-poll-develop.herokuapp.com/careers';

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  extractId(obj: Career): string {
    return obj.shortName;
  }

  fetchData() {
    if(!this.http) return Promise.resolve([])
    return this.http
    .get<{ shortName: string, longName : string }[]>
    (this.careersUrl).toPromise().then(careers => {
        const promises : Promise<Career[]>[] = []
        careers.forEach(career => {
          promises.push(this.http.get<Career[]>(`${this.careersUrl}/${career.shortName}`).toPromise())
        });
        return Promise.all<Career[]>(promises).then(values => values)
    })
  }

  getForAdmin(careers: string[]) : Promise<Career[]> {
    return Promise.resolve(CAREERS).then(thecareers => thecareers.filter(career =>
      careers.indexOf(career.shortName) !== -1).map(career => career as Career));
  }

  getForStudent(careers: string[]) : Promise<Career[]> {
    return this.fetchData().then(thecareers => thecareers.filter(career =>
      careers.indexOf(career.shortName) !== -1).map(career => career as Career));
  }
}
