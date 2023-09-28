import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin, IUpdate } from '../../interface/auth/auth.interfaces';
import {Auth, createUserWithEmailAndPassword, updatePassword} from "@angular/fire/auth";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {
  Firestore,
  doc, docData, updateDoc
} from "@angular/fire/firestore";
import {setDoc} from "@firebase/firestore";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
// @Injectable()

export class AuthService {

  public isUserLogin$ = new Subject<boolean>();
  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router
  ) { }

  private api = {
    auth: ''
  }



  public loginSub!: Subscription;

  change(data:IUpdate, id: string){
    const productDocumentReference = doc(this.afs,  `user/${id}`)
    return updateDoc(productDocumentReference, {...data})
  }


  async login(email: string, password: string){
    const credential = await signInWithEmailAndPassword(this.auth, email, password)
    console.log(credential.user.uid);
    this.loginSub = docData(doc(this.afs, 'user', credential.user.uid)).subscribe(user => {
      const currUser = { ...user, uid: credential.user.uid }
      localStorage.setItem('currentUser', JSON.stringify(currUser))
      this.isUserLogin$.next(true)
      this.loginSub.unsubscribe()
    }, (e) => {
      console.log(e)
    })
  }

  async emailSignUp(mail: string, password: string, form: any): Promise<any>{
    const credential = await createUserWithEmailAndPassword(this.auth, mail, password)
    const {email, pass, name, sname, phone} = form
    const user = {
      email: email,
      pass: pass,
      fName: name,
      sName: sname,
      phone: phone,
      role: 'USER',
      orders: [],
      favorite: [],
      adress: []
    }
    setDoc(doc(this.afs, 'user', credential.user.uid), user)
    this.login(email, pass)
  }


  get(id: string){
    const userDocumentReference = doc(this.afs,  `user/${id}`)
    return docData(userDocumentReference, {idField: 'uid'})

  }
  logout() {
    localStorage.setItem( 'currentUser','')
    this.router.navigate([''])
    return this.auth.signOut();
    
  }
  passChange(pass: string){
    
    let currUser = this.auth.currentUser
    return updatePassword(currUser!,pass)

  }
}
