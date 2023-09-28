import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { IngrService } from './ingr.service';

describe('IngrService', () => {
  let service: IngrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
        {provide: IngrService, useValue: {}},
      ]
    });
    service = TestBed.inject(IngrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
