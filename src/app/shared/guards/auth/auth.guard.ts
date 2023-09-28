import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthComponent } from 'src/app/auth/admin-auth/admin-auth.component';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private dialog: MatDialog

  ) { }
  openDialog() {
    this.dialog.open(AdminAuthComponent, {
      panelClass: 'admin-dialog'
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userString = localStorage.getItem('currentUser')
    if (userString == '' ||
      userString == 'null' ||
      userString == null ||
      userString == undefined) {
      this.openDialog()
      this.router.navigate([''])
      return false;
    } else {
      let currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
      if (currentUser && currentUser.role === 'ADMIN') {
        return true;
      }else{
        this.openDialog()
        this.router.navigate([''])
        return false;
      }
    }

    
  }

}
