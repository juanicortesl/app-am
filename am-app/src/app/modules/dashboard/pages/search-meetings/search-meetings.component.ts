import { ApiService } from './../../../../core/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-meetings',
  templateUrl: './search-meetings.component.html',
  styleUrls: ['./search-meetings.component.scss'],
})
export class SearchMeetingsComponent implements OnInit {
  availableMeetings: any[] = [];
  displayStyle = 'none';
  displayStyleFilter = 'none';
  selectedMeeting: any = this.availableMeetings[0];
  acceptedMeeting = false;
  filterStartDate = '';
  startTimeFilter = { hour: 13, minute: 0 };
  endTimeFilter = { hour: 14, minute: 0 };
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAvailableMeetings({}).subscribe((data: any) => {
      this.availableMeetings = data.meetings;
      this.availableMeetings.forEach((meeting) => {
        let date = new Date(meeting.date);
        date.setMinutes(date.getMinutes() + 45);
        meeting.endTime = date;
      });
      console.log(data);
    });
  }
  openPopup(meeting: {}) {
    this.selectedMeeting = meeting;
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  acceptMeeting() {
    this.apiService
      .requestMeeting({ meetingId: this.selectedMeeting.id })
      .subscribe((data) => {
        console.log(data);
        this.displayStyle = 'none';
        this.acceptedMeeting = true;
      });
  }
  continue() {
    this.acceptedMeeting = false;
  }
  openFilters() {
    this.displayStyleFilter = 'block';
  }
  applyFilters() {
    this.displayStyleFilter = 'none';
  }
}
