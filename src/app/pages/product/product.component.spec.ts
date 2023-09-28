import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ProductComponent } from './product.component';
import {ProductService} from "../../shared/services/product/product.service";
import {Storage} from "@angular/fire/storage";
import {AuthService} from "../../shared/services/auth/auth.service";
import {RouterTestingModule} from "@angular/router/testing";
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IProductResponse } from 'src/app/shared/interface/product/product.interfaces';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports:[
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {provide: Storage, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: Firestore, useValue: {}},
        {provide: ProductService, useValue: {}},
        {provide: CategoryService, useValue: {}},
        {provide: AuthService, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Count', () => {
    const FAKE_PRODUCT: IProductResponse = {
      id: 'string',
      name: 'string',
      category: 'string',
      imgPath: 'string',
      description: 'string',
      alergens: 'string',
      weight: 0,
      kkal: 0,
      prot: 0,
      fats: 0,
      carb: 0,
      count: 1,
      cost: 10,
      banner: 'string',
      bannerColor: 'string',
    }
    spyOn(component, "Count").and.callThrough()
    component.Count(FAKE_PRODUCT, true)
    expect(component.Count).toHaveBeenCalled()
    expect(FAKE_PRODUCT.count).toBe( 2)
  });
});
