import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinArray'
})
export class JoinArrayPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) { return value; }
    if (value) {
      return value.join(', ');
    }
  }
}