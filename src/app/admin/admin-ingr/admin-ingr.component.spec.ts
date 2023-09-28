import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { IngrService } from 'src/app/shared/services/ingr/ingr.service';

import { AdminIngrComponent } from './admin-ingr.component';

describe('AdminIngrComponent', () => {
  let component: AdminIngrComponent;
  let fixture: ComponentFixture<AdminIngrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminIngrComponent],
      providers: [
        {provide: Storage, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
        {provide: IngrService, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(AdminIngrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
