import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastMeetingCardComponent } from './past-meeting-card.component';

describe('PastMeetingCardComponent', () => {
  let component: PastMeetingCardComponent;
  let fixture: ComponentFixture<PastMeetingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastMeetingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastMeetingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
