import { Injectable } from '@angular/core';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  collection
} from "@angular/fire/firestore";
import {  DocumentData} from "@firebase/firestore";

@Injectable({
  providedIn: 'root'
})
// @Injectable()

export class OrdersService {

  private ordersCollection!: CollectionReference<DocumentData>
  constructor(
    private afs: Firestore  

    ){
      this.ordersCollection = collection(this.afs, 'orders');
    }

  create(order: any){
    return addDoc(this.ordersCollection, order)
  }

  getOrders(){
    return collectionData(this.ordersCollection, {idField: 'id'})
  }
}
