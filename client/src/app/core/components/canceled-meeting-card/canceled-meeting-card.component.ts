import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-canceled-meeting-card',
  templateUrl: './canceled-meeting-card.component.html',
  styleUrls: ['./canceled-meeting-card.component.scss'],
})
export class CanceledMeetingCardComponent implements OnInit {
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
