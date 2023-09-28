import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth/auth.service';
import { ChangePassComponent } from './change-pass/change-pass/change-pass.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    private fb: FormBuilder,
    private accountService: AuthService,
    private dialog: MatDialog

  ){}
  openRegister(){
    this.dialog.open(RegisterComponent, {
      panelClass: 'auth-dialog'
    })
  }
  changePass(){
    this.dialog.open(ChangePassComponent, {
      panelClass: 'reg-dialog'
    })
  }

  public authForm!: FormGroup


  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required]]

    })
  }

  public error = false

  login() {
    const { email, pass } = this.authForm.value
    this.accountService.login(email, pass).then(() => {
      this.dialog.closeAll()
      this.error = false
    }).catch(e => {
      this.error = true
      console.log(e)
    })
  }


}
