import { Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../../../../core/http/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnInit {
  step = 0;
  public firstStepForm = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  public secondStepForm = new FormGroup(
    {
      theme: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      otherTheme: new FormControl('', []),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(60),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(250),
      ]),
    },
    {
      validators: [MeetingsComponent.isThemeValid],
    }
  );
  minDate: Date | undefined;
  maxDate: Date | undefined;
  public thirdStepForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    startTime: new FormControl({ hour: 12, minute: 0 }, [Validators.required]),
  });

  public fourthStepForm = new FormGroup({
    acceptedTerms: new FormControl('', [Validators.required]),
  });
  static isThemeValid(control: AbstractControl): ValidationErrors | null {
    if ((control.get('theme')?.value as string) !== 'other') {
      return null;
    }
    if ((control.get('otherTheme')?.value as string).length < 3) {
      return { isThemeValid: false };
    }
    return null;
  }

  // user search

  myControl = new FormControl();
  users: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any[]> | undefined;
  selectedUsers: any[] = [];
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement> | undefined;

  popupDisplayStyle = 'none';
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 30);

    // user searcher
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: any): string[] {
    const filterValue = value.first_name
      ? value.first_name.toLowerCase()
      : value?.toLowerCase();
    return this.users.filter((user: any) => {
      return (
        user.first_name &&
        user.first_name.toLowerCase().includes(filterValue) &&
        !this.selectedUsers.includes(user)
      );
    });
  }

  selectUser(user: any) {
    this.selectedUsers.push(user);
  }

  add(event: MatChipInputEvent): void {
    const value = event.value;

    // Add our fruit
    if (value) {
      this.selectedUsers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.myControl.setValue(null);
  }

  remove(user: any): void {
    const index = this.selectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedUsers.length < 10) {
      this.selectedUsers.push(event.option.value);
      if (this.userInput) {
        this.userInput.nativeElement.value = '';
      }
      this.myControl.setValue('');
    }
  }

  createNewMeeting() {
    console.log(this.meeting);
    try {
      this.apiService.addAvailableMeeting(this.meeting).subscribe({
        next: (data: any) => {
          if (data.result) {
            this.step = 0;
            if (this.meeting.type === 'private') {
              this.selectedUsers.forEach((user) => {
                this.apiService
                  .inviteUserToMeeting(data.data.model.id, {
                    inviteeId: user.id,
                  })
                  .subscribe((data: any) => {
                    console.log(data);
                  });
              });
            }
            this.popupDisplayStyle = 'block';
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } catch {}
  }
  closePopup() {
    this.popupDisplayStyle = 'none';
    this.router.navigate(['dashboard/home']);
  }
  nextStep() {
    this.step++;
    if (this.step === 1) {
      this.apiService.getUsers().subscribe((data: any) => {
        console.log(data);
        if (data.result) {
          this.users = data.data.model;
        }
      });
    }
  }

  previousStep() {
    this.step--;
  }
  get type() {
    return this.firstStepForm.get('type')?.value;
  }
  get theme() {
    let value = this.secondStepForm.get('theme')?.value;
    return value !== 'other'
      ? value
      : this.secondStepForm.get('otherTheme')?.value;
  }
  get description() {
    return this.secondStepForm.get('description')?.value;
  }
  get name() {
    return this.secondStepForm.get('name')?.value;
  }
  get date() {
    return this.thirdStepForm.get('date')?.value;
  }
  get startTime() {
    return this.thirdStepForm.get('startTime')?.value;
  }

  get meeting() {
    let startTime = new Date(this.date);
    let endTime = new Date(this.date);
    startTime.setHours(this.startTime.hour);
    startTime.setMinutes(this.startTime.minute);
    return {
      name: this.name,
      theme: this.theme,
      type: this.type,
      Host: { first_name: localStorage.getItem('userName') },
      startTime: startTime,
      availableSlots: 10,
      description: this.description,
    };
  }
}
