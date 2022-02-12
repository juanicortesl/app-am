import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  page = 'home';
  public innerWidth: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('profile')) this.page = 'profile';
    else if (this.router.url.includes('home')) this.page = 'home';
    else if (this.router.url.includes('meetings')) this.page = 'meetings';
    this.innerWidth = window.innerWidth;
  }

  isSelected(tab: string) {
    return tab === this.page;
  }
  goTo(tab: string) {
    this.page = tab;
    this.router.navigate([`dashboard/${tab}`]);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
}
