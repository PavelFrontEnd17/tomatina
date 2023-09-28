import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PassSucefullComponent } from 'src/app/pages/pass-sucefull/pass-sucefull.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-pass-change',
  templateUrl: './pass-change.component.html',
  styleUrls: ['./pass-change.component.scss']
})
export class PassChangeComponent {
  constructor(
    private data: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.initForm()
    this.getUser()
  }
  public passForm!: FormGroup
  public user = JSON.parse(localStorage.getItem('currentUser') as string)
  getUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser') as string)
  }
  public inputNew = false
  public inputOld = false
  public inputRep = false
  inputOldPass() {
    this.inputOld = true
    this.checkValidity()
  }

  inputNewPass() {
    this.inputNew = true
    this.checkValidity()
  }
  inputRepPass() {
    this.inputRep = true
    this.checkValidity()
  }
  initForm() {
    this.passForm = this.fb.group({
      old: [null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]*$/)]],
      new: [null, [Validators.pattern(/^[A-Za-z0-9]*$/)]],
      newRep: [null, [Validators.pattern(/^[A-Za-z0-9]*$/)]]
    })
  }

  checkValidity(){
    if(this.passForm.get('new')?.value == this.passForm.get('newRep')?.value && 
    this.passForm.get('old')?.value == this.user.pass &&
    !this.passForm.invalid){
      return true
    }
    else{
      return false
    }
  }

  public criticalError = false

  passChange() {
    if (this.passForm.get('new')?.value == this.passForm.get('newRep')?.value && 
    this.passForm.get('old')?.value == this.user.pass) { 
      this.data.logout().then(()=>{
        return this.data.login(this.user.email, this.passForm.get('old')?.value)
      }).then(()=>{
        return this.data.passChange(this.passForm.get('new')?.value)
      }).catch((e) => {
        console.log(e)
      })
      this.user.pass = this.passForm.get('new')?.value
      localStorage.setItem('currentUser', JSON.stringify(this.user))
      this.data.change(this.user, this.user.uid)
      this.dialog.open(PassSucefullComponent, {
        panelClass: 'auth-dialog'
      })
    }else{
      this.criticalError = true
    }
  }
}
