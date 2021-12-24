import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  newDate: any;
  newTime: any;
  timeList: any[] = [];
  step = 1;
  newInterest = '';
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
  public profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    birthDate: new FormControl(''),
    sex: new FormControl(''),
  });
  constructor() {}
  ngOnInit(): void {}
  nextStep() {
    this.step++;
  }
  addInterest() {
    this.interests.push({ name: this.newInterest, selected: false });
    this.newInterest = '';
  }
  changeInterest(e: any) {
    this.newInterest = e.target.value;
  }
  addTime() {
    console.log(typeof this.newDate);
    console.log(typeof this.newTime);
    if (this.newDate && this.newTime) {
      console.log(this.newDate + this.newTime);
      this.timeList.push(new Date(this.newDate + ' ' + this.newTime));
    }
  }
}
