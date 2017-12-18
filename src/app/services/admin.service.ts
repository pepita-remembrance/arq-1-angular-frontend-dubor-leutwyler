import {admins} from '../models/mocks/admins.mock';
import Admin from '../models/admin';
import {Career, Subject} from '../models/career';
import {Poll, SubjectOffer} from '../models/poll';
import {DataSourceService} from './dataSource.service';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'


@Injectable()
export class AdminService extends DataSourceService<Admin, number> {

  adminsUrl = `https://ins-poll-back${environment.URL_SUFFIX}.herokuapp.com/admins`;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  extractId(obj: Admin): number {
    return obj.fileNumber;
  }

  getById(fileNumber: number) : Promise<Admin> {
    if(!this.http) return Promise.resolve(undefined)
    return this.http.get<Admin>(`${this.adminsUrl}/${fileNumber}`).toPromise();
  }

  getCareersById(fileNumber: number) : Promise<Career[]> {
    if(!this.http) return Promise.resolve([])
    return this.http.get<Career[]>(`${this.adminsUrl}/${fileNumber}/careers`).toPromise()
  }

  getPollsById(fileNumber: number) : Promise<Poll[]> {
    if(!this.http) return Promise.resolve([])
    return this.http.get<Poll[]>(`${this.adminsUrl}/${fileNumber}/polls`).toPromise()
  }

  fetchData(): Promise<Admin[]> {
    if(!this.http) return Promise.resolve([])
    return this.http.get<Admin[]>(this.adminsUrl).toPromise();
  }

  getByName(name: string, surname: string): Promise<Admin> {
    return this.fetchData().then(data => {
      return data.find(admin => (admin.name === name) && (admin.surname === surname))
    });
  }

  getTally(shortName: string, pollKey) {
    return this.http.get<Map<Subject, SubjectOffer>>
    (`${this.adminsUrl}/careers/${shortName}/polls/${pollKey}/tally`).toPromise()
  }

  seed() {
    return this.http.get<Admin[]>(`https://ins-poll-back-develop.herokuapp.com/seed`).toPromise()
  }
}
