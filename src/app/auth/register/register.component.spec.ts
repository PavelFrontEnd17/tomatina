import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from "@angular/forms";

import { RegisterComponent } from './register.component';
import { Firestore } from "@angular/fire/firestore";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[
        RegisterComponent
      ],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        NgIf,

      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Storage, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: NgControl, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
