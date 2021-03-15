import {Case} from './Case';

export interface Lawsuit {

  id?: number;
  date?: Date;
  dateFormatted?: string;
  note?: string;
  idCase?: Case;
  backgroundColor?: string;
}
