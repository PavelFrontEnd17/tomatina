import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { AdminIngrComponent } from './admin-ingr/admin-ingr.component';



@NgModule({
  declarations: [

    AdminCategoryComponent,
    AdminProductComponent,
    AdminIngrComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
