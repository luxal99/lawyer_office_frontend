import {Client} from './Client';
import {Lawsuit} from './Lawsuit';

export interface Case {

  id?: number;
  title?: string;
  creationDate?: Date;
  creationDateFormatted?: string;
  note?: string;
  status?: boolean;
  idClient?: Client;
  listOfLawsuits?: Lawsuit[];

}
