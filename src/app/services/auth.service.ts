import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  loginUser(
    newEmail: string,
    newPassword: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  anonymousLogin(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInAnonymously();
  }

  linkAccount(email: string, password: string): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    return this.afAuth.auth.currentUser.linkWithCredential(credential).then(
      userCredential => {
        this.firestore
          .doc(`/userProfile/${userCredential.user.uid}`)
          .update({ email });
      },
      error => {
        console.log('There was an error linking the account', error);
      }
    );
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
