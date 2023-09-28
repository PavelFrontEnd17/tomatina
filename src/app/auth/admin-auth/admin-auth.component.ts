import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AuthComponent } from '../auth.component';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent {
  public authForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private accountService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ){}

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



  openAuth(){
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })
  }
}
