import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderformComponent } from './leaderform.component';

describe('LeaderformComponent', () => {
  let component: LeaderformComponent;
  let fixture: ComponentFixture<LeaderformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
