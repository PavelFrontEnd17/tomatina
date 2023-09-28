import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Storage } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Storage, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
        {provide: ProductService, useValue: {}},

      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
