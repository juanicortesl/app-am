import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import {
  SwiperComponent,
  SwiperDirective,
  SwiperConfigInterface,
  SwiperPaginationInterface,
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false,
  };
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: this.pagination,
  };
  themes = [
    { title: 'Cine y literatura', icon: 'bi bi-book' },
    { title: 'Actualidad', icon: 'bi bi-newspaper' },
    { title: 'Otros', icon: 'bi bi-people' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
