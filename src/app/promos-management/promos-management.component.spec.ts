import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromosManagementComponent } from './promos-management.component';

describe('PromosManagementComponent', () => {
  let component: PromosManagementComponent;
  let fixture: ComponentFixture<PromosManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromosManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromosManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
