import {Career} from '../models/career';
import {CAREERS} from '../models/mocks/career.mock';
import {DataSourceService} from './baseService';
import {Injectable} from '@angular/core';

@Injectable()
export class CareerService extends DataSourceService<Career> {
  fetchData() {
    return Promise.resolve(CAREERS);
  }

  // getById(id: string): Promise<Career> {
  //   return this.fetchData().then(data => data.find(career => career.id === id));
  // }
  //
  // getByShortName(shortName: string): Promise<Career> {
  //   return this.fetchData().then(data => data.find(career => career.shortName === shortName));
  // }
}
