import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {GenericService} from './generic.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {
  route = 'user';

  register(user: User): Observable<User> {
    return this.http.post<User>(`/${this.route}`, user, {responseType: 'json'});
  }
}
