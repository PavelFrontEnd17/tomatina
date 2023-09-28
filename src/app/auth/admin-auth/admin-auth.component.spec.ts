import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthComponent } from './admin-auth.component';
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from "@angular/forms";
import { Storage } from '@angular/fire/storage';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('AdminAuthComponent', () => {
  let component: AdminAuthComponent;
  let fixture: ComponentFixture<AdminAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuthComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
          {provide: Storage, useValue: {}},
          {provide: Auth, useValue: {}},
          {provide: Firestore, useValue: {}},
          {provide: AuthService, useValue: {}},
        ]
    });
    fixture = TestBed.createComponent(AdminAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
