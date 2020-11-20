import { Case } from '../model/Case';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseService extends GenericService<Case> {
  route = "case";

  getLastThreeCases():Observable<Case[]>{
    return this.http.get<Case[]>(`/${this.route}/lastThree`,{responseType:'json'})
  }

  getCaseAnalytics():Observable<Case[]>{
    return this.http.get<Case[]>(`/${this.route}/analytics`,{responseType:'json'})
  }
}
