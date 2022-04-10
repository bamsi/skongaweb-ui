import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAssessmentComponent } from './principal-assessment.component';

describe('PrincipalAssessmentComponent', () => {
  let component: PrincipalAssessmentComponent;
  let fixture: ComponentFixture<PrincipalAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
