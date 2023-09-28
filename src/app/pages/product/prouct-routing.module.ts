import {RouterModule, Routes} from "@angular/router";
import {CabinetComponent} from "../../cabinet/cabinet.component";
import {MainComponent} from "../../cabinet/main/main.component";
import {FavoriteComponent} from "../../cabinet/favorite/favorite.component";
import {OrderListComponent} from "../../cabinet/order-list/order-list.component";
import {PassChangeComponent} from "../../cabinet/pass-change/pass-change.component";
import {NgModule} from "@angular/core";
import {ProductComponent} from "./product.component";
import { ProductInfoComponent } from "./product-info/product-info.component";

function redirect(){

}
const routes: Routes = [
  {path: 'product/:category', component: ProductComponent},
  {path: 'product/:category/:id', component: ProductInfoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
