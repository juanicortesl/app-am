import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../../../../core/http/api.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

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
    },
    {
      validators: [MeetingsComponent.isThemeValid],
    }
  );
  public thirdStepForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(300),
    ]),
  });
  public fourthStepForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });

  minDate: Date | undefined;
  maxDate: Date | undefined;
  public fifthStepForm = new FormGroup({
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
  });

  public sixthStepForm = new FormGroup({
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
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 30);
  }

  createNewMeeting() {
    try {
      this.apiService.addAvailableMeeting({}).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } catch {}
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  get theme() {
    return this.secondStepForm.get('theme')?.value;
  }
}
