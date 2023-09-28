import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthComponent } from 'src/app/auth/auth.component';
import { HeaderComponent } from "../../../components/header/header.component";

@Injectable({
  providedIn: 'root'
})
export class CabinetGuard implements CanActivate {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  openDialog() {
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let curUser = localStorage.getItem('currentUser') as string
    if (curUser != '' && curUser != null && curUser != undefined && curUser != 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
      if (localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser') != 'null') {
        console.log('true ', currentUser)
        return true;
      }
      console.log('false ', currentUser)
      this.router.navigate(['']);
      this.openDialog()
      return false;
    }else{
      this.router.navigate(['']);
      this.openDialog()
      return false
    }
  }
  


}

