import {Career} from './career';
import {PollResult} from './poll';

export default class Student {
  constructor(public fileNumber: number, public name: string, public surname: string,
              public careers: Career[] = [], public pollResults: PollResult[] = []) {
  }
}
