import { Case } from './Case';

export class Lawsuit {

    id: number;

    date: Date;
    date_formatted: string;
    note: string;
    id_case: Case

    _bc_color:string;

    constructor(_date?: Date, _note?: string, _id_case?: Case) {
        this.date = _date;
        this.note = _note
        this.id_case = _id_case
    }
}