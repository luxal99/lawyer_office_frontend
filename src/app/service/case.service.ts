import { Injectable } from '@angular/core';
import { Case } from '../model/Case';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CaseService extends GenericService<Case> {
  route = "case";

  getLastThreeCases(){
    return this.http.get(`/${this.route}/lastThree`,{responseType:'json'})
  }

  getCaseAnalytics(){
    return this.http.get(`/${this.route}/analytics`,{responseType:'json'})
  }
}
