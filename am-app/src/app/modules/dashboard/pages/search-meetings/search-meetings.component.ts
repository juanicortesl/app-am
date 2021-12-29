import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-meetings',
  templateUrl: './search-meetings.component.html',
  styleUrls: ['./search-meetings.component.scss'],
})
export class SearchMeetingsComponent implements OnInit {
  availableMeetings = [
    {
      name: 'Roberto',
      interests: ['Idiomas', 'marketing', 'redes sociales', 'cocina'],
      date: new Date('02/12/2021 14:00'),
    },
    {
      name: 'Roberto',
      interests: ['Idiomas', 'marketing', 'redes sociales'],
      date: new Date('02/12/2021 14:00'),
    },
    {
      name: 'Roberto',
      interests: ['Idiomas', 'marketing', 'redes sociales'],
      date: new Date('02/12/2021 14:00'),
    },
    {
      name: 'Roberto',
      interests: ['Idiomas', 'marketing', 'redes sociales'],
      date: new Date('02/12/2021 14:00'),
    },

    {
      name: 'Roberto',
      interests: ['Idiomas', 'marketing', 'redes sociales'],
      date: new Date('02/12/2021 14:00'),
    },
    {
      name: 'Roberto',
      interests: ['Idiomas', 'marketing', 'redes sociales'],
      date: new Date('02/12/2021 14:00'),
    },
    {
      name: 'Roberto',
      interests: ['Idiomas', 'marketing', 'redes sociales'],
      date: new Date('02/12/2021 14:00'),
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
