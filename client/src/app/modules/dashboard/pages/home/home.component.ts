import { environment } from './../../../../../environments/environment';
import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public widthThreshold = environment.widthThreshold;
  public innerWidth: any;
  themes = [
    { title: 'Cine', icon: 'bi bi-film' },
    { title: 'Literatura', icon: 'bi bi-book' },
    { title: 'Actualidad', icon: 'bi bi-newspaper' },
  ];
  constructor() {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
}
