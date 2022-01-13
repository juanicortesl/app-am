import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  interests = [
    {
      name: 'idiomas',
      selected: false,
    },
    {
      name: 'política',
      selected: false,
    },
    {
      name: 'deportes',
      selected: false,
    },
    {
      name: 'cocina',
      selected: false,
    },
    {
      name: 'dibujo',
      selected: false,
    },
    {
      name: 'escritura',
      selected: false,
    },
    {
      name: 'negocios',
      selected: false,
    },
    {
      name: 'baile',
      selected: false,
    },
    {
      name: 'idiomas',
      selected: false,
    },
    {
      name: 'política',
      selected: false,
    },
    {
      name: 'deportes',
      selected: false,
    },
    {
      name: 'cocina',
      selected: false,
    },
    {
      name: 'dibujo',
      selected: false,
    },
    {
      name: 'escritura',
      selected: false,
    },
    {
      name: 'negocios',
      selected: false,
    },
    {
      name: 'baile',
      selected: false,
    },
  ];
  newInterest = '';
  newDate: any;
  newTime: any;
  timeList: any[] = [];
  constructor() {}

  ngOnInit(): void {}
  addInterest() {
    this.interests.push({ name: this.newInterest, selected: false });
    this.newInterest = '';
  }
  changeInterest(e: any) {
    this.newInterest = e.target.value;
  }
  addTime() {
    if (this.newDate && this.newTime) {
      console.log(this.newTime);
      console.log(
        `${this.newDate.month}-${this.newDate.day}-${this.newDate.year} ${this.newTime.hour}:${this.newTime.minutes}`
      );
      this.timeList.push(
        new Date(
          this.newDate.year,
          this.newDate.month - 1,
          this.newDate.day,
          this.newTime.hour,
          this.newTime.minute
        )
      );
    }
  }
}
