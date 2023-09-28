import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite/favorite.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { CabinetComponent } from './cabinet.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth/auth.service';


@NgModule({
  declarations: [

    FavoriteComponent,
    OrderListComponent,
    PassChangeComponent
  ],

  imports: [
    CommonModule,
    CabinetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule

  ],
  providers: [
    AuthService
  ]
})
export class CabinetModule { }
