import { ApiService } from './../../../../core/services/api.service';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {}
  nextStep(options: any = {}) {
    if (this.step == 1) {
      let body = {
        first_name: this.profileForm.get('firstName')!.value,
        last_name: this.profileForm.get('lastName')!.value,
        address: this.profileForm.get('address')!.value,
        email: this.profileForm.get('email')!.value,
        password: this.profileForm.get('password')!.value,
        birth_date: this.profileForm.get('birthDate')!.value,
        gender: this.profileForm.get('sex')!.value,
      };
      this.apiService.createUser(body).subscribe((data: any) => {
        console.log(data);
        if (data) {
          localStorage.setItem('token', data.token);
          this.step++;
        }
      });
    } else if (this.step == 2) {
      this.apiService
        .setUserType({ type: options.type })
        .subscribe((data: any) => {
          console.log(data);
          this.step++;
        });
    } else if (this.step < 4) {
      this.step++;
    }
    if (this.step == 4) {
      this.router.navigate(['dashboard/home']);
    }
  }
  addInterest() {
    this.interests.push({ name: this.newInterest, selected: false });
    this.newInterest = '';
  }
  changeInterest(e: any) {
    this.newInterest = e.target.value;
  }
  addTime() {
    if (this.newDate && this.newTime) {
      console.log(this.newDate + this.newTime);
      this.timeList.push(new Date(this.newDate + ' ' + this.newTime));
    }
  }
}
