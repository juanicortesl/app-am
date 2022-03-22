import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MeetingCardComponent } from './components/meeting-card/meeting-card.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MeetingsFilterPipe } from './pipes/meetings-filter.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersFilterPipe } from './pipes/users-filter.pipe';
import { PastMeetingCardComponent } from './components/past-meeting-card/past-meeting-card.component';
import { CanceledMeetingCardComponent } from './components/canceled-meeting-card/canceled-meeting-card.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    RouterModule,
  ],
  exports: [
    MeetingCardComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MeetingsFilterPipe,
    MatAutocompleteModule,
    UserCardComponent,
    UsersFilterPipe,
    PastMeetingCardComponent,
    CanceledMeetingCardComponent,
  ],
  providers: [HttpClient, MeetingsFilterPipe],
  declarations: [
    MeetingCardComponent,
    ShortenPipe,
    MeetingsFilterPipe,
    UserCardComponent,
    UsersFilterPipe,
    PastMeetingCardComponent,
    CanceledMeetingCardComponent,
  ],
})
export class CoreModule {}
