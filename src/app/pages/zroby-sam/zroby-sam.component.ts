import { r3JitTypeSourceSpan } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUpdate } from 'src/app/shared/interface/auth/auth.interfaces';
import { IIngrResponse } from 'src/app/shared/interface/ingridients/ingridients.interfaces';
import { IProductRequire, IProductResponse } from 'src/app/shared/interface/product/product.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IngrService } from 'src/app/shared/services/ingr/ingr.service';

@Component({
  selector: 'app-zroby-sam',
  templateUrl: './zroby-sam.component.html',
  styleUrls: ['./zroby-sam.component.scss']
})
export class ZrobySamComponent {
  constructor(
    private data: IngrService,
    private userData: AuthService,
    private router: Router

  ) {

  }


  ngOnInit(): void {
    this.getIngridients()
  }

  public all!: IIngrResponse[]
  public main!: IIngrResponse[]
  public mainIngr!: IIngrResponse[]
  public chees!: IIngrResponse[]
  public vegFrut!: IIngrResponse[]
  public green!: IIngrResponse[]
  public toping!: IIngrResponse[]
  public souses!: IIngrResponse[]

  getIngridients() {
    this.data.get().subscribe(data => {
      this.all = data as IIngrResponse[]
      this.main = data.filter(ingr => ingr["type"] === `Основа`) as IIngrResponse[]
      this.mainIngr = data.filter(ingr => ingr["type"] === `Основний інгредієнт`) as IIngrResponse[]
      this.chees = data.filter(ingr => ingr["type"] === `Сири та яйця`) as IIngrResponse[]
      this.vegFrut = data.filter(ingr => ingr["type"] === `Овочі та фрукти`) as IIngrResponse[]
      this.green = data.filter(ingr => ingr["type"] === `Зелень`) as IIngrResponse[]
      this.toping = data.filter(ingr => ingr["type"] === `Хрусткі топінги`) as IIngrResponse[]
      this.souses = data.filter(ingr => ingr["type"] === `Соуси`) as IIngrResponse[]
    })



  }

  public ingrBucket: IIngrResponse[] = []

  addIngr(ingr: IIngrResponse) {
    if (this.ingrBucket.length > 0) {
      if (this.ingrBucket.some(ing => ing.id === ingr.id)) {
        const index = this.ingrBucket.findIndex(ing => ing.id === ingr.id);
        this.ingrBucket.splice(index, 1)
      } else {
        this.ingrBucket.push(ingr)

      }
    } else {
      this.ingrBucket.push(ingr);

    }
    this.getAdded(ingr)
    console.log(this.ingrBucket)
    this.getCred()

  }

  getAdded(ingr: IIngrResponse) {
    if (this.ingrBucket.some(ing => ing.id === ingr.id)) {

      return true

    } else {

      return false
    }

  }


  setCount(ingr: IIngrResponse, value: boolean) {
    let index = this.ingrBucket.findIndex(ing => ing.id === ingr.id)
    if (value && ingr.count < 999) {
      this.ingrBucket[index].count++
    } else if (!value && ingr.count > 1) {
      this.ingrBucket[index].count--
    }
    this.getCred()

  }
  del(ingr: IIngrResponse) {
    let index = this.ingrBucket.findIndex(ing => ing.id === ingr.id)
    this.ingrBucket.splice(index, 1)
    this.getCred()
  }


  public allKkal: number = 0

  public allCarb: number = 0
  public allFats: number = 0
  public allProt: number = 0
  public allPrice: number = 0
  public allWeight: number = 0
  public desc: string = ''

  public prodCount = 1

  totalCount(value: boolean) {
    if (value && this.prodCount < 999) {
      this.prodCount++
    } else if (!value && this.prodCount > 1) {
      this.prodCount--

    }
  }

