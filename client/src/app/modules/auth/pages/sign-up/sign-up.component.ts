import { RegionsService } from './../../../../core/services/regions.service';
import { ApiService } from './../../../../core/http/api.service';
import { AuthService } from './../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  step = 1;
  loading = false;
  newInterest = '';
  errorPopup = 'none';
  errorTitle = '';
  errorMessage = '';
  interests = [
    {
      name: 'actualidad',
      selected: false,
    },
    {
      name: 'cine',
      selected: false,
    },
    {
      name: 'literatura',
      selected: false,
    },
    {
      name: 'otros',
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
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
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
      this.step++;
    } else if (this.step == 4) {
      this.step++;
    } else if (this.step == 5) {
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
