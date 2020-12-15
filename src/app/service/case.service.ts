import {Case} from '../model/Case';
import {GenericService} from './generic.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { TOKEN_NAME} from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class CaseService extends GenericService<Case> {
  route = 'case';

  getLastThreeCases(): Observable<Case[]> {
    return this.http.get<Case[]>(`/${this.route}/lastThree`, {
      responseType: 'json', headers: {'auth-token': localStorage.getItem(TOKEN_NAME)}
    });
  }

  getCaseAnalytics(): Observable<Case[]> {
    return this.http.get<Case[]>(`/${this.route}/analytics`, {
      responseType: 'json',
      headers: {'auth-token': localStorage.getItem(TOKEN_NAME)}
    });
  }
}
