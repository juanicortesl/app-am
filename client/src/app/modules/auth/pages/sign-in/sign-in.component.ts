import { AuthService } from './../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loading = false;
  signInError = false;
  public signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard/home']);
    }
  }

  signIn() {
    if (this.signInForm.value.email && this.signInForm.value.password) {
      this.loading = true;
      this.signInError = false;
      this.authService
        .signIn({
          email: this.signInForm.value.email,
          password: this.signInForm.value.password,
        })
        .subscribe((data: any) => {
          console.log(data);
          if (data.result) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userId', data.data.user.id);
            this.router.navigate(['dashboard/home']);
          } else {
            this.signInError = true;
          }
          this.loading = false;
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
  changePassword(event: any) {
    console.log(event);
    this.signInForm.controls['password'].setValue(event);
  }
}
