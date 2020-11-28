import { DateRange } from '../util/DateRange';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Lawsuit } from '../model/Lawsuit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LawsuitService extends GenericService<Lawsuit> {
  route = "lawsuit"

  getNextThreeLawsuit(): Observable<Lawsuit[]> {
    return this.http.get<Lawsuit[]>(`${this.route}/nextThreeLawsuit`, { responseType: 'json' })
  }

  getLawsuitForCurrentMonth(): Observable<Lawsuit[]> {
    return this.http.get<Lawsuit[]>(`${this.route}/lawsuitForCurrentMonth`, { responseType: 'json' })
  }

  getLawsuitFromPeriod(dateRange: DateRange): Observable<Lawsuit[]> {
    return this.http.post<Lawsuit[]>(`/${this.route}/period`, dateRange, { responseType: 'json' })
  }
}
