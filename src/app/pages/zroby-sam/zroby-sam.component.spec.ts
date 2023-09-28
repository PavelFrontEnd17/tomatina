import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IngrService } from 'src/app/shared/services/ingr/ingr.service';

import { ZrobySamComponent } from './zroby-sam.component';

describe('ZrobySamComponent', () => {
  let component: ZrobySamComponent;
  let fixture: ComponentFixture<ZrobySamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZrobySamComponent],
      providers: [
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
        {provide: IngrService, useValue: {}},
        {provide: AuthService, useValue: {}},
        
      ]
    });
    fixture = TestBed.createComponent(ZrobySamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
