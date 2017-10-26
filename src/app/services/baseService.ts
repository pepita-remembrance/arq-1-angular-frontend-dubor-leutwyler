import {Http} from '@angular/http';

export abstract class DataSourceService<T> {
  public data: T[] = [];

  constructor(public http: Http) {
    this.fetchData()
      .then(data => this.data = data)
      .catch(this.handleError);
  }

  protected abstract fetchData(): Promise<T[]>;

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
