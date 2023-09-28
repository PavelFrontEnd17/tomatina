import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { IUpdate } from 'src/app/shared/interface/auth/auth.interfaces';
import { ICategoryResponse } from 'src/app/shared/interface/category/categories.interfaces';
import { IProductResponse } from 'src/app/shared/interface/product/product.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public catList!: ICategoryResponse[]

  constructor(
    private data: CategoryService,
    private dataP: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private categroyData: CategoryService,
    private userData: AuthService,
    private dialog: MatDialog

  ) { }



  ngOnInit(): void {
    this.getCat()
    this.catList?.sort(function (a, b) {
      return a.order - b.order;

    })
    this.initSwiper()
    this.getProd()
    this.getUser()
  }


  getCat() {
    this.data.getCategories()
      .subscribe(data => {
        data.sort(function (a, b) {
          return a["order"] - b["order"]

        })
        this.catList = data as ICategoryResponse[]
      })

  }

  public read = false

  readMore() {
    this.read = !this.read
  }

  public swiper!: any

  initSwiper() {
    this.swiper = new Swiper('.swiper', {
      spaceBetween: 100,

      direction: 'horizontal',
      
      modules: [Navigation, Pagination],

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 3,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 50
        },
        580: {
          slidesPerView: 2,
          spaceBetween: 50
        },
        995: {
          slidesPerView: 3,
          spaceBetween: 100
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 100

        }

      }
    });
  }
  public prevSlides = 0
  public nextSlides = 2

  public products: IProductResponse[] = []

  getProd() {
    this.dataP.get().subscribe(data => {
      this.products = data as IProductResponse[]

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

  public user!: IUpdate
  public testUser!: any
  getUser() {
    this.testUser = localStorage.getItem('currentUser') as string
    if (this.testUser != '' && this.testUser != null && this.testUser != undefined && this.testUser != 'undefined') {
      this.user = JSON.parse(localStorage.getItem('currentUser') as string)
    }
  }
  openDialog(){
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })
  }
  addFavorite(product: IProductResponse) {
    if (this.testUser != '' && this.testUser != null && this.testUser != undefined && this.testUser != 'undefined') {
      if (this.user.favorite.length != 0) {
        if (this.user.favorite?.some(prod => prod.id === product.id)) {
          let index = this.user.favorite?.indexOf(product)
          this.user.favorite?.splice(index, 1)
        } else {
          this.user.favorite?.push(product)

        }
      } else {
        this.user.favorite?.push(product)


      }
      localStorage.setItem('currentUser', JSON.stringify(this.user))
      this.userData.change(this.user, this.user.uid)
      this.getFavorite(product)
    }else{
      this.openDialog()
    }

  }


  getFavorite(product: IProductResponse) {
    if (this.testUser != '' && this.testUser != null && this.testUser != undefined && this.testUser != 'undefined') {
      
      if (this.user.favorite?.some(prod => prod.id === product.id)) {
        return true
      } else {
        return false
      }
      
    }
    else{
      return false
    }
    
  }

  fastOrder(product: IProductResponse) {
    this.addToBuscket(product)
    this.router.navigate(['/check-out'])

  }
}
