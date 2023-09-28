import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AuthComponent } from '../auth.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

@Injectable({
  providedIn: RegisterComponent
})

export class RegisterComponent {
  constructor(
    private dialog: MatDialog,
    private serv: AuthService,
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.initForm()
  }
  openAuth(){
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })
  }
  public regForm!: FormGroup
  public passRep = ''
  initForm(){
    this.regForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(/^[А-Яа-яёЁЇїІіЄєҐґ]*$/)]],
      sname: [null, [Validators.required, Validators.pattern(/^[А-Яа-яёЁЇїІіЄєҐґ]*$/)]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      pass: [null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]*$/)]]
    })
  }

  public error=  false

  createUser(){
    const {email, pass, name, sname, phone} = this.regForm.value
    this.serv.emailSignUp(email, pass, this.regForm.value).then( () => {
      this.dialog.closeAll()
    }).catch(e => {
      this.error = true
      console.log(e)
    })
  }

  public passError:boolean = false

  checkPass(){
    const {email, pass, name, sname, phone} = this.regForm.value
    if(this.passRep != pass){
      this.passError = true
    }else if(this.passRep === pass){
      this.passError = false
    }
  }
}
