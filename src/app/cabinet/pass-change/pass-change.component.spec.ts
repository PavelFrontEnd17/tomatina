import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { PassChangeComponent } from './pass-change.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('PassChangeComponent', () => {
  let component: PassChangeComponent;
  let fixture: ComponentFixture<PassChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassChangeComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Storage, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: AuthService, useValue: {} },

      ]
    });
    fixture = TestBed.createComponent(PassChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
