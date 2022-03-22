import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledMeetingCardComponent } from './canceled-meeting-card.component';

describe('CanceledMeetingCardComponent', () => {
  let component: CanceledMeetingCardComponent;
  let fixture: ComponentFixture<CanceledMeetingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanceledMeetingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledMeetingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
