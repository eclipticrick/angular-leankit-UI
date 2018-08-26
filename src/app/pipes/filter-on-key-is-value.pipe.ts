import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOnKeyIsValue'
})
export class FilterOnKeyIsValuePipe implements PipeTransform {

  transform(listOfObjects: any[], key: string, value: any, args?: any): any {
    return listOfObjects.filter(object => object[key] === value);
  }

}
