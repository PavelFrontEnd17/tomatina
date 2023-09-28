import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { IUpdate } from 'src/app/shared/interface/auth/auth.interfaces';
import { ICategoryResponse } from 'src/app/shared/interface/category/categories.interfaces';
import { IProductResponse } from 'src/app/shared/interface/product/product.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-dostavka',
  templateUrl: './dostavka.component.html',
  styleUrls: ['./dostavka.component.scss']
})
export class DostavkaComponent {
  public eventSubscription
  constructor(
    private data: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private categroyData: CategoryService,
    private userData: AuthService,
    private dialog: MatDialog

  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.category = this.ActivatedRoute.snapshot.paramMap.get('category') as string;
        this.getData()
        this.getUser()


      }
    })
  }


  ngOnInit(): void {
    this.category = this.ActivatedRoute.snapshot.paramMap.get('category') as string;

    this.getData()
    this.getUser()
  }



  public categorySelect!: string

  public categoryList!: ICategoryResponse[]
  public category!: string
  public products: IProductResponse[] =[]
  getData() {
    this.category = this.ActivatedRoute.snapshot.paramMap.get('category') as string;
    let products!: IProductResponse[]

    this.data.get().subscribe(data => {
      this.products = []
      products = data as IProductResponse[]
      for(let i = 0; i < 4; i++){

        this.products.push(products[i])
      }
    })

    let categoryList!: ICategoryResponse[]
    this.categroyData.getCategories()
      .subscribe(data => {
        this.categoryList = []
        categoryList = data as ICategoryResponse[]
        for(let i = 0; i < 4; i++){
          this.categoryList.push(categoryList[i]) 

        }


      })

  }



  Count(product: IProductResponse, value: boolean) {
    if (!value && product.count > 1) {
      product.count--
    }
    if (value && product.count < 999) {
      product.count++
    }
  }
  public busket: IProductResponse[] = []
  addToBuscket(product: IProductResponse) {
    if (localStorage.getItem('basket') != 'null') {
      this.busket = JSON.parse(localStorage.getItem('basket') as string)
      if (this.busket?.some(prod => prod.id === product.id)) {
        const index = this.busket.findIndex(prod => prod.id === product.id);
        this.busket[index].count += product.count;
      } else {
        this.busket?.push(product)
        console.log(product)

      }
    } else {
      this.busket.push(product);

    }

    localStorage.setItem('basket', JSON.stringify(this.busket));
    product.count = 1;

  }
  public testUser: string = ''
  public user!: IUpdate
  getUser() {
    this.testUser = localStorage.getItem('currentUser') as string
    if (this.testUser != '' && this.testUser != null) {
      this.user = JSON.parse(localStorage.getItem('currentUser') as string)
    }
  }

  openDialog() {
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })
  }

  addFavorite(product: IProductResponse) {
    if (this.testUser != '' && this.testUser != null) {
      if (this.user.favorite.length != 0) {
        if (this.user.favorite.some(prod => prod.id === product.id)) {
          let index = this.user.favorite.indexOf(product)
          this.user.favorite.splice(index, 1)
        } else {
          this.user.favorite.push(product)

        }
      } else {
        this.user.favorite.push(product)


      }
      localStorage.setItem('currentUser', JSON.stringify(this.user))
      this.userData.change(this.user, this.user.uid)
      this.getFavorite(product)
    } else {
      this.openDialog()
    }
  }


  getFavorite(product: IProductResponse) {
    if (this.testUser != '' && this.testUser != null) {
      if (this.user.favorite.some(prod => prod.id === product.id)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }

  }

  fastOrder(product: IProductResponse) {
    this.addToBuscket(product)
    this.router.navigate(['/check-out'])

  }




  setCategorySelect() {
    let select = document.querySelector('.select-cat') as HTMLSelectElement
    let value = select.value
    this.router.navigate(['/product/' + value])
  }
}
