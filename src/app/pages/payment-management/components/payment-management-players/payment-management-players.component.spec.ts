import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManagementPlayersComponent } from './payment-management-players.component';

describe('PaymentManagementPlayersComponent', () => {
  let component: PaymentManagementPlayersComponent;
  let fixture: ComponentFixture<PaymentManagementPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentManagementPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManagementPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
