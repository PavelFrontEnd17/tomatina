import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthComponent } from 'src/app/auth/auth.component';
import { IUpdate } from 'src/app/shared/interface/auth/auth.interfaces';
import { IProductResponse } from 'src/app/shared/interface/product/product.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  private eventSubscription!: Subscription

  constructor(
    private data: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private userData: AuthService,
    private dialog: MatDialog


  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getProduct(this.ActivatedRoute.snapshot.paramMap.get('id') as string)

      }
    })
  }


  public product: IProductResponse = {
    id: '',
    name: '',
    category: '',
    imgPath: '',
    description: '',
    alergens: '',
    weight: 1,
    kkal: 1,
    prot: 1,
    fats: 1,
    carb: 1,
    count: 1,
    cost: 1,
    banner: '',
    bannerColor: '',
  }
  ngOnInit(): void {
    this.getProduct(this.ActivatedRoute.snapshot?.paramMap.get('id') as string)
    this.ActivatedRoute.data.subscribe(response => { this.product = response["productInfo"] })
    this.getUser()
  }

  getProduct(id: string) {
    this.data.getById(id).subscribe(data => {
      this.product = data as IProductResponse;
    })
  }
  openDialog() {
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })
  }
  Count(product: IProductResponse, value: boolean) {
    if (!value && product.count > 1) {
      product.count--
    }
    if (value && product.count < 999) {
      product.count++
    }
    this.totalPrice = product.count * product.cost
  }
  public testUser = ''
  public totalPrice = 0
  public user!: IUpdate
  getUser() {
    this.testUser = localStorage.getItem('currentUser') as string
    if (this.testUser != '' && this.testUser != null && this.testUser != 'undefined') {
      this.user = JSON.parse(localStorage.getItem('currentUser') as string)
    }
  }
  addFavorite(product: IProductResponse) {
    if (this.testUser != '' && this.testUser != null && this.testUser != 'undefined') {
      if (this.user?.favorite.length != 0) {
        if (this.user?.favorite.some(prod => prod.id === product.id)) {
          let index = this.user?.favorite.indexOf(product)
          this.user?.favorite.splice(index, 1)
        } else {
          this.user?.favorite.push(product)

        }
      } else {
        this.user?.favorite.push(product)


      }
      localStorage.setItem('currentUser', JSON.stringify(this.user))
      this.userData.change(this.user, this.user.uid)
      this.getFavorite(product)
    } else {
      this.openDialog()
    }
  }


  getFavorite(product: IProductResponse) {
    if (this.testUser != '' && this.testUser != null && this.testUser != 'undefined') {
      if (this.user?.favorite?.some(prod => prod.id === product.id)) {
        return true
      } else {
        return false
      }

    }
    else {
      return false
    }
  }

}



