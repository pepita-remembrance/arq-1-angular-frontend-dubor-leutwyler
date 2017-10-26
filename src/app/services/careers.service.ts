import {Career} from '../models/career';
import {CAREERS} from '../models/mocks/career.mock';
import {BaseService} from './baseService';

export class CareersService extends BaseService {

  getCareers(): Promise<Career[]> {
    return Promise.resolve(CAREERS);
  }

}
