import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { DostavkaComponent } from './pages/dostavka/dostavka.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ZrobySamComponent } from './pages/zroby-sam/zroby-sam.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { CabinetGuard } from './shared/guards/cab/cabinet.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cabinet',
  canActivate: [CabinetGuard],
  loadChildren: () => import('./cabinet/cabinet.module').then(m=> m.CabinetModule)
  },
  {path: 'admin',
  canActivate: [AuthGuard],
  loadChildren: () => import('./admin/admin.module').then(m=> m.AdminModule) },
  {path: 'zbery-sam', component: ZrobySamComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'dostavka', component: DostavkaComponent},
  {path: 'product/:category', component: ProductComponent},
  {path: 'check-out', component: CheckOutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }