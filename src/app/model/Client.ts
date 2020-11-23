import { Case } from './Case';

export class Client {

	id: number;
	full_name: string;
	email: string;
	telephone: string;

	listOfCases: Case[];

	constructor(_full_name?: string, _email?: string, _telephone?: string) {
		this.full_name = _full_name;
		this.email = _email;
		this.telephone = _telephone;
	}


}
