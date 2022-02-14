import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MeetingCardComponent } from './components/meeting-card/meeting-card.component';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  exports: [MeetingCardComponent],
  providers: [HttpClient],
  declarations: [MeetingCardComponent, ShortenPipe],
})
export class CoreModule {}
