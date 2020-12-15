import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {GenericService} from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {
  route = 'user';
}
