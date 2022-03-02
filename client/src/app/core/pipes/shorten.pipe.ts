import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(val: string, length?: any, shortenLength?: any): string {
    return val.length > length ? val.slice(0, shortenLength) + '...' : val;
  }
}
