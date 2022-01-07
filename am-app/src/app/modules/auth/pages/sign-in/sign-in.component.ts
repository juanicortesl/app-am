import { ApiService } from './../../../../core/services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {}

  signIn() {
    if (this.signInForm.value.email && this.signInForm.value.password) {
      this.apiService
        .signIn({
          email: this.signInForm.value.email,
          password: this.signInForm.value.password,
        })
        .subscribe((data: any) => {
          localStorage.setItem('userType', data.userType);
          localStorage.setItem('token', data.token);
          this.router.navigate(['dashboard/home']);
        });
      // if (this.signInForm.value.email.toLowerCase() === 'ofrezco@gmail.com') {
      //   localStorage.setItem('userType', 'offerer');
      //   this.router.navigate(['dashboard/home']);
      // }
      // if (this.signInForm.value.email.toLowerCase() === 'busco@gmail.com') {
      //   localStorage.setItem('userType', 'searcher');
      //   this.router.navigate(['dashboard/home']);
      // }
    }
  }
}
