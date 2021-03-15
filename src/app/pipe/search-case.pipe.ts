import {Pipe, PipeTransform} from '@angular/core';
import {Case} from '../model/Case';
import {Client} from '../model/Client';

@Pipe({
  name: 'searchCase'
})
export class SearchCasePipe implements PipeTransform {

  transform(listOfCases: Array<Case> , text: string): Array<Case> {

    if (!listOfCases) {
      return [];
    }
    if (!text) {
      return listOfCases;
    }
    return listOfCases.filter(x => x.title.toLowerCase().includes(text.toLowerCase()));
  }

}
