export class UserInfo {

    id:number
    full_name:string;
    email:string;

    constructor(_full_name?:string,_email?:string) {
        this.full_name = _full_name;
        this.email = _email;
    }
    
}