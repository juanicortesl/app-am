import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { SearchMeetingsComponent } from './pages/search-meetings/search-meetings.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    MeetingsComponent,
    SearchMeetingsComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, FormsModule, NgbModule],
})
export class DashboardModule {}
