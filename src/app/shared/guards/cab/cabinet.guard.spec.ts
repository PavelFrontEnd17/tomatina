import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { CabinetGuard } from './cabinet.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HeaderComponent} from "../../../components/header/header.component";
import {MatDialogModule} from "@angular/material/dialog";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";


describe('cabinetGuard', () => {
  let guard: CabinetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[
        HeaderComponent
      ],
      imports: [
        MatDialogModule
      ],
      providers: [
        {provide: Storage, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
      ]
    });
    guard = TestBed.inject(CabinetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
