import { CalendarComponent } from './pages/calendar/calendar.component';
import { SearcherComponent } from './pages/searcher/searcher.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SearchMeetingsComponent } from './pages/search-meetings/search-meetings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'meetings', component: MeetingsComponent },
      { path: 'search-meetings', component: SearchMeetingsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'searcher', component: SearcherComponent },
      { path: 'calendar', component: CalendarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
