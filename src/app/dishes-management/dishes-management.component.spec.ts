import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesManagementComponent } from './dishes-management.component';

describe('DishesManagementComponent', () => {
  let component: DishesManagementComponent;
  let fixture: ComponentFixture<DishesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
