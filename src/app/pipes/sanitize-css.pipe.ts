import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeCss'
})
export class SanitizeCssPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, args?: any): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }

}
