import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

import { DostavkaComponent } from './dostavka.component';

describe('DostavkaComponent', () => {
  let component: DostavkaComponent;
  let fixture: ComponentFixture<DostavkaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DostavkaComponent],
      imports:[
        MatDialogModule
      ],
      providers: [
        {provide: Storage, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
        {provide: ProductService, useValue: {}},
        {provide: ActivatedRoute, useValue: {}},
        {provide: CategoryService, useValue: {}},
        {provide: AuthService, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(DostavkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
