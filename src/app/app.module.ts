import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { RegisterComponent } from './auth/register/register.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { CabinetModule } from './cabinet/cabinet.module';
import { MainComponent } from './cabinet/main/main.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { DostavkaComponent } from './pages/dostavka/dostavka.component';
import { HomeComponent } from './pages/home/home.component';
import { PassSucefullComponent } from './pages/pass-sucefull/pass-sucefull.component';
import { ProductModule } from './pages/product/product.module';
import { ZrobySamComponent } from './pages/zroby-sam/zroby-sam.component';
import { AuthService } from './shared/services/auth/auth.service';
import { CategoryService } from './shared/services/category/category.service';
import { IngrService } from './shared/services/ingr/ingr.service';
import { OrdersService } from './shared/services/orders/orders.service';
import { ProductService } from './shared/services/product/product.service';
import { SharedModule } from './shared/shared.module';
import { IMaskModule } from 'angular-imask';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { ChangePassComponent } from './auth/change-pass/change-pass/change-pass.component';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { AngularFireModule } from "@angular/fire/compat";
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { NgIf } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    CabinetComponent,
    AdminComponent,
    HomeComponent,
    ZrobySamComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DeliveryComponent,
    AuthComponent,
    DostavkaComponent,
    CheckOutComponent,
    PassSucefullComponent,
    ChangePassComponent,
    AdminAuthComponent,
    RegisterComponent
  ],
  imports: [
    AngularFireModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    IMaskModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    SharedModule,
    FirebaseAppModule,
    CabinetModule,
    AdminModule,
    ProductModule,
    BrowserAnimationsModule,
    AuthModule,
    NgIf
  ],
  providers:[
    ProductService,
    OrdersService,
    IngrService,
    AuthService,
    CategoryService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }

