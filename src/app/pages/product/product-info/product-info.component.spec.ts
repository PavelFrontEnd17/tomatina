import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { ProductInfoComponent } from './product-info.component';
import { Storage } from "@angular/fire/storage";
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [
        MatDialogModule
      ],
      providers: [
        {provide: Storage, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
        {provide: ProductService, useValue: {}},
        {provide: ActivatedRoute, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: AuthService, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
