import * as C from './course';

export default class Student {
  constructor(public id: number, public name: string, public last_name: string,
              public careers: C.Career[] = [], public subjects: C.Subject[] = []) {
  }
}
