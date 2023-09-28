import { Component } from '@angular/core';
import {  UploadTask, UploadTaskSnapshot } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interface/category/categories.interfaces';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {

  public catList!: ICategoryResponse[]
  public catForm!: FormGroup
  public upProcent!: number
  public isUploded: boolean = false

  constructor(
    private fb: FormBuilder,
    private data: CategoryService,
    private storage: Storage

  ){}



  ngOnInit(): void {
    this.getCat()
    this.initForm()
  }

  initForm(){
    this.catForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imgPath: [null, Validators.required],
      order: [null, Validators.required]
    })
  }
  public catLength = 0
  getCat(){
    this.data.getCategories()
    .subscribe(data => { 
      data.sort(function (a, b) {
        return a["order"] - b["order"]
      })
      this.catLength = data.length 

      this.catList = data as ICategoryResponse[]})
   
  }
  public editStatus = false
  public editId!: number|string

  editCategory(category: ICategoryResponse): void {
    this.catForm.patchValue({
      name: category.name,
      path: category.path,
      imgPath: category.imgPath
    })
    this.editStatus = true
    this.editId = category.id
  }


  upload(event: any): void{
    const file = event.target.files[0]
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.catForm.patchValue({
          imgPath: data
        })
      })
      .catch( err =>{
        console.log(err)
      })
      this.isUploded = true
  }
  async uploadFile(folder: string, name: string, file: File | null): Promise<string>{
    const path = `${folder}/${name}`
    let url!:any;
    if(file){
      try{
        const storageRef = ref(this.storage, path)
        const task = uploadBytesResumable(storageRef, file)

        percentage(task).subscribe(data => {
          this.upProcent = data.progress
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
  deleteImage(): void{
    this.valueByControl('imgPath')
    const task = ref(this.storage, this.controlledValue)
    deleteObject(task).then(()=>{
      this.isUploded = false
      this.upProcent = 0
      this.catForm.patchValue({
        imagePath: null
      })
    })
  }


  public controlledValue!: string
  valueByControl(control: string){
    this.controlledValue =  this.catForm.get(control)?.value
    return this.controlledValue
  }


  addCategory(): void {
    if(this.editStatus){
      this.data.update(this.catForm.value, this.editId ).then(() => {
        this.getCat()
        this.catForm.reset()
        this.editStatus = false
        this.isUploded = false
      })
    }else {
      this.data.create(this.catForm.value).then(() => {
        this.getCat()
        this.catForm.reset()
        this.editStatus = false
        this.isUploded = false
      })
    }
  }

  deleteCategory(category: ICategoryResponse): void {
    if (confirm('Are you shure?')) {
      this.data.delete(category.id).then(data => {
        this.getCat()
      })
    }
  }
}
