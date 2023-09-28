import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import {MainComponent} from "./main/main.component";
import {FavoriteComponent} from "./favorite/favorite.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {PassChangeComponent} from "./pass-change/pass-change.component";
function redirect(){

}
const routes: Routes = [
  {path: '', component: CabinetComponent, children: [
      {path: 'main', component: MainComponent},
      {path: 'favorite', component: FavoriteComponent},
      {path: 'order-list', component: OrderListComponent},
      {path: 'pass-change', component: PassChangeComponent},
      {path: '', pathMatch: 'full', redirectTo: 'main'},

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
