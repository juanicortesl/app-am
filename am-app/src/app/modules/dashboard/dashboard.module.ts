import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { SearchMeetingsComponent } from './pages/search-meetings/search-meetings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    MeetingsComponent,
    SearchMeetingsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
