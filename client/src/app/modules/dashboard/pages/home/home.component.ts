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
  loadingTodayMeetings = false;
  loadingSuggestedMeeting = true;
  todayMeetings: any[] = [];
  readyHostMeeting: any;
  readyAttendeeMeeting: any;
  suggestedMeetings: any[] = [];
  meetingInvitations: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.loadingTodayMeetings = true;

    this.getSuggestedMeetings();
    this.getMeetingInvitations();
    this.getTodayMeetings();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  goToSearcher(theme: any) {
    this.router.navigate(['dashboard/searcher'], { state: { theme: theme } });
  }

  getTodayMeetings() {
    this.todayMeetings = [];
    let now = new Date();
    this.apiService.getOfferedMeetings().subscribe(
      (data: any) => {
        this.loadingTodayMeetings = false;
        if (data.result) {
          data.data.model.forEach((meeting: any) => {
            let meetingDate = new Date(meeting.startTime);
            meeting.isHost = true;
            if (
              meetingDate.getDate() === now.getDate() &&
              meetingDate.getMonth() === now.getMonth()
            )
              this.todayMeetings.push(meeting);
          });
        }
      },
      (err) => {
        console.log(err), (this.loadingTodayMeetings = false);
      }
    );

    this.apiService.getWillAttendMeetings({}).subscribe(
      (data: any) => {
        this.loadingTodayMeetings = false;
        if (data.result) {
          data.data.model.forEach((meeting: any) => {
            let meetingDate = new Date(meeting.startTime);
            if (
              meetingDate.getDate() === now.getDate() &&
              meetingDate.getMonth() === now.getMonth()
            )
              this.todayMeetings.push(meeting);
          });
        }
      },
      (err) => {
        console.log(err), (this.loadingTodayMeetings = false);
      }
    );
  }

  getSuggestedMeetings() {
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
  getMeetingInvitations() {
    this.apiService.getMeetingInvitations().subscribe((data: any) => {
      console.log(data, 'invitations');
      if (data.result) {
        this.meetingInvitations = data.data.model;
      }
    });
  }
  removeAlert(index: number) {
    this.meetingInvitations.splice(index, 1);
  }
}
