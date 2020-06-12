import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromodetailComponent } from './promodetail.component';

describe('PromodetailComponent', () => {
  let component: PromodetailComponent;
  let fixture: ComponentFixture<PromodetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromodetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
