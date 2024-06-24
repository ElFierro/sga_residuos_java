import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMyReportComponent } from './check-my-report.component';

describe('CheckMyReportComponent', () => {
  let component: CheckMyReportComponent;
  let fixture: ComponentFixture<CheckMyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckMyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckMyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
