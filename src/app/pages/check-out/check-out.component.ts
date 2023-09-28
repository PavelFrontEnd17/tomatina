import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUpdate } from 'src/app/shared/interface/auth/auth.interfaces';
import { IProductResponse } from 'src/app/shared/interface/product/product.interfaces';
import { arrayUnion, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { ThisReceiver } from '@angular/compiler';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afs: Firestore,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.getBuscket()
    this.getUser()
    this.adressInit()
    this.contactsInit()
    this.orderInit()
    this.timeInit()
    this.getTotal()

  }

  public buscket!: IProductResponse[]
  public allOrders!: Array<any>
  getBuscket() {
    this.buscket = JSON.parse(localStorage.getItem('basket') as string)
    

  }
  public user!: IUpdate

  getUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser') as string)
  }

  public forTime: boolean = false
  onTime() {
    this.forTime = !this.forTime
    if (this.forTime) {
      this.time.get('date')?.setValidators([Validators.required])
      this.time.get('time')?.setValidators([Validators.required])
      this.time.get('date')?.updateValueAndValidity()
      this.time.get('time')?.updateValueAndValidity()
    } else {
      this.time.get('date')?.clearValidators()
      this.time.get('time')?.clearValidators()
      this.time.get('date')?.updateValueAndValidity()
      this.time.get('time')?.updateValueAndValidity()
    }
  }

  setTime() {
    console.log('!!!')
    this.order.patchValue({
      onTime: this.forTime
    })
    this.order.patchValue({
      toDate: this.time.get('date')?.value
    })
    this.order.patchValue({
      toTime: this.time.get('time')?.value
    })
  }

  public comment: boolean = false
  com() {
    this.comment = !this.comment
  }

  public cash = true

  payMeth(value: boolean) {
    this.cash = value
  }

  public contacts!: FormGroup

  contactsInit() {
    this.contacts = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.pattern(/^[а-яА-ЯіІїЇєЄёЁa-zA-Z']+$/)]],
      sname: [this.user.sname, [Validators.required, Validators.pattern(/^[а-яА-ЯіІїЇєЄёЁa-zA-Z']+$/)]],
      phone: [this.user.phone, [Validators.required]],
      email: [this.user.email, [Validators.email]]
    })
  }

  public adressForm!: FormGroup

  adressInit() {
    let index!: number

    if(this.user.adress.length != 0){
      index = this.user.adress.findIndex( adres => adres.active == true)
    }
    this.adressForm = this.fb.group({
      city: [this.user.adress[index].city, [Validators.required]],
      street: [this.user.adress[index].street, [Validators.required, Validators.pattern(/^[а-яА-ЯіІїЇєЄёЁa-zA-Z]+\s?[а-яА-ЯіІїЇєЄёЁa-zA-Z]*\s?(\d+)?$/)]],
      buildNum: [this.user.adress[index].buildNum, Validators.required],
      enterNum: [this.user.adress[index].enterNum],
      apartNum: [this.user.adress[index].apartNum],
      floorNum: [this.user.adress[index].floorNum],
      intercom: [this.user.adress[index].intercom]
    })
  }

  public order!: FormGroup

  orderInit() {
    this.order = this.fb.group({
      userUid: [this.user.uid],
      products: [this.buscket],
      cutl: [1],
      payment: ['cash'],
      bag: ['package'],
      comment: [null],
      contacts: [this.contacts.value],
      adress: [this.adressForm.value],
      tell: [false],
      onTime: [null],
      toDate: [null],
      toTime: [null],
      remain: [null],
      totalSum: [null],
      date: [null]
    })
  }

  public time!: FormGroup

  timeInit() {
    this.time = this.fb.group({
      date: [null],
      time: [null]
    })
  }




  public bagChange = false
  public bag!: string
  setBag(bag: string) {
    if (bag == 'bag') {
      this.order?.patchValue({
        bag: `${bag}`
      })
      this.bag = bag
      this.getTotal()
      this.bagChange = false
    } else if (bag == 'shoper') {
      this.order?.patchValue({
        bag: `${bag}`
      })
      this.bag = bag
      this.getTotal()
    }

  }

  setPay(value: string) {
    this.order.patchValue({
      payment: `${value}`
    })
    this.order.patchValue({
      remain: null
    })
  }


  public cutleryCount = 1
  public cutlNull = true
  setCutlery() {
    this.cutlNull = !this.cutlNull
    if (this.cutlNull) {
      this.order.patchValue({
        cutl: 0
      })
    } else if (!this.cutlNull) {
      this.order.patchValue({
        cutl: 0
      })
    }
    this.cutleryCount = 0
  }


  cutCount(value: boolean) {
    let count = this.order.get('cutl')?.value
    if (!value && count > 1) {
      count -= 1
    }
    if (value && count < 999) {
      count += 1
    }

    this.order.patchValue({
      cutl: count
    })
    this.cutleryCount = count
  }

  public tell = false

  tellMe() {
    this.tell = !this.tell

    this.order.patchValue({
      tell: this.tell
    })
  }

  productCount(prod: IProductResponse, value: boolean) {
    if (!value && prod.count > 1) {
      prod.count--
    }
    if (value && prod.count < 999) {
      prod.count++
    }
    this.order.patchValue({
      products: [this.buscket],
    })
    this.getTotal()
  }


  delProd(product: IProductResponse) {
    const index = this.buscket.findIndex(prod => prod.id === product.id);
    this.buscket.splice(index, 1)
    localStorage.setItem('basket', JSON.stringify(this.buscket));
    this.buscket = JSON.parse(localStorage.getItem('basket') as string)
    if (this.buscket.length == 0) {
      this.router.navigate([''])
    }
    this.order.patchValue({
      products: [this.buscket],
    })
    this.getTotal()
  }


  contactsAdd() {
    this.order.patchValue({
      contacts: this.contacts.value
    })
  }

  adressAdd() {
    this.order.patchValue({
      adress: this.adressForm.value
    })
  }

  public restIs = true

  rest() {
    this.restIs = !this.restIs
    if (!this.restIs) {
      this.order.patchValue({
        remain: null
      })
    }

  }

  public sum!: number
  public total!: number
  getTotal() {
    this.sum = 0
    for (let i = 0; i < this.buscket.length; i++) {
      this.sum += this.buscket[i]?.cost * this.buscket[i]?.count
    }
    this.total = this.sum
    if (this.bag == 'shoper') {
      this.total += 10
    } else if (this.bag == 'bag' && this.bagChange) {
      this.total -= 10
      this.bagChange = false
    }
    this.order.patchValue({
      totalSum: this.total
    })
  }

  getOrder() {
    this.setTime()
    this.adressAdd()
    this.contactsAdd()
    this.user = JSON.parse(localStorage.getItem('currentUser') as string)
    const userUid = this.user?.uid
    const fireUser = doc(this.afs, 'user', userUid)
    const date = new Date()
    this.order.patchValue({
      date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    })
    updateDoc(fireUser, {
      'orders': arrayUnion(this.order.value)
    })
    this.user.orders.push(this.order.value)
    this.orderService.create(this.order.value)
    localStorage.setItem('currentUser', JSON.stringify(this.user))
    console.log(JSON.parse(localStorage.getItem('currentUser') as string))
    const newBusket: Array<any> = []
    this.buscket = []
    localStorage.setItem('basket', JSON.stringify(newBusket))

    this.router.navigate([''])
  }
}
