import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  offeredMeetings = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getOfferedMeetings().subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        this.offeredMeetings = data.data.model;
      }
    });
  }
}
