import { Router } from '@angular/router';
import { ApiService } from './../../http/api.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  @Input() type = '';
  @Input() meeting: any;
  seeMore = false;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.meeting.startTime = new Date(this.meeting.startTime);
    this.meeting.endTime = new Date(this.meeting.endTime);
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

  requestMeeting() {
    this.apiService.requestMeeting(this.meeting.id).subscribe((data) => {
      console.log(data);
    });
  }
  goToMeeting() {
    this.router.navigate(['dashboard/meeting'], {});
  }
}
