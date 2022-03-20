import { ApiService } from 'src/app/core/http/api.service';
import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  page = 'home';
  public innerWidth: any;
  popupDisplayStyle = 'none';
  public suggestionForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.router.url.includes('profile')) this.page = 'profile';
    else if (this.router.url.includes('home')) this.page = 'home';
    else if (this.router.url.includes('meetings')) this.page = 'meetings';
    else if (this.router.url.includes('calendar')) this.page = 'calendar';
    this.innerWidth = window.innerWidth;
  }

  isSelected(tab: string) {
    return this.router.url.includes(tab);
  }
  goTo(tab: string) {
    this.page = tab;
    this.router.navigate([`dashboard/${tab}`]);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  closePopup() {
    this.popupDisplayStyle = 'none';
  }
  get suggestionText() {
    return this.suggestionForm.get('text')?.value;
  }
  sendSuggestion() {
    this.closePopup();
    this.apiService
      .addSuggestion({ text: this.suggestionText })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
