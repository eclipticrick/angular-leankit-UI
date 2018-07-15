import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterKey',
  pure: false
})
export class FilterOnKeyPipe implements PipeTransform {
  transform(list: any[], key: string, value: any): any {
    return list.filter(x => x[key] === value);
  }
}
