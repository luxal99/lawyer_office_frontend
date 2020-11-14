import { Client } from './Client';

export class Case {

	id: number;

	title:string;
	creation_date: Date;
	note: string;
	status:boolean

	id_client: Client

	constructor(_creation_date?: Date, _note?: string, _id_client?: Client) {
		this.creation_date = _creation_date;
		this.note = _note;
		this.id_client = _id_client;
	}
}
