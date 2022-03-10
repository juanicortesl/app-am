import { Router } from '@angular/router';
import { ApiService } from './../../../../core/http/api.service';
import { environment } from './../../../../../environments/environment';
import { Component, HostListener, OnInit } from '@angular/core';

const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public widthThreshold = environment.widthThreshold;
  public innerWidth: any;
  themes = [
    {
      title: 'Cine',
      icon: 'bi bi-film',
      value: 'cine',
    },
    {
      title: 'Literatura',
      icon: 'bi bi-book',
      value: 'cine',
    },
    { title: 'Actualidad', icon: 'bi bi-newspaper', value: 'actualidad' },
    { title: 'Otros', icon: 'bi bi-people' },
    { title: 'Todos', icon: 'bi bi-card-checklist' },
  ];
  loadingReadyMeeting = false;
  loadingSuggestedMeeting = true;
  readyHostMeeting: any;
  readyAttendeeMeeting: any;
  toBeMeeting: any;
  suggestedMeetings: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.loadingReadyMeeting = true;
    this.apiService.getOfferedMeetings().subscribe(
      (data: any) => {
        this.loadingReadyMeeting = false;
        if (data.result) {
          let now = new Date();
          this.readyHostMeeting = data.data.model.find((meeting: any) => {
            let meetingDate = new Date(meeting.startTime);
            return (
              Math.abs(meetingDate.getTime() - now.getTime()) <
              HOUR_IN_MILLISECONDS
            );
          });
          if (this.readyHostMeeting) {
            this.readyHostMeeting.isHost = true;
          }
        }
      },
      (err) => {
        console.log(err), (this.loadingReadyMeeting = false);
      }
    );

    this.apiService.getWillAttendMeetings({}).subscribe(
      (data: any) => {
        this.loadingReadyMeeting = false;
        if (data.result) {
          let now = new Date();
          this.readyAttendeeMeeting = data.data.model.find((meeting: any) => {
            let meetingDate = new Date(meeting.startTime);
            return (
              meetingDate.getTime() - now.getTime() < HOUR_IN_MILLISECONDS &&
              now.getTime() < meetingDate.getTime()
            );
          });
          this.readyAttendeeMeeting;
        }
      },
      (err) => {
        console.log(err), (this.loadingReadyMeeting = false);
      }
    );
    this.getSuggestedMeetings();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  goToSearcher(theme: any) {
    this.router.navigate(['dashboard/searcher'], { state: { theme: theme } });
  }

  getSuggestedMeetings() {
    this.toBeMeeting = undefined;
    this.loadingSuggestedMeeting = true;
    this.apiService.getAvailableMeetings({}).subscribe(
      (data: any) => {
        this.loadingSuggestedMeeting = false;
        if (data.result && data.data.model.length > 0) {
          this.suggestedMeetings = data.data.model.slice(0, 3);
        }
      },
      (err) => {
        console.log(err), (this.loadingSuggestedMeeting = false);
      }
    );
  }
}
