import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadersManagementComponent } from './leaders-management.component';

describe('LeadersManagementComponent', () => {
  let component: LeadersManagementComponent;
  let fixture: ComponentFixture<LeadersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadersManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
