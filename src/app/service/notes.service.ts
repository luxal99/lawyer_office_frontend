import {GenericService} from './generic.service';
import {Injectable} from '@angular/core';
import {Notes} from '../model/Notes';
import {Observable} from 'rxjs';
import { TOKEN_NAME} from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends GenericService<Notes> {
  route = 'notes';

  getNotesForForwardedDate(date: Date): Observable<Notes[]> {
    return this.http.get<Notes[]>(`/${this.route}/getByDate?date=${date}`, {
      responseType: 'json',
      headers: {'auth-token': localStorage.getItem(TOKEN_NAME)}
    });
  }
}
