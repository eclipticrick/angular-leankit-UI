import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(list: any[], value: string): any {
    return list.filter(x => x.indexOf(value) !== -1);
  }
}
