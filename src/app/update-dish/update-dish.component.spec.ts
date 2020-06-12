import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDishComponent } from './update-dish.component';

describe('UpdateDishComponent', () => {
  let component: UpdateDishComponent;
  let fixture: ComponentFixture<UpdateDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
