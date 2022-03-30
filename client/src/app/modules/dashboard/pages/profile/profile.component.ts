import { ApiService } from 'src/app/core/http/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loading = false;
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
  public profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUser();
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getUser() {
    this.loading = true;
    this.apiService.getCurrentUser().subscribe((data: any) => {
      console.log(data);
      this.loading = false;
      if (data.result) {
        this.profileForm.get('firstName')?.setValue(data.data.model.first_name);
        this.profileForm
          .get('description')
          ?.setValue(data.data.model.description);
        data.data.model.interests.forEach((interest: string) => {
          let selectedInterest = this.interests.find(
            (element) => element.name === interest
          );
          if (selectedInterest) {
            selectedInterest.selected = true;
          } else {
            this.interests[3].selected = true;
            this.interests[3].value = interest;
          }
        });
      }
    });
  }

  updateUser() {
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
      description: this.profileForm.get('description')?.value,
      first_name: this.profileForm.get('firstName')?.value,
    };
    this.apiService.updateUser(body).subscribe((data: any) => {
      console.log(data);
      this.getUser();
    });
  }
}
