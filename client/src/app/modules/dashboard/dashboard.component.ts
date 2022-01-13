import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  page = 'home';
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('profile')) this.page = 'profile';
    else if (this.router.url.includes('home')) this.page = 'home';
    else if (this.router.url.includes('meetings')) this.page = 'meetings';
  }

  isSelected(tab: string) {
    return tab === this.page;
  }
  goTo(tab: string) {
    this.page = tab;
    this.router.navigate([`dashboard/${tab}`]);
  }
}
