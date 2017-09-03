import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';


@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.user = afAuth.authState;
   }

   get currentUserId(): string{
     return this.authState !== null ? this.authState.uid : '';
   }

   login(email: string, password: string) {
   return  this.afAuth.auth.signInWithEmailAndPassword(email, password)
   .then((resolve) => {
     const status = 'online';
     this.setUserStatus(/*email,*/ status);
     this.router.navigate(['chat']);
   })
   .catch((error) => {
      console.log(error);
   });
   }
   signUp(email: string, password: string , displaName: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displaName, status);
      }).catch(error => console.log(error));
   }

   setUserData(email: string, displaName: string, status: string): void {
     const path = `users/${this.currentUserId}`;
     const data = {
          email: email,
          displaName: displaName,
          status: status
     };

     this.db.object(path).update(data).catch(error => console.log(error));
   }

   setUserStatus(email: string/*, status: string*/) {
    const path = `users/${this.currentUserId}`;
    const data = {
       email: email/*,
       status: status*/
    };


   }

}
