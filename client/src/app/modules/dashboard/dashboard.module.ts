import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { SearchMeetingsComponent } from './pages/search-meetings/search-meetings.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatChipsModule } from '@angular/material/chips';
import { SearcherComponent } from './pages/searcher/searcher.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { MeetingComponent } from './pages/meeting/meeting.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    MeetingsComponent,
    SearchMeetingsComponent,
    ProfileComponent,
    SearcherComponent,
    CalendarComponent,
    MeetingComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgbModule,
    MatChipsModule,
    CoreModule,
  ],
})
export class DashboardModule {}
