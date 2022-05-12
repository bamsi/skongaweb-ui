import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishResultComponent } from './publish-result.component';

describe('PublishResultComponent', () => {
  let component: PublishResultComponent;
  let fixture: ComponentFixture<PublishResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
