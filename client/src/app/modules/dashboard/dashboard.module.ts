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

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    MeetingsComponent,
    SearchMeetingsComponent,
    ProfileComponent,
    SearcherComponent,
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
