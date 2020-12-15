import {Injectable} from '@angular/core';
import {Client} from '../model/Client';
import {GenericService} from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends GenericService<Client> {
  route = 'client';
}
