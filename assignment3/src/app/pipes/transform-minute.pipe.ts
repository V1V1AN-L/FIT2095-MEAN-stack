import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformMinute'
})
export class TransformMinutePipe implements PipeTransform {

  transform(minutes: number, ...args: unknown[]): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours + ' hour(s) ' + remainingMinutes + ' minutes';
  }

}
