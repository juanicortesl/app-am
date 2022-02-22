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
    this.apiService.getOfferedMeetings().subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        this.offeredMeetings.push(...data.data.model);
        data.data.model.forEach((meeting: any) => {
          let date = new Date(meeting.startTime);
          if (
            !this.meetingsByDate[
              `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
            ]
          ) {
            this.meetingsByDate[
              `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
            ] = [meeting];
          } else {
            this.meetingsByDate[
              `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
            ].push(meeting);
          }
        });
        console.log(this.meetingsByDate);
      }
    });
    this.apiService.getAvailableMeetings({}).subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        data.data.model.forEach((meeting: any) => {
          let date = new Date(meeting.startTime);
          if (
            !this.meetingsByDate[
              `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
            ]
          ) {
            this.meetingsByDate[
              `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
            ] = [meeting];
          } else {
            this.meetingsByDate[
              `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
            ].push(meeting);
          }
        });
      }
    });
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
}
