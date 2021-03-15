import {Pipe, PipeTransform} from '@angular/core';

import {Lawsuit} from '../model/Lawsuit';

@Pipe({
  name: 'searchLawsuit'
})
export class SearchLawsuitPipe implements PipeTransform {

  transform(listOfLawsuits: Array<Lawsuit>, text: string): Array<Lawsuit> {

    if (!listOfLawsuits) {
      return [];
    }
    if (!text) {
      return listOfLawsuits;
    }
    return listOfLawsuits.filter(x => x.idCase.title.toLowerCase().includes(text.toLowerCase()));
  }

}
