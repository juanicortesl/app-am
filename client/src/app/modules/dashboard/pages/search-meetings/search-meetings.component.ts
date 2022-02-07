import { ApiService } from '../../../../core/http/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-meetings',
  templateUrl: './search-meetings.component.html',
  styleUrls: ['./search-meetings.component.scss'],
})
export class SearchMeetingsComponent implements OnInit {
  availableMeetings: any[] = [];
  filteredMeetings: any[] = [];
  displayStyle = 'none';
  displayStyleFilter = 'none';
  selectedMeeting: any = this.availableMeetings[0];
  acceptedMeeting = false;
  filterStartDate: any = {};
  filterEndDate: any = {};
  startTimeFilter = { hour: 13, minute: 0 };
  endTimeFilter = { hour: 14, minute: 0 };
  loadingRequest = false;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAvailableMeetings();
  }
  openPopup(meeting: {}) {
    this.selectedMeeting = meeting;
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  acceptMeeting() {
    this.loadingRequest = true;
    this.apiService.requestMeeting(this.selectedMeeting.id).subscribe({
      next: (data) => {
        console.log(data);
        this.loadingRequest = false;
        this.getAvailableMeetings();
        this.displayStyle = 'none';
        this.acceptedMeeting = true;
      },
      error: (error) => {
        console.log(error);
        this.loadingRequest = false;
        this.displayStyle = 'none';
      },
    });
  }
  continue() {
    this.acceptedMeeting = false;
  }
  openFilters() {
    this.displayStyleFilter = 'block';
  }
  applyFilters() {
    let filterStartDate = new Date(
      this.filterStartDate.year,
      this.filterStartDate.month - 1,
      this.filterStartDate.day
    );
    let filterEndDate = new Date(
      this.filterEndDate.year,
      this.filterEndDate.month - 1,
      this.filterEndDate.day
    );
    this.filteredMeetings = this.availableMeetings.filter((meeting) => {
      let meetingDate = new Date(meeting.date);
      console.log(meetingDate);
      let isStartDateOk = this.filterStartDate.day
        ? filterStartDate.getTime() <= meetingDate.getTime()
        : true;

      let isEndDateOk = this.filterEndDate.day
        ? filterEndDate.getTime() >= meetingDate.getTime()
        : true;

      let isStartHourOk =
        this.startTimeFilter.hour <= meetingDate.getHours() ? true : false;

      let isEndHourOk =
        this.endTimeFilter.hour >= meetingDate.getHours() ? true : false;
      return isStartDateOk && isEndDateOk && isStartHourOk && isEndHourOk;
    });
    this.displayStyleFilter = 'none';
  }
  getAvailableMeetings() {
    this.apiService.getAvailableMeetings({}).subscribe((data: any) => {
      if (data.result) {
        this.availableMeetings = data.data.model;
      }
      this.availableMeetings.forEach((meeting) => {
        let date = new Date(meeting.date);
        date.setMinutes(date.getMinutes() + 45);
        meeting.endTime = date;
      });
      this.filteredMeetings = this.availableMeetings;
    });
  }
}
