import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CAREERS } from '../models/courses.mock';
import { Career } from '../models/course';


@Injectable()
export class CareersService {
  private careersUrl = 'https://murmuring-beyond-94607.herokuapp.com/v1/careers';  // URL to web api

  constructor(private http: Http) {}

  getCarrers(): Promise<Career[]> {
    return this.http.get(this.careersUrl)
        .toPromise()
        .then(response => response.json() as Career[])
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('nope');
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
