import { Client } from './Client';
import { Lawsuit } from './Lawsuit';
import { formatDate } from '@angular/common';

export class Case {

	id: number;

	title:string;
	creation_date: Date;
	creation_date_formatted:string;
	note: string;
	status:boolean

	id_client: Client
	listOfLawsuits:Lawsuit[];
	
	constructor(_title?:string,_creation_date?: Date, _note?: string, _id_client?: Client) {
		this.title = _title;
		this.creation_date = _creation_date;
		this.note = _note;
		this.id_client = _id_client;
	}
}
