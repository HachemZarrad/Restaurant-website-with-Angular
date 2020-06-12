import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepromoComponent } from './updatepromo.component';

describe('UpdatepromoComponent', () => {
  let component: UpdatepromoComponent;
  let fixture: ComponentFixture<UpdatepromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
