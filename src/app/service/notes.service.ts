import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Notes } from '../model/Notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends GenericService<Notes> {
  route = "notes"
}
