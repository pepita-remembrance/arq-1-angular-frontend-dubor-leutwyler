import {Career} from '../models/career';
import {CAREERS} from '../models/mocks/career.mock';
import {DataSourceService} from './dataSource.service';
import {Injectable} from '@angular/core';

@Injectable()
export class CareerService extends DataSourceService<Career, string> {
  extractId(obj: Career): string {
    return obj.shortName;
  }

  fetchData() {
    return Promise.resolve(CAREERS);
  }

  getForAdmin(careers : string[]) {
    return Promise.resolve(CAREERS.filter(career => careers.indexOf(career.shortName) != -1));
  }
}
