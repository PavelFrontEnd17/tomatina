import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { IngrService } from 'src/app/shared/services/ingr/ingr.service';
import { IIngrResponse } from 'src/app/shared/interface/ingridients/ingridients.interfaces';

@Component({
  selector: 'app-admin-ingr',
  templateUrl: './admin-ingr.component.html',
  styleUrls: ['./admin-ingr.component.scss']
})
export class AdminIngrComponent {
  public ingrList!: IIngrResponse[]
  public ingrForm!: FormGroup
 constructor(
  private ingrData: IngrService,
  private fb: FormBuilder,
  private storage: Storage
 ){}

  ngOnInit(): void {
    this.initForm()
    this.getIngrs()
  }





  initForm(){
    this.ingrForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      fats: [null, [Validators.required]],
      kkal: [null, [Validators.required]],
      prot: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      cost: [null, [Validators.required]],
      count: [1],
      carb: [null, [Validators.required]],
      imgPath: [null, [Validators.required]],
      
    
    })
  }


  getIngrs() {
    this.ingrData.get().subscribe(data => { this.ingrList = data as Array<IIngrResponse> })
  }

public editStatus = false
public editId!: string
public IsUploded: boolean = false

  addIngr(): void {
    if(this.editStatus){
      this.ingrData.update(this.ingrForm.value, this.editId ).then(() => {
        this.getIngrs()
        this.ingrForm.reset()
        this.ingrForm.patchValue({
          count: 1
        })
        this.editStatus = false
        this.IsUploded = false
      })
    }else {
      this.ingrData.create(this.ingrForm.value).then(() => {
        this.getIngrs()
        this.ingrForm.reset()
        this.ingrForm.patchValue({
          count: 1
        })
        this.editStatus = false
        this.IsUploded = false

      })
    }
  }


  editIngr(ingr: IIngrResponse): void {
    this.ingrForm.patchValue({
      name: ingr.name,
      type: ingr.type,
      fats: ingr.fats,
      kkal: ingr.kkal,
      prot: ingr.kkal,
      weight: ingr.weight,
      cost: ingr.cost,
      count: 1,
      carb: ingr.carb,
      imgPath: ingr.imgPath,
    })
    this.editStatus = true
    this.editId = ingr.id
  }


  deleteIngr(ingr: IIngrResponse): void {
    if (confirm('Are you shure?')) {
      this.ingrData.delete(ingr.id).then(data => {
        console.log(data)
        this.getIngrs()
      })
    }
  }


  upload(event: any): void{
    const file = event.target.files[0]
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.ingrForm.patchValue({
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
      this.ingrForm.patchValue({
        imagePath: null
      })
    })
  }
  public controlledValue!: string

  valueByControl(control: string): string{
    this.controlledValue =  this.ingrForm.get(control)?.value
    return this.ingrForm.get(control)?.value
}

}
