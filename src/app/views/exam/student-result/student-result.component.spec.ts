import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResultComponent } from './student-result.component';

describe('StudentResultComponent', () => {
  let component: StudentResultComponent;
  let fixture: ComponentFixture<StudentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
