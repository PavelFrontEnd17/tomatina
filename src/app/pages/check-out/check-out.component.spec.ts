import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

import { CheckOutComponent } from './check-out.component';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckOutComponent],
      providers: [
        OrdersService,
        {provide: Storage, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
        // {provide: OrdersService, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
