import { Injectable } from '@angular/core';
import { Lawsuit } from '../model/Lawsuit';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class LawsuitService extends GenericService<Lawsuit> {
  route = "lawsuit"
}
