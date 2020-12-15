import {DateRange} from '../util/DateRange';
import {GenericService} from './generic.service';
import {Injectable} from '@angular/core';
import {Lawsuit} from '../model/Lawsuit';
import {Observable} from 'rxjs';
import { TOKEN_NAME} from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class LawsuitService extends GenericService<Lawsuit> {
  route = 'lawsuit';

  getNextThreeLawsuit(): Observable<Lawsuit[]> {
    return this.http.get<Lawsuit[]>(`${this.route}/nextThreeLawsuit`, {
      responseType: 'json',
      headers: {'auth-token': localStorage.getItem(TOKEN_NAME)}
    });
  }

  getLawsuitForCurrentMonth(): Observable<Lawsuit[]> {
    return this.http.get<Lawsuit[]>(`${this.route}/lawsuitForCurrentMonth`, {responseType: 'json',
      headers: {'auth-token': localStorage.getItem(TOKEN_NAME)}});
  }

  getLawsuitFromPeriod(dateRange: DateRange): Observable<Lawsuit[]> {
    return this.http.post<Lawsuit[]>(`/${this.route}/period`, dateRange, {responseType: 'json',
      headers: {'auth-token': localStorage.getItem(TOKEN_NAME)}});
  }

  getLawsuitsForForwardedDate(date): Observable<Lawsuit[]> {
    return this.http.get<Lawsuit[]>(`/${this.route}/getBydate?date=${date}`, {responseType: 'json',
      headers: {'auth-token': localStorage.getItem(TOKEN_NAME)}});
  }
}
