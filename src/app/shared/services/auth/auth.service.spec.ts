import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Auth } from "@angular/fire/auth";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: Storage, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: AuthService, useValue: {} },
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
