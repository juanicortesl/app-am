import { ApiService } from './../../../../core/services/api.service';
import { Component, OnInit } from '@angular/core';

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
  pastMeetings = [
    {
      name: 'Roberto',
      date: new Date('02/02/2021 13:00'),
      review: 5,
    },
    {
      name: 'Catalina',
      date: new Date('02/02/2021 16:00'),
      review: 3,
    },
  ];
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
    this.apiService.getRequestedMeetings().subscribe((data: any) => {
      console.log(data);
      this.nextMeetings = data.meetings;
      // this.nextMeetings.forEach((meeting) => {
      //   meeting.other = meeting.offerer ? meeting.Offerer : meeting.Searcher;
      // });
    });
    this.apiService.getOfferedMeetings().subscribe((data: any) => {
      console.log(data);
      this.offeredMeetings = data.meetings;
    });
  }
}
