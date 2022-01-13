import { ApiService } from '../../../../core/services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  loading = false;
  newInterest = '';
  errorPopup = 'none';
  errorTitle = '';
  errorMessage = '';
  interests = [
    {
      name: 'lectura',
      selected: false,
    },
    {
      name: 'actualidad',
      selected: false,
    },
    {
      name: 'deportes',
      selected: false,
    },
    {
      name: 'hobbies',
      selected: false,
    },
  ];
  public profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {}
  nextStep(options: any = {}) {
    if (this.step == 1) {
      this.loading = true;
      let body = {
        first_name: this.profileForm.get('firstName')!.value,
        last_name: this.profileForm.get('lastName')!.value,
        address: this.profileForm.get('address')!.value,
        email: this.profileForm.get('email')!.value,
        password: this.profileForm.get('password')!.value,
        birth_date: this.profileForm.get('birthDate')!.value,
        gender: this.profileForm.get('sex')!.value,
      };
      this.apiService.createUser(body).subscribe({
        next: (data: any) => {
          this.loading = false;
          console.log(data);
          if (data) {
            localStorage.setItem('token', data.token);
            this.step++;
          }
        },
        error: (error: any) => {
          this.loading = false;
          this.openErrorPopup(
            'Error creando la cuenta',
            'Verifica que los campos estén correctos'
          );
          console.log('ERROR', error);
        },
      });
      // } else if (this.step == 2) {
      //   this.apiService
      //     .setUserType({ type: options.type })
      //     .subscribe((data: any) => {
      //       console.log(data);
      //       localStorage.setItem('userType', options.type);
      //       if (options.type === 'searcher') {
      //         this.step = 1;
      //         this.router.navigate(['dashboard/home']);
      //       } else {
      //         this.step++;
      //       }
      //     });
    } else if (this.step == 2) {
      this.loading = true;
      let selectedInterests = this.interests.filter(
        (interest) => interest.selected
      );
      let interests = selectedInterests.map((interest) => interest.name);
      this.apiService.setInterests({ interests: interests }).subscribe({
        next: (data: any) => {
          this.loading = false;
          console.log(data);
          this.router.navigate(['dashboard/home']);
          this.step = 0;
        },
        error: (error: any) => {
          this.loading = false;
          this.openErrorPopup(
            'Error agregando los intereses',
            'Inténtalo nuevamente'
          );
          console.log('ERROR', error);
        },
      });
    }
    // else if (this.step < 4) {
    //   this.step++;
    // }
    // if (this.step == 4) {
    //   this.step = 1;
    //   this.router.navigate(['dashboard/home']);
    // }
  }
  addInterest() {
    this.interests.push({ name: this.newInterest, selected: false });
    this.newInterest = '';
  }
  changeInterest(e: any) {
    this.newInterest = e.target.value;
  }
  // addTime() {
  //   if (this.newDate && this.newTime) {
  //     console.log(this.newDate + this.newTime);
  //     let date = new Date(this.newDate);
  //     date.setHours(this.newTime.split(':')[0]);
  //     date.setMinutes(this.newTime.split(':')[1]);
  //     this.apiService
  //       .addAvailableMeeting({ date: date })
  //       .subscribe((data: any) => {
  //         console.log(data);
  //         this.timeList.push(date);
  //       });
  //   }
  // }
  openErrorPopup(errorTitle: string = '', errorMessage: string = '') {
    this.errorTitle = errorTitle;
    this.errorMessage = errorMessage;
    this.errorPopup = 'block';
  }
  closeErrorPopup() {
    this.errorPopup = 'none';
  }
}
