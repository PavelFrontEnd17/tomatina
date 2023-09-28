import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminCategoryComponent } from "./admin-category/admin-category.component";
import { AdminIngrComponent } from "./admin-ingr/admin-ingr.component";
import { AdminProductComponent } from "./admin-product/admin-product.component";
import { AdminComponent } from "./admin.component";

function redirect(){

}
const routes: Routes = [
  {path: '', component: AdminComponent, children: [
      {path: 'admin-category', component: AdminCategoryComponent},
      {path: 'admin-product', component: AdminProductComponent},
      {path: 'admin-ingr', component: AdminIngrComponent},
      {path: '', pathMatch: 'full', redirectTo: '/admin/admin-category'},

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }