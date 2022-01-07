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
    this.apiService.getRequestedMeetings().subscribe((data: any) => {
      console.log(data);
      this.nextMeetings = data.meetings;
      this.nextMeetings.forEach((meeting) => {
        meeting.other = this.searcherUser ? meeting.Offerer : meeting.Searcher;
      });
    });
  }
}
