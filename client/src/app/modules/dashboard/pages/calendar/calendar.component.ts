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
    const now = new Date();
    this.meetingsByDate = {};
    this.apiService.getOfferedMeetings().subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        data.data.model.forEach((meeting: any) => {
          let isToday = false;
          let meetingDate = new Date(meeting.startTime);
          if (
            meetingDate.getDate() === now.getDate() &&
            meetingDate.getMonth() === now.getMonth()
          ) {
            isToday = true;
          }
          this.pushToMeetingsByDate(meeting, true, false, true, false, isToday);
        });
      }
    });
    this.apiService.getWillAttendMeetings({}).subscribe((data: any) => {
      console.log(data, 'WILLATTEND');
      if (data.result) {
        data.data.model.forEach((meeting: any) => {
          let isToday = false;
          let meetingDate = new Date(meeting.startTime);
          if (
            meetingDate.getDate() === now.getDate() &&
            meetingDate.getMonth() === now.getMonth()
          ) {
            isToday = true;
          }
          this.pushToMeetingsByDate(
            meeting,
            false,
            false,
            true,
            false,
            isToday
          );
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
    this.apiService.getCanceledMeetings().subscribe((data: any) => {
      console.log(data, 'canceled');
      if (data.result) {
        data.data.model.forEach((meeting: any) => {
          this.pushToMeetingsByDate(meeting, false, true, false, true);
        });
      }
    });
  }

  pushToMeetingsByDate(
    meeting: any,
    isOwner: boolean,
    isInvitation: boolean = false,
    addedToCalendar: boolean = true,
    canceled: boolean = false,
    isToday: boolean = false
  ) {
    meeting.isOwner = isOwner;
    meeting.isInvitation = isInvitation;
    meeting.addedToCalendar = addedToCalendar;
    meeting.canceled = canceled;
    meeting.isToday = isToday;
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
