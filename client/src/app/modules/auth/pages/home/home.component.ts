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
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + '</span>';
    },
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
    {
      title: 'actualidad',
      icon: 'bi bi-newspaper',
    },
    {
      title: 'cine',
      icon: 'bi bi-film',
    },
    {
      title: 'literatura',
      icon: 'bi bi-book',
    },
    {
      title: 'otros',
      icon: 'bi bi-three-dots',
      other: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
