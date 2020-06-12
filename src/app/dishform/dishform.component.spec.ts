import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishformComponent } from './dishform.component';

describe('DishformComponent', () => {
  let component: DishformComponent;
  let fixture: ComponentFixture<DishformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