  getCred() {
    this.allKkal = 0
    this.allFats = 0
    this.allProt = 0
    this.allCarb = 0
    this.allPrice = 0
    this.allWeight = 0
    this.desc = ''
    for (let i = 0; i < this.ingrBucket.length; i++) {
      this.allKkal += this.ingrBucket[i].kkal * this.ingrBucket[i].count
      this.allFats += this.ingrBucket[i].fats * this.ingrBucket[i].count
      this.allProt += this.ingrBucket[i].prot * this.ingrBucket[i].count
      this.allCarb += this.ingrBucket[i].carb * this.ingrBucket[i].count
      this.allPrice += this.ingrBucket[i].cost * this.ingrBucket[i].count
      this.allWeight += this.ingrBucket[i].weight * this.ingrBucket[i].count
      this.desc += `${this.ingrBucket[i].name}` + ' ' + `${this.ingrBucket[i].count},`

    }
  }

  genRan() {
    const min = 10000000;
    const max = 99999999; 
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  public name!:string

  public myProduct: IProductResponse = {
    id: '',
    name: this.name,
    category: '',
    imgPath:'https://firebasestorage.googleapis.com/v0/b/tomatina-273ab.appspot.com/o/images%2Fpasta_box.png?alt=media&token=b2d491ab-2c68-48be-b0f4-8034bc9351f5',
    alergens: '',
    description: 'Склад: '+this.desc,
    weight: this.allWeight,
    kkal: this.allKkal,
    prot: this.allProt,
    fats: this.allFats,
    carb: this.allCarb,
    count: this.prodCount,
    cost: this.allPrice,
    banner: '',
    bannerColor: ''
  }

  public nameMe: boolean = false
  setUpProduct(){
    this.getCred()
    this.myProduct.id = this.genRan().toString() 
    this.nameMe = true
    this.myProduct.category = ''
    this.myProduct.imgPath = 'https://firebasestorage.googleapis.com/v0/b/tomatina-273ab.appspot.com/o/images%2Fpasta_box.png?alt=media&token=b2d491ab-2c68-48be-b0f4-8034bc9351f5'
    this.myProduct.alergens = ''
    this.myProduct.description = 'Склад: '+this.desc
    this.myProduct.weight = this.allWeight
    this.myProduct.kkal = this.allKkal
    this.myProduct.prot = this.allProt
    this.myProduct.fats = this.allFats
    this.myProduct.carb = this.allCarb
    this.myProduct.count = this.prodCount
    this.myProduct.cost = this.allPrice
    this.myProduct.banner = ''
    this.myProduct.bannerColor = ''
    this.myProduct.name= this.name

  
  }

  public user!: IUpdate

  toFavorite(){
    this.setUpProduct()
    this.user  = JSON.parse(localStorage.getItem('currentUser')as string)

    if(this.user?.favorite.some(prod => prod.description === this.myProduct.description)){

    }else{
      this.user?.favorite.push(this.myProduct)
    }
    localStorage.setItem('currentUser', JSON.stringify(this.user))
    this.userData.change(this.user, this.user?.uid)
  }
  public busket!: IProductResponse[]
  toBusket(){
    console.log('start')
    this.setUpProduct()
    this.busket = JSON.parse(localStorage.getItem('basket')as string)
    if(this.busket.some(prod => prod.description === this.myProduct.description)){
      console.log('here')
    }else{
      this.busket.push(this.myProduct)
    }
    localStorage.setItem('basket', JSON.stringify(this.busket))
  }

  fastOrder(){
    this.toBusket()
    this.router.navigate(['/check-out'])
  }

  public action!: string

  openDiaolg(string: string){
    this.action = string
    this.nameMe = true

  }

  createProduct(){
    if(this.action =='bucket'){
      this.toBusket()
    }else if(this.action == 'favorite'){
      this.toFavorite()
    }else if(this.action == 'fast'){
      this.fastOrder()
    }  
    this.closeDialog()
  }
  
  closeDialog(){
    this.nameMe = false
  }
}
