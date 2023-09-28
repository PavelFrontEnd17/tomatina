import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent {

  constructor(
    private router: Router

  ){
  }
  open(){
    let select = document.querySelector('.select-cat') as HTMLSelectElement
    let value = select.value
    this.router.navigate(['/cabinet/' + value])
  }
}
