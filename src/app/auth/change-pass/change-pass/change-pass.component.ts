import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../auth.component';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent {
  constructor(
    private dialog: MatDialog
  ){}
  openAuth(){
    this.dialog.closeAll()
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })
  }
  closeAll(){
    this.dialog.closeAll()
  }
}
