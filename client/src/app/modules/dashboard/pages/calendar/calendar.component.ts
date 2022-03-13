import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  offeredMeetings: any[] = [];
  meetingsByDate: any = {};
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMeetings();
  }

  get dates() {
    let dates = Object.keys(this.meetingsByDate);
    dates = dates.sort((a: any, b: any) => {
      let aDate = new Date(a);
      let bDate = new Date(b);
      return aDate.getTime() - bDate.getTime();
    });
    return dates;
  }

  getMeetings() {
    this.meetingsByDate = {};
    this.apiService.getOfferedMeetings().subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        data.data.model.forEach((meeting: any) => {
          this.pushToMeetingsByDate(meeting, true);
        });
      }
    });
    this.apiService.getWillAttendMeetings({}).subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        data.data.model.forEach((meeting: any) => {
          this.pushToMeetingsByDate(meeting, false);
        });
      }
    });
    this.apiService.getMeetingInvitations().subscribe((data: any) => {
      console.log(data, 'invitations');
      if (data.result) {
        data.data.model.forEach((meeting: any) => {
          this.pushToMeetingsByDate(meeting, false, true);
        });
      }
    });
  }

  pushToMeetingsByDate(
    meeting: any,
    isOwner: boolean,
    isInvitation: boolean = false
  ) {
    meeting.isOwner = isOwner;
    meeting.isInvitation = isInvitation;
    let date = new Date(meeting.startTime);
    if (
      !this.meetingsByDate[
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      ]
    ) {
      this.meetingsByDate[
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      ] = [meeting];
    } else {
      this.meetingsByDate[
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      ].push(meeting);
    }
  }
}
