import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteAlertComponent } from './user-delete-alert.component';

describe('UserDeleteAlertComponent', () => {
  let component: UserDeleteAlertComponent;
  let fixture: ComponentFixture<UserDeleteAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeleteAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
