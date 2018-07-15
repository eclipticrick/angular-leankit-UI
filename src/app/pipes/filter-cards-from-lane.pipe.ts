import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';
import {Observable} from 'rxjs/internal/Observable';

@Pipe({
  name: 'filterCardsFromLane',
  pure: false
})
export class FilterCardsFromLanePipe implements PipeTransform {
  constructor(public data: DataService) {

  }
  transform(list: any[], boardIndex: number, lane: string): any {
    return list;
    // return new Observable(observer => {
    //   this.data.data$.subscribe(data => {
    //     const returnList = [];
    //     list.forEach(card => {
    //       let cardIsIncluded = false;
    //       data['$boards'][boardIndex]['$includedLanes'][lane].forEach(includedLane => {
    //         if (Number(card.lane.id) === includedLane) cardIsIncluded = true;
    //       });
    //       if (cardIsIncluded) returnList.push(card);
    //     });
    //     observer.next(returnList);
    //     observer.complete();
    //   });
    // });
  }
}
