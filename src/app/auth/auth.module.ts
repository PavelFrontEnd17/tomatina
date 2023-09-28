import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePassComponent } from './change-pass/change-pass/change-pass.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';



@NgModule({
  declarations: [
    // ChangePassComponent,
    // AdminAuthComponent,
    // RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IMaskModule
  ]
})
export class AuthModule { }
