import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

import { AuthComponent } from 'src/app/auth/auth.component';
import { ProductService } from 'src/app/shared/services/product/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private storage: Storage,
    private serv: ProductService


  ){
    
    
  }


  ngOnInit(): void {
    this.initReview()
  }

  openDialog(){
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })
  }





  public reviewForm!: FormGroup

  initReview(){
    this.reviewForm = this.fb.group({
      rest: [null, [Validators.required]],
      name: [null, [Validators.required,  Validators.pattern(/^[а-яА-ЯіІїЇєЄёЁa-zA-Z']+$/)]],
      sname: [null, [Validators.required,  Validators.pattern(/^[а-яА-ЯіІїЇєЄёЁa-zA-Z']+$/)]],
      email: [null, [Validators.required, Validators.email]],
      comment: [null, [Validators.required]],
      imgPath: [null],
      rate: [1]

    })
  }
  public rate = 1

  addRate(number: number){

    this.rate = number
    this.reviewForm.patchValue({
      rate: this.rate
    })
  }
  public IsUploded = false
  public fileName = ''
  upload(event: any): void{
    const file = event.target.files[0]
    this.fileName = file.name 
    this.uploadFile('reviewImages', file.name, file)
      .then(data => {
        this.reviewForm.patchValue({
          imgPath: data
        })
      })
      .catch( err =>{
        console.log(err)
      })
      this.IsUploded = true
  }

  public updatePercent!: number

  async uploadFile(folder: string, name: string, file: File | null): Promise<string>{
    const path = `${folder}/${name}`
    let url = '';
    if(file){
      try{
        const storageRef =ref(this.storage, path)
        const task = uploadBytesResumable(storageRef, file)
        percentage(task).subscribe(data => {
          this.updatePercent = data.progress
        })
        await task;
        url = await getDownloadURL(storageRef);
        return Promise.resolve(url)

      } catch(e: any){
        console.error(e)
      }
    }
    else{
      alert('wrong format')
    }
  return Promise.resolve(url)

  }


  addReview(){
    this.serv.addReview(this.reviewForm.value)
    this.reviewForm.patchValue({
      rest: null,
      name: null,
      sname: null,
      email: null,
      comment: null,
      imgPath: null,
      rate: 1,
    })

  }

  public addRew  = false

  open(){
    this.addRew = true
  }

  close(){
    this.reviewForm.patchValue({
      rest: null,
      name: null,
      sname: null,
      email: null,
      comment: null,
      imgPath: null,
      rate: 1,
    })
    this.addRew  = false
  }


  public burger = false

  openBurger(){
    this.burger=true
  }
  closeBurger(){
    this.burger=false
  }
}

