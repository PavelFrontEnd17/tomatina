import { Injectable } from '@angular/core';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc, docData, collection, Query
} from "@angular/fire/firestore";
import { ActivatedRouteSnapshot } from '@angular/router';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { IProductRequire } from '../../interface/product/product.interfaces';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ProductService {
  private productCollection
  private reviewCollection
  constructor(
    private afs: Firestore
  ){

    this.reviewCollection = collection(this.afs , 'reviews')
    this.productCollection = collection(this.afs , 'products')

  }
  public productSub!: any
  get(){
    return collectionData(this.productCollection, {idField: 'id'})
  } 


  getById(id: string){
    const productDocumentReference = doc(this.afs,  `products/${id}`)
    return docData(productDocumentReference, {idField: 'id'})
  }

  create(product: IProductRequire){
    return addDoc(this.productCollection, product)

  }

  update(product: IProductRequire, id: string){
    const productDocumentReference = doc(this.afs,  `products/${id}`)
    return updateDoc(productDocumentReference, {...product})
  }

  delete(id: string){
    const productDocumentReference = doc(this.afs,  `products/${id}`)
    return deleteDoc(productDocumentReference)
  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    const productDocumentReference = doc(this.afs,  `products/${activatedRouteSnapshot.paramMap.get('id')}`)
    return docData(productDocumentReference, {idField: 'id'})
  }

  addReview(review: any){
    return addDoc(this.reviewCollection, review)
  }

}
