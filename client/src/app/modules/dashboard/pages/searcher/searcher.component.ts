import { MeetingsFilterPipe } from './../../../../core/pipes/meetings-filter.pipe';
import { ApiService } from './../../../../core/http/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent implements OnInit {
  currentTheme: any | undefined;
  meetingsData: any[] = [];
  filteredMeetingsData: any[] = [];
  meetingsByDate: any = {};
  filter: any = {};
  loading = false;
  searchInput = '';
  selectedType = 'activities';
  usersData: any[] = [];
  loadingUsers = false;
  userFilterOptions = { searchInput: 'erte' };
  constructor(
    private router: Router,
    private apiService: ApiService,
    private meetingsFilterPipe: MeetingsFilterPipe
  ) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    this.currentTheme = state ? state['theme'] : undefined;
    if (this.currentTheme)
      this.filter.theme = this.currentTheme.value
        ? this.currentTheme.value
        : undefined;

    console.log(this.currentTheme, 'CURRENT');
  }

  ngOnInit(): void {
    this.getMeetings();
    this.getUsers();
  }

  getUsers() {
    this.loadingUsers = true;
    this.apiService.getUsers().subscribe((data: any) => {
      this.loadingUsers = false;
      if (data.result) {
        this.usersData = data.data.model;
      }
    });
  }

  getMeetings() {
    this.loading = true;
    this.meetingsByDate = {};
    this.meetingsData = [];
    this.apiService.getAvailableMeetings({}).subscribe((data: any) => {
      this.loading = false;
      if (data.result) {
        console.log(data.data.model);
        this.meetingsData = data.data.model;
        data.data.model.forEach((meeting: any) => {
          this.pushToMeetingsByDate(meeting, false);
        });
      }
    });
  }
  pushToMeetingsByDate(meeting: any, isOwner: boolean) {
    meeting.isOwner = isOwner;
    let date = new Date(meeting.startTime);
    if (
      !this.meetingsByDate[
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      ]
    ) {
      this.meetingsByDate[
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      ] = { meetings: [meeting], filteredMeetings: [] };
    } else {
      this.meetingsByDate[
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      ].meetings.push(meeting);
    }
  }
  get dates() {
    this.filter.searchInput = this.searchInput;
    let dates = Object.keys(this.meetingsByDate);
    dates = dates.sort((a: any, b: any) => {
      let aDate = new Date(a);
      let bDate = new Date(b);
      return aDate.getTime() - bDate.getTime();
    });
    dates.forEach((date) => {
      this.meetingsByDate[date].filteredMeetings =
        this.meetingsFilterPipe.transform(
          this.meetingsByDate[date].meetings,
          this.filter
        );
    });
    this.filteredMeetingsData = this.meetingsFilterPipe.transform(
      this.meetingsData,
      this.filter
    );
    return dates;
  }
}
