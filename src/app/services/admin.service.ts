import {admins} from '../models/mocks/admins.mock';
import Admin from '../models/admin';
import {DataSourceService} from './dataSource.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AdminService extends DataSourceService<Admin, number> {
  extractId(obj: Admin): number {
    return obj.id;
  }

  fetchData(): Promise<Admin[]> {
    return Promise.resolve(admins);
  }

  getByName(name: string, surname: string): Promise<Admin> {
    return this.fetchData().then(data => data.find(admin => (admin.name === name) && (admin.surname === surname)));
  }
}
