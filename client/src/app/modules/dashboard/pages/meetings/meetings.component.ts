import { ApiService } from '../../../../core/http/api.service';
import { Component, OnInit } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnInit {
  public searcherUser: boolean = false;
  nextMeetings: any[] = [];
  offeredMeetings: any[] = [];
  displayNewMeeting = 'none';
  newMeetingDate: any = {};
  newMeetingTime = { hour: 12, minute: 0 };
  pastMeetings: any[] = [];
  public today: Date = new Date();
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.searcherUser = localStorage.getItem('userType') === 'searcher';
    this.loadMeetings();
  }
  openNewMeeting() {
    this.displayNewMeeting = 'block';
    console.log(this.newMeetingDate.day);
  }
  createNewMeeting() {
    try {
      let newDate = new Date(
        this.newMeetingDate.year,
        this.newMeetingDate.month - 1,
        this.newMeetingDate.day,
        this.newMeetingTime.hour,
        this.newMeetingTime.minute
      );
      this.apiService.addAvailableMeeting({ date: newDate }).subscribe({
        next: (data: any) => {
          console.log(data);
          this.closeNewMeeting();
          this.loadMeetings();
        },
        error: (error: any) => {
          this.closeNewMeeting();
          console.log(error);
        },
      });
    } catch {}
    console.log(this.newMeetingDate);
  }
  closeNewMeeting() {
    this.displayNewMeeting = 'none';
  }
  loadMeetings() {
    this.apiService.getNextMeetings().subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        this.nextMeetings = data.data.model;
      }
      // this.nextMeetings.forEach((meeting) => {
      //   meeting.other = meeting.offerer ? meeting.Offerer : meeting.Searcher;
      // });
    });
    this.apiService.getOfferedMeetings().subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        this.offeredMeetings = data.data.model;
      }
    });
    this.apiService.getPastMeetings().subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        this.pastMeetings = data.data.model;
      }
    });
  }
}
