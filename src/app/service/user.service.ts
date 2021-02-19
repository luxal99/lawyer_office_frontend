import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {GenericService} from './generic.service';
import {Observable} from 'rxjs';
import {TOKEN_NAME} from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {
  route = 'user';

  register(user: User): Observable<User> {
    return this.http.post<User>(`/${this.route}`, user, {responseType: 'json'});
  }

  changeCredentials(user): Observable<any> {
    return this.http.put<any>(`/${this.route}`, user,
      {
        responseType: 'json',
        headers: {'auth-token': localStorage.getItem(TOKEN_NAME)}
      });
  }
}
