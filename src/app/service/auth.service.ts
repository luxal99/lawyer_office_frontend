import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LOGIN_SLASH_ROUTE, TOKEN_NAME} from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {
  }

  auth(user) {
    return this.http.post('/user/auth', user, {responseType: 'json'});
  }

  findUserByHash(token) {
    return this.http.post('/user/findUserByHash', token, {responseType: 'json'});
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(TOKEN_NAME)) { // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate([LOGIN_SLASH_ROUTE], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
