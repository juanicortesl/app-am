import { Router } from '@angular/router';
import { ApiService } from './../../http/api.service';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { interval, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.scss'],
})
export class MeetingCardComponent implements OnInit {
  public widthThreshold = environment.widthThreshold;
  public innerWidth: any;
  public remainingTime: any = {};
  loading = false;
  @Input() type = '';
  @Input() meeting: any;
  @Input() addedToCalendar: boolean = false;
  @Input() isOwner: boolean = false;
  @Input() disableActions: boolean = false;
  @Output() changedMeeting = new EventEmitter<boolean>();
  seeMore = false;
  pictureColor = 0;
  pictureFont = 0;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.meeting.startTime = new Date(this.meeting.startTime);
    this.pictureColor =
      (this.meeting.startTime.getDate() + this.meeting.description.length) % 3;
    this.pictureFont = this.meeting.description?.length % 3;
    console.log(this.pictureColor, this.pictureFont);
    this.start().subscribe((_) => {});
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  updateTime() {
    const now = new Date();
    const diff = this.meeting.startTime.getTime() - now.getTime();

    // Cálculos para sacar lo que resta hasta ese tiempo objetivo / final
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor(diff / 1000);

    // La diferencia que se asignará para mostrarlo en la pantalla
    this.remainingTime.days = days;
    this.remainingTime.hours = hours - days * 24;
    this.remainingTime.minutes = mins - hours * 60;
    this.remainingTime.seconds = secs - mins * 60;
  }

  start() {
    return interval(1000).pipe(
      map((x: number) => {
        this.updateTime();
        return x;
      })
    );
  }

  addToCalendar() {
    if (!this.disableActions) {
      this.loading = true;
      this.apiService
        .addMeetingToCalendar(this.meeting.id)
        .subscribe((data) => {
          console.log(data);
          this.changedMeeting.emit(true);
          this.loading = false;
        });
    }
  }
  removeFromCalendar() {
    this.loading = true;
    this.apiService
      .removeMeetingFromCalendar(this.meeting.id)
      .subscribe((data) => {
        console.log(data);
        this.changedMeeting.emit(true);
        this.loading = false;
      });
  }
  cancelMeeting() {
    this.loading = true;
    this.apiService.cancelMeeting(this.meeting.id).subscribe((data) => {
      console.log(data);
      this.changedMeeting.emit(true);
      this.loading = false;
    });
  }
  goToMeeting() {
    this.router.navigate(['dashboard/meeting'], {
      state: {
        meeting: this.meeting,
      },
    });
  }
}
