import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifyDate'
})
export class BeautifyDatePipe implements PipeTransform {

  transform(
    date: any, // Date or string that can be converted to Date
    args?: any
  ): any {

    if (typeof date === 'undefined' || date === null) return 'Loading...';
    if (typeof date === 'string') date = new Date(date);

    const DateDiff = {
      isInThePast: (today, dateToCheck) => dateToCheck < today,
      isSameDay: (d1, d2) => (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      ),
      inMinutes: (d1, d2) => Number((d2.getTime() - d1.getTime()) / (60 * 1000)),
      inHours: (d1, d2) => Number((d2.getTime() - d1.getTime()) / (3600 * 1000)),
      inDays: (d1, d2) => Number((d2.getTime() - d1.getTime()) / (24 * 3600 * 1000)),
      inWeeks: (d1, d2) => Number((d2.getTime() - d1.getTime()) / (24 * 3600 * 1000 * 7)),
      inMonths: (d1, d2) => (d2.getMonth() + 12 * d2.getFullYear()) - (d1.getMonth() + 12 * d1.getFullYear()),
      inYears: (d1, d2) => d2.getFullYear() - d1.getFullYear()
    };

    const monthNames = [
      'januari', 'februari', 'maart',
      'april', 'mei', 'juni', 'juli',
      'augustus', 'september', 'oktober',
      'november', 'december'
    ];
    const now = new Date();

    if (!DateDiff.isInThePast(now, date)) {
      return date.getDate() + ' ' + monthNames[date.getMonth()] + (date.getFullYear() > now.getFullYear() ? ' ' + date.getFullYear() : '');
    }

    let dateStringPrefix;
    if (DateDiff.isSameDay(date, now)) dateStringPrefix = 'vandaag';
    else if (DateDiff.isSameDay(date, new Date(now.getDate() - 1))) dateStringPrefix = 'gisteren';

    let dateStringPostFix;
    if (DateDiff.inMinutes(date, now) < 30 && DateDiff.isSameDay(date, now)) {
      dateStringPostFix = 'een paar minuten geleden';
    } else if (DateDiff.inMinutes(date, now) < 60 && DateDiff.isSameDay(date, now)) {
      dateStringPostFix = 'minder dan een uur geleden';
    } else {
      let amount = -1;
      let unit = 'unknown';
      if (Math.floor(DateDiff.inHours(date, now)) >= 1 && Math.floor(DateDiff.inHours(date, now)) <= 24) {
        amount = Math.floor(DateDiff.inHours(date, now));
        unit = 'uur';
      } else if (Math.floor(DateDiff.inDays(date, now)) >= 1 && !Math.floor(DateDiff.inWeeks(date, now))) {
        amount = Math.floor(DateDiff.inDays(date, now));
        unit = 'dag';
      }  else if (Math.floor(DateDiff.inWeeks(date, now)) >= 1 && !Math.floor(DateDiff.inMonths(date, now))) {
        amount = Math.floor(DateDiff.inWeeks(date, now));
        unit = 'week';
      } else if (Math.floor(DateDiff.inMonths(date, now)) >= 1 && !Math.floor(DateDiff.inYears(date, now))) {
        amount = Math.floor(DateDiff.inMonths(date, now));
        unit = 'maand';
      } else if (Math.floor(DateDiff.inYears(date, now)) >= 1) {
        amount = Math.floor(DateDiff.inYears(date, now));
        unit = 'jaar';
      }

      if (amount > 1) {
        if (unit === 'uur') unit = 'uren';
        if (unit === 'dag') unit = 'dagen';
        if (unit === 'week') unit = 'weken';
        if (unit === 'maand') unit = 'maanden';
        if (unit === 'jaar') unit = 'jaren';
      }
      dateStringPostFix = amount + ' ' + unit + ' geleden';
    }

    let dateString = '';
    dateString += (dateStringPrefix ? dateStringPrefix + ', ' : '');
    dateString += dateStringPostFix;
    dateString += ' (';
    dateString += date.getDate() + ' ' + monthNames[date.getMonth()];
    dateString += (date.getFullYear() > now.getFullYear() ? ' ' + date.getFullYear() : '');
    dateString += ')';

    return dateString;
  }

}
