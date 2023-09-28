import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductResponse } from './shared/interface/product/product.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tomatina';


  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public busketClose = true

  public busket!: IProductResponse[]

  ngOnInit(): void {
    this.getSum()

  }

  click() {
    document.querySelector('.check-out-wrapper')?.classList.remove('hide')
    document.querySelector('.right-block')?.classList.add('open')
    this.busket = JSON.parse(localStorage.getItem('basket') as string)

  }
  close() {
    document.querySelector('.check-out-wrapper')?.classList.add('hide')
    document.querySelector('.right-block')?.classList.remove('open')

  }

  delProduct(product: IProductResponse) {
    let buscketString = localStorage.getItem('basket')
    const index = this.busket?.findIndex(prod => prod.id === product.id);
    this.busket?.splice(index, 1)
    localStorage.setItem('basket', JSON.stringify(this.busket));
    buscketString = localStorage.getItem('basket')
    if (buscketString == null || buscketString == '[]') {
      this.getSum()
    }
    this.getSum()

  }
  Count(product: IProductResponse, value: boolean) {
    if (!value && product.count > 1) {
      product.count--
    localStorage.setItem('basket', JSON.stringify(this.busket));

    }
    if (value && product.count < 999) {
      product.count++
    localStorage.setItem('basket', JSON.stringify(this.busket));

    }
    this.getSum()

  }
  public sum: number = 0

  getSum() {
    console.log(this.busket)
    let buscketString = localStorage.getItem('basket')

    this.sum = 0
    if (buscketString == '' || buscketString == 'null' || buscketString == null || buscketString == undefined) {
      this.busketClose = true
      this.close()
      this.busket = []
    } else {

      if (buscketString == null || buscketString == '[]') {
        this.busketClose = true
        this.close()

      } else {
        this.busket = JSON.parse(localStorage.getItem('basket') as string)

        for (let i = 0; i < this.busket?.length; i++) {
          this.sum = this.sum + this.busket[i]?.cost * this.busket[i]?.count
        }
        this.busketClose = false
      }

    }
  }

  checkOut() {
    this.close()
    this.busketClose = false
  }

  clearBusket() {
    this.busket = []
    localStorage.setItem('basket', JSON.stringify(this.busket));
    this.close()
    this.busketClose = true
    console.log(this.busket)
    this.getSum()

  }
}
