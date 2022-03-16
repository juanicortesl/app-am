import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: any;
  @Output() changedMeeting = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {
    this.user.hostedMeetings.forEach((meeting: any) => {
      meeting.Host = this.user;
    });
  }
}
