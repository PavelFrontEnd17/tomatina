import { Injectable } from '@angular/core';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc, docData, collection
} from "@angular/fire/firestore";
import { ActivatedRouteSnapshot } from '@angular/router';
import { DocumentData } from "@firebase/firestore"
import { IIngrRequier } from '../../interface/ingridients/ingridients.interfaces';
import { IProductRequire } from '../../interface/product/product.interfaces';
@Injectable({
  providedIn: 'root'
})
// @Injectable()

export class IngrService {
  private ingrCollection
  constructor(
    private afs: Firestore
  ){
    this.ingrCollection = collection(this.afs , 'ingridients')
  }
  public ingrSub!: any
  get(){
    return collectionData(this.ingrCollection, {idField: 'id'})
  }


  getById(id: string){
    const ingrDocumentReference = doc(this.afs,  `ingridients/${id}`)
    return docData(ingrDocumentReference, {idField: 'id'})
  }

  create(ingr: IIngrRequier){
    return addDoc(this.ingrCollection, ingr)

  }

  update(ingr: IIngrRequier, id: string){
    const ingrDocumentReference = doc(this.afs,  `ingridients/${id}`)
    return updateDoc(ingrDocumentReference, {...ingr})
  }

  delete(id: string){
    const ingrDocumentReference = doc(this.afs,  `ingridients/${id}`)
    return deleteDoc(ingrDocumentReference)
  }

}
