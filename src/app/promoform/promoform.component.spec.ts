import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoformComponent } from './promoform.component';

describe('PromoformComponent', () => {
  let component: PromoformComponent;
  let fixture: ComponentFixture<PromoformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
