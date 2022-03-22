import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  selectedType = 'future';
  offeredMeetings: any[] = [];
  meetingsByDate: any = {};
  pastMeetingsByDate: any = {};
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

  get pastDates() {
    let dates = Object.keys(this.pastMeetingsByDate);
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
      console.log(data, 'WILLATTEND');
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
          this.pushToMeetingsByDate(meeting, false, true, false);
        });
      }
    });
    this.apiService.getPastMeetings().subscribe((data: any) => {
      console.log(data, 'past');
      if (data.result) {
        data.data.model.forEach((meeting: any) => {
          this.pushToPastMeetingsByDate(meeting);
        });
        console.log(this.pastMeetingsByDate, 'PASTBYDATE');
      }
    });
  }

  pushToMeetingsByDate(
    meeting: any,
    isOwner: boolean,
    isInvitation: boolean = false,
    addedToCalendar: boolean = true
  ) {
    meeting.isOwner = isOwner;
    meeting.isInvitation = isInvitation;
    meeting.addedToCalendar = addedToCalendar;
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

  pushToPastMeetingsByDate(meeting: any) {
    let date = new Date(meeting.startTime);
    if (
      !this.pastMeetingsByDate[
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      ]
    ) {
      this.pastMeetingsByDate[
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      ] = [meeting];
    } else {
      this.pastMeetingsByDate[
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      ].push(meeting);
    }
  }
}
