import { Injectable } from '@angular/core';
import { ICategoryRequire } from '../../interface/category/categories.interfaces';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc, docData, collection
} from "@angular/fire/firestore";
import {  DocumentData} from "@firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection!: CollectionReference<DocumentData>
  constructor(
    private afs: Firestore  

    ){
      this.categoryCollection = collection(this.afs, 'categories');
    }

  


  // ----------------------------------------------------------------------------------------
  create(category: ICategoryRequire){
    return addDoc(this.categoryCollection, category)
   }

  getCategories(){
    return collectionData(this.categoryCollection, {idField: 'id'})
  }
  getOneById(id: number|string){
    const categoryDocumentReference = doc(this.afs,  `categories/${id}`)
    return docData(categoryDocumentReference, {idField: 'id'})
  }
  update(category: ICategoryRequire, id: number | string){
    const categoryDocumentReference = doc(this.afs,  `categories/${id}`)
    return updateDoc(categoryDocumentReference, {...category})
  }
  delete(id: number | string){
    const categoryDocumentReference = doc(this.afs,  `categories/${id}`)
    return deleteDoc(categoryDocumentReference)

  }
}