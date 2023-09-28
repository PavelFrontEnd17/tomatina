import { Component } from '@angular/core';
import { IUpdate } from 'src/app/shared/interface/auth/auth.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(
    private fb: FormBuilder,
    private data: AuthService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.getUser()
    this.initUser()
    this.initAdress()
    this.getActiveAdress()
  }

  public user!: IUpdate
  getUser(){
    this.user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.data.get(this.user?.uid).subscribe(data => {
      this.user = data as IUpdate
    })
    localStorage.setItem('currentUser', JSON.stringify(this.user) )
  }

public userForm!: FormGroup

  initUser(){
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.pattern(/^[а-яА-ЯіІїЇєЄёЁa-zA-Z']+$/)]],
      sname: [this.user.sname, [Validators.required, Validators.pattern(/^[а-яА-ЯіІїЇєЄёЁa-zA-Z']+$/)]],
      phone: [this.user.phone, Validators.required],
      email: [this.user.email,  [Validators.required, Validators.email]]
    })

  }

  editUser(){

    let {name, sname, phone, email} = this.userForm.value
    this.user.name = name
    this.user.sname = sname
    this.user.phone = phone
    this.user.email = email
    this.data.change(this.user, this.user.uid)
    localStorage.setItem( 'currentUser',JSON.stringify(this.user))
    
  }

  public addAdress: boolean = false

  openDialog(){
    this.addAdress = true
  }
  closeDiaolg(){
    this.addAdress = false
  }
  public adresForm!: FormGroup

  initAdress(){

    this.adresForm = this.fb.group({
      city: ['Львів', [Validators.required]],
      street: [null, [Validators.required, Validators.pattern(/^[а-яА-ЯіІїЇєЄёЁa-zA-Z]+\s?[а-яА-ЯіІїЇєЄёЁa-zA-Z]*\s?(\d+)?$/)]],
      buildNum: [null, Validators.required],
      enterNum: [null],
      apartNum: [null],
      floorNum: [null],
      intercom: [null],
      id: [this.genRan()],
      active: [false]

    })

  }
  genRan() {
    const min = 10000000;
    const max = 99999999; 
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  adressAdd(){
    this.getUser()
    let someAdres = this.adresForm.value

    if(this.editIs){
      const index = this.user.adress.findIndex(adres => adres.id === someAdres.id);
      this.user.adress[index].city  = someAdres.city 
      this.user.adress[index].street  = someAdres.street 
      this.user.adress[index].buildNum = someAdres.buildNum
      this.user.adress[index].enterNum = someAdres.enterNum
      this.user.adress[index].apartNum = someAdres.apartNum
      this.user.adress[index].floorNum = someAdres.floorNum
      this.user.adress[index].intercom = someAdres.intercom

    }else if(!this.editIs){
      this.adresForm.patchValue({
        id: this.genRan()
      })
      if(this.user.adress.some(adress => adress.city === someAdres.city) && 
      this.user.adress.some(adress => adress.street === someAdres.street) &&
      this.user.adress.some(adress => adress.buildNum === someAdres.buildNum)){
  
      }else {
        this.user.adress.push(someAdres)
      }
    }
    
    localStorage.setItem( 'currentUser',JSON.stringify(this.user))
    this.data.change(this.user, this.user.uid)
    this.adresForm.patchValue({
      id: this.genRan(),
      city: null,
      street: null,
      buildNum: null,
      enterNum: null,
      apartNum: null,
      floorNum: null,
      intercom: null,
      active: false

    })
    
    this.closeDiaolg()
  }

  public editIs = false
  public editedId:number = 0
  editAdress(adress: any){
    this.editIs = true
    this.editedId = adress.id
    this.adresForm.patchValue({
      id: adress.id,
      city: adress.city,
      street: adress.street,
      buildNum: adress.buildNum,
      enterNum: adress.enterNum,
      apartNum: adress.apartNum,
      floorNum: adress.floorNum,
      intercom: adress.intercom,
      active: true
    })
    this.openDialog()
  }

  deleteAdress(adress: any){
    const index = this.user.adress.findIndex(adres => adres.id === adres.id);
    this.user.adress.splice(index, 1)
    localStorage.setItem( 'currentUser',JSON.stringify(this.user))
    this.data.change(this.user, this.user.uid)
    this.getActiveAdress()
  }

  activeAdress(id: string){
    const index = this.user.adress.findIndex(adres => adres.id === id);
    for(let i  = 0 ; i< this.user.adress.length; i++){
      this.user.adress[i].active = false
    }
    this.user.adress[index].active = true
    localStorage.setItem( 'currentUser',JSON.stringify(this.user))
    this.data.change(this.user, this.user.uid)
  }

  getActiveAdress(){
    if(this.user.adress.length != 0){
      if(this.user.adress.some(adr => adr.active == true)){

      }else{
        this.user.adress[0].active = true
        for(let i = 1; i < this.user.adress.length; i++){
          this.user.adress[i].active = false
        }
      }
    localStorage.setItem( 'currentUser',JSON.stringify(this.user))
    this.data.change(this.user, this.user.uid)

    }
    
  }


  exit(){
    this.data.logout()
    localStorage.setItem( 'currentUser','')
    this.router.navigate([''])
  }
}
