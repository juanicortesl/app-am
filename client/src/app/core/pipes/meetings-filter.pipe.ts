import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meetingsFilter',
})
export class MeetingsFilterPipe implements PipeTransform {
  transform(meetings: any[], options: any) {
    return meetings.filter((meeting) => {
      let isThemeFilterOK = options.theme
        ? meeting.theme === options.theme
        : true;
      return isThemeFilterOK;
    });
  }
}
