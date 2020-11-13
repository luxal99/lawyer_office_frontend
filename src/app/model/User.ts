import { UserInfo } from './UserInfo';

export class User {

    id: number

    username: string;
    password: string

    id_user_info: UserInfo;

    constructor(_username?: string, _password?: string, _id_user_info?: UserInfo) {

        this.username = _username;
        this.password = _password;
        this.id_user_info = _id_user_info;
    }
}