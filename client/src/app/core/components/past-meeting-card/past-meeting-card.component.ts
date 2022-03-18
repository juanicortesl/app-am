import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-past-meeting-card',
  templateUrl: './past-meeting-card.component.html',
  styleUrls: ['./past-meeting-card.component.scss'],
})
export class PastMeetingCardComponent implements OnInit {
  @Input() meeting: any;
  pictureColor = 0;
  pictureFont = 0;
  constructor() {}

  ngOnInit(): void {
    this.meeting.startTime = new Date(this.meeting.startTime);
    this.pictureColor =
      (this.meeting.startTime.getDate() + this.meeting.description.length) % 3;
    this.pictureFont = this.meeting.description?.length % 3;
  }
}
