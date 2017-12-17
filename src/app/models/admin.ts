export default class Admin {
  constructor(public email: string, public name: string, public surname: string, public fileNumber: number,
  public careers: string[] = []) {
  }
}
