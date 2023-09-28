import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUpdate } from 'src/app/shared/interface/auth/auth.interfaces';
import { IProductResponse } from 'src/app/shared/interface/product/product.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  constructor(
    private router: Router,
    private userData: AuthService
  ) {
  }

  ngOnInit() {
    this.getData()
  }

  public user: IUpdate = JSON.parse(localStorage.getItem('currentUser') as string)
  public favList: IProductResponse[] = this.user?.favorite

  getData() {
    this.user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.favList = this.user?.favorite

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

  getUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser') as string)
  }

  addFavorite(product: IProductResponse) {
    if (this.user.favorite?.length != 0) {
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
  }


  getFavorite(product: IProductResponse) {
    if (this.user.favorite.some(prod => prod.id === product.id)) {
      return true
    } else {
      return false
    }
  }

  fastOrder(product: IProductResponse) {
    this.addToBuscket(product)
    this.router.navigate(['/check-out'])

  }
}
