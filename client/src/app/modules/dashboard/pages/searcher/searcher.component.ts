import { ApiService } from './../../../../core/http/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent implements OnInit {
  currentTheme: string | undefined;
  meetingsData: any[] = [];
  constructor(private router: Router, private apiService: ApiService) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    this.currentTheme = state ? state['theme'] : undefined;
  }

  ngOnInit(): void {
    this.getMeetings();
  }

  getMeetings() {
    this.apiService.getAvailableMeetings({}).subscribe((data: any) => {
      if (data.result) {
        console.log(data.data.model);
        this.meetingsData = data.data.model;
      }
    });
  }
}
