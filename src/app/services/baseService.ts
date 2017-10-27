export abstract class DataSourceService<T, K> {
  public data: T[] = [];

  constructor() {
    this.fetchData()
      .then(data => this.data = data)
      .catch(this.handleError);
  }

  protected abstract fetchData(): Promise<T[]>;

  abstract extractId(obj: T): K;

  getById(id: K): Promise<T> {
    return this.fetchData().then(data => data.find(obj => this.extractId(obj) === id));
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
