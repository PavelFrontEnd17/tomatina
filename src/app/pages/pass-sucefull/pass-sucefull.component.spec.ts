import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { PassSucefullComponent } from './pass-sucefull.component';

describe('PassSucefullComponent', () => {
  let component: PassSucefullComponent;
  let fixture: ComponentFixture<PassSucefullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassSucefullComponent],
      providers: [
        {provide: Storage, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(PassSucefullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
