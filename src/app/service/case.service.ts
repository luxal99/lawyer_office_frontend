import { Injectable } from '@angular/core';
import { Case } from '../model/Case';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CaseService extends GenericService<Case> {
  route = "case";
}
