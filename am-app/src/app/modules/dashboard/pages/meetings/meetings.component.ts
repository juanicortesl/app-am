import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnInit {
  nextMeetings = [
    {
      name: 'Sofia',
      date: new Date('02/02/2021 13:00'),
    },
    {
      name: 'Sofia',
      date: new Date('02/02/2021 13:00'),
    },
    {
      name: 'Sofia',
      date: new Date('02/02/2021 13:00'),
    },
    {
      name: 'Sofia',
      date: new Date('02/02/2021 13:00'),
    },
    {
      name: 'Sofia',
      date: new Date('02/02/2021 13:00'),
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
