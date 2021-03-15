import {Pipe, PipeTransform} from '@angular/core';
import {Lawsuit} from '../model/Lawsuit';
import {Client} from '../model/Client';

@Pipe({
  name: 'searchClient'
})
export class SearchClientPipe implements PipeTransform {

  transform(listOfClients: Array<Client>, text: string): Array<Client> {

    if (!listOfClients) {
      return [];
    }
    if (!text) {
      return listOfClients;
    }
    return listOfClients.filter(x => x.fullName.toLowerCase().includes(text.toLowerCase()));
  }

}
