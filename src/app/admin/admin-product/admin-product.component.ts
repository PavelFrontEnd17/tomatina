import { Component } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interface/category/categories.interfaces';
import { IProductResponse } from 'src/app/shared/interface/product/product.interfaces';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
  public catList!: ICategoryResponse[]
  public prodList!: IProductResponse[]
  public prodForm!: FormGroup
 constructor(
  private catData: CategoryService,
  private prodData: ProductService,
  private fb: FormBuilder,
  private storage: Storage
 ){}

  ngOnInit(): void {
    this.getCategories()
    this.initForm()
    this.getProducts()
  }


  getCategories(){
    this.catData.getCategories()
    .subscribe(data => { this.catList = data as ICategoryResponse[]})
  }



  initForm(){
    this.prodForm = this.fb.group({
      name: [null, [Validators.required]],
      category: [null, [Validators.required]],
      alergens: [null, [Validators.required]],
      description: [null, [Validators.required]],
      fats: [null, [Validators.required]],
      kkal: [null, [Validators.required]],
      prot: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      cost: [null, [Validators.required]],
      count: [1],
      carb: [null, [Validators.required]],
      banner: [null],
      bannerCol: [null],
      imgPath: [null, [Validators.required]],
      
    
    })
  }

  public bannerOn = false


  bannerCheck(){
    this.bannerOn = !this.bannerOn
    if(this.bannerOn){
      this.prodForm.get('banner')?.setValidators([Validators.required])
      this.prodForm.get('bannerCol')?.setValidators([Validators.required])
      this.prodForm.get('banner')?.updateValueAndValidity()
      this.prodForm.get('bannerCol')?.updateValueAndValidity()
    }else if(!this.bannerOn){
      this.prodForm.patchValue({
        banner: null
      })
      this.prodForm.patchValue({
        bannerCol: null
      })
      this.prodForm.get('banner')?.clearValidators
      this.prodForm.get('bannerCol')?.clearValidators
      this.prodForm.get('banner')?.updateValueAndValidity()
      this.prodForm.get('bannerCol')?.updateValueAndValidity()
    }
  }


  getProducts() {
    this.prodData.get().subscribe(data => { this.prodList = data as Array<IProductResponse> })
  }

public editStatus = false
public editId!: string
public IsUploded: boolean = false

  addProduct(): void {
    if(this.editStatus){
      this.prodData.update(this.prodForm.value, this.editId ).then(() => {
        this.getProducts()
        this.prodForm.reset()
        this.prodForm.patchValue({
          count: 1
        })
        this.editStatus = false
        this.IsUploded = false
      })
    }else {
      this.prodData.create(this.prodForm.value).then(() => {
        this.getProducts()
        this.prodForm.reset()
        this.prodForm.patchValue({
          count: 1
        })
        this.editStatus = false
        this.IsUploded = false

      })
    }
  }


  editProduct(prod: IProductResponse): void {
    this.prodForm.patchValue({
      name: prod.name,
      category: prod.category,
      alergens: prod.alergens,
      description: prod.description,
      fats: prod.fats,
      kkal: prod.kkal,
      prot: prod.kkal,
      weight: prod.weight,
      cost: prod.cost,
      count: 1,
      carb: prod.carb,
      imgPath: prod.imgPath,
    })
    if(prod.banner == undefined){{
      this.prodForm.patchValue({
        banner: null,
        bannerCol: null
      })
    }}
    this.editStatus = true
    this.editId = prod.id
  }


  deleteProduct(product: IProductResponse): void {
    if (confirm('Are you shure?')) {
      this.prodData.delete(product.id).then(data => {
        console.log(data)
        this.getProducts()
      })
    }
  }


  upload(event: any): void{
    const file = event.target.files[0]
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.prodForm.patchValue({
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
        const storageRef = ref(this.storage, path)
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

  deleteImage(): void{
    this.valueByControl('imgPath')
    const task = ref(this.storage, this.controlledValue)
    deleteObject(task).then(()=>{
      console.log('File deleted')
      this.IsUploded = false
      this.updatePercent = 0
      this.prodForm.patchValue({
        imagePath: null
      })
    })
  }
  public controlledValue!: string

  valueByControl(control: string): string{
    this.controlledValue =  this.prodForm.get(control)?.value
    return this.prodForm.get(control)?.value
}

}
