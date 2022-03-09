import { RegionsService } from './../../../../core/services/regions.service';
import { ApiService } from './../../../../core/http/api.service';
import { AuthService } from './../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
  ],
})
export class SignUpComponent implements OnInit {
  step = 4;
  loading = false;
  newInterest = '';
  errorPopup = 'none';
  errorTitle = '';
  errorMessage = '';
  interests = [
    {
      name: 'actualidad',
      icon: 'bi bi-newspaper',
      selected: false,
    },
    {
      name: 'cine',
      icon: 'bi bi-film',
      selected: false,
    },
    {
      name: 'literatura',
      icon: 'bi bi-book',
      selected: false,
    },
    {
      name: 'otro',
      value: '',
      icon: 'bi bi-three-dots',
      other: true,
      selected: false,
    },
  ];
  regions: any[] = [];
  regionsDict: any = {};
  selectedRegion: any = 'Region';
  communes: any[] = [];
  public profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  public otherInfoForm = new FormGroup({
    birthDate: new FormControl(moment([1970, 0, 1]), [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });
  public descriptionForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private regionsService: RegionsService
  ) {}
  ngOnInit(): void {
    this.regionsDict = this.regionsService.getRegions();
    this.regions = this.regionsDict.regiones;
    console.log(this.regions);
  }
  nextStep(options: any = {}) {
    console.log('NEXT');
    if (this.step == 1) {
      this.loading = true;
      let body = {
        first_name: this.profileForm.get('firstName')!.value,
        email: this.profileForm.get('email')!.value,
        password: this.profileForm.get('password')!.value,
      };
      this.authService.createUser(body).subscribe({
        next: (data: any) => {
          this.loading = false;
          console.log(data);
          if (data.result) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userId', data.data.user.id);
            localStorage.setItem('userName', data.data.user.first_name);
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
    } else if (this.step == 2) {
      this.step++;
    } else if (this.step == 3) {
      this.loading = true;
      let body = {
        birth_date: this.otherInfoForm.get('birthDate')!.value.format(),
        gender: this.otherInfoForm.get('gender')!.value,
        address: this.otherInfoForm.get('address')!.value,
      };
      console.log(body, 'body');
      this.apiService.updateUser(body).subscribe((data: any) => {
        console.log(data);
        if (data.result) {
          this.step++;
        }
        this.loading = false;
      });
    } else if (this.step == 4) {
      this.loading = true;
      let selectedInterests: any = this.interests.filter(
        (interest) => interest.selected
      );
      selectedInterests = selectedInterests.map(
        (interest: { name: any; value: any }) =>
          interest.name === 'otro' ? interest.value : interest.name
      );
      console.log(selectedInterests);
      let body = {
        interests: selectedInterests,
      };
      this.apiService.updateUser(body).subscribe((data: any) => {
        console.log(data);
        if (data.result) {
          this.step++;
        }
        this.loading = false;
      });
    } else if (this.step == 5) {
      this.loading = true;
      let body = {
        description: this.descriptionForm.get('description')!.value,
      };
      this.apiService.updateUser(body).subscribe((data: any) => {
        console.log(data);
        this.loading = false;
        if (data.result) {
          this.router.navigate(['dashboard/home']);
        }
      });
    }
  }
  // addInterest() {
  //   this.interests.push({ name: this.newInterest, selected: false });
  //   this.newInterest = '';
  // }
  changeInterest(e: any) {
    this.newInterest = e.target.value;
  }
  changePassword(event: any) {
    console.log(event);
    this.profileForm.controls['password'].setValue(event);
  }
  openErrorPopup(errorTitle: string = '', errorMessage: string = '') {
    this.errorTitle = errorTitle;
    this.errorMessage = errorMessage;
    this.errorPopup = 'block';
  }
  closeErrorPopup() {
    this.errorPopup = 'none';
  }
  selectRegion(region: any) {
    this.communes = region.comunas;
    console.log('Selected region', region);
  }
  printRegion() {
    console.log(this.selectedRegion);
    console.log(this.regions[this.selectedRegion]);
  }
}
