import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnInit {
  public searcherUser: boolean = false;
  nextMeetings = [
    {
      name: 'Sofia',
      date: new Date('02/02/2021 13:00'),
    },
    {
      name: 'Sofia',
      date: new Date('02/02/2021 16:00'),
    },
  ];

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
  constructor() {}

  ngOnInit(): void {
    this.searcherUser = localStorage.getItem('userType') === 'searcher';
    console.log(this.searcherUser);
  }
}
