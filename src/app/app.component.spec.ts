import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './shared/services/auth/auth.service';
import { CategoryService } from './shared/services/category/category.service';
import { IngrService } from './shared/services/ingr/ingr.service';
import { OrdersService } from './shared/services/orders/orders.service';
import { ProductService } from './shared/services/product/product.service';

describe('AppComponent', () => {
  let component: AppComponent
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MatDialogModule
    ],
    declarations: [
      AppComponent,
      DeliveryComponent,
      HeaderComponent,
      FooterComponent,
    ],
    providers: [
      { provide: Storage, useValue: {} },
      { provide: Auth, useValue: {} },
      { provide: Firestore, useValue: {} },
      { provide: ProductService, useValue: {} },
      { provide: OrdersService, useValue: {} },
      { provide: IngrService, useValue: {} },
      { provide: CategoryService, useValue: {} },
      { provide: AuthService, useValue: {} },
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tomatina'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tomatina');
  });

  // it('getSum', () => {
  //   let bucket = [
  //     {
  //       alergens: " яйця,борошно пшеничне,молоковмісний продукт,мигдаль",
  //       banner: "СНІДАНКИ ДО 18:00",
  //       bannerCol: null,
  //       carb: 55.2,
  //       category: "breakfast",
  //       cost: 1,
  //       count: 3,
  //       description: "Ніжний скрембл з курячими ковбасками з моцарелою власного виробництва, житній хліб, хрусткий бекон, свіжий мікс салату, квасолька в томатному соусі, чері та апельсиновий соус",
  //       fats: 78.7,
  //       imgPath: "https://firebasestorage.googleapis.com/v0/b/tomatina-273ab.appspot.com/o/images%2Fanglijskyj-snidanok-700x700-500x500.webp?alt=media&token=b556bb5d-6001-4807-a480-de42694abc94",
  //       kkal: 1194,
  //       name: "Англійський сніданок",
  //       prot: 74.4,
  //       weight: 420,
  //     },
  //     {
  //       alergens: " яйця,борошно пшеничне,молоковмісний продукт,мигдаль",
  //       banner: "СНІДАНКИ ДО 18:00",
  //       bannerCol: null,
  //       carb: 55.2,
  //       category: "breakfast",
  //       cost: 2,
  //       count: 2,
  //       description: "Ніжний скрембл з курячими ковбасками з моцарелою власного виробництва, житній хліб, хрусткий бекон, свіжий мікс салату, квасолька в томатному соусі, чері та апельсиновий соус",
  //       fats: 78.7,
  //       imgPath: "https://firebasestorage.googleapis.com/v0/b/tomatina-273ab.appspot.com/o/images%2Fanglijskyj-snidanok-700x700-500x500.webp?alt=media&token=b556bb5d-6001-4807-a480-de42694abc94",
  //       kkal: 1194,
  //       name: "Англійський сніданок",
  //       prot: 74.4,
  //       weight: 420,
  //     },
  //     {
  //       alergens: " яйця,борошно пшеничне,молоковмісний продукт,мигдаль",
  //       banner: "СНІДАНКИ ДО 18:00",
  //       bannerCol: null,
  //       carb: 55.2,
  //       category: "breakfast",
  //       cost: 3,
  //       count: 1,
  //       description: "Ніжний скрембл з курячими ковбасками з моцарелою власного виробництва, житній хліб, хрусткий бекон, свіжий мікс салату, квасолька в томатному соусі, чері та апельсиновий соус",
  //       fats: 78.7,
  //       imgPath: "https://firebasestorage.googleapis.com/v0/b/tomatina-273ab.appspot.com/o/images%2Fanglijskyj-snidanok-700x700-500x500.webp?alt=media&token=b556bb5d-6001-4807-a480-de42694abc94",
  //       kkal: 1194,
  //       name: "Англійський сніданок",
  //       prot: 74.4,
  //       weight: 420,
  //     },
  //   ]

  //   localStorage.setItem('basket', JSON.stringify(bucket))
  //   // spyOn(component, "getSum").and.callThrough()
  //   component.getSum()
  //   expect(component.getSum).toHaveBeenCalled()
  //   expect(component.sum).toBe(10)
  // });
});
