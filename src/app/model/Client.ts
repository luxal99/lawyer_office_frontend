import {Case} from './Case';

export interface Client {

  id?: number;
  fullName?: string;
  email?: string;
  telephone?: string;
  listOfCases?: Case[];


}
