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
      let meetingString = `${meeting.theme} ${meeting.name} ${
        meeting.description
      } ${new Date(meeting.startTime).toLocaleDateString()} ${
        meeting.Host.first_name
      }`;

      let isSearchInputOk = options.searchInput
        ? meetingString
            .toLowerCase()
            .includes(options.searchInput.toLowerCase())
        : true;
      return isThemeFilterOK && isSearchInputOk;
    });
  }
}
