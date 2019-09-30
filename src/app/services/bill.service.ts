import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  async getBillList(): Promise<AngularFirestoreCollection<any>> {
    const user: firebase.User = await this.authService.getUser();
    return this.firestore.collection(`/userProfile/${user.uid}/billList`);
  }

  async getBill(billId: string): Promise<AngularFirestoreDocument<any>> {
    const user: firebase.User = await this.authService.getUser();
    return this.firestore.doc(`/userProfile/${user.uid}/billList/${billId}`);
  }

  async createBill(
    name: string,
    amount: number,
    dueDate: string = null,
    paid: boolean = false
  ): Promise<any> {
    const user: firebase.User = await this.authService.getUser();
    const newBillRef: firebase.firestore.DocumentReference = await this.firestore
      .collection(`/userProfile/${user.uid}/billList/`)
      .add({});

    return newBillRef.update({
      name,
      amount,
      dueDate,
      paid,
      id: newBillRef.id
    });
  }

  async removeBill(billId: string): Promise<any> {
    const user: firebase.User = await this.authService.getUser();
    return this.firestore
      .doc(`/userProfile/${user.uid}/billList/${billId}`)
      .delete();
  }

  async payBill(billId: string): Promise<any> {
    const user: firebase.User = await this.authService.getUser();
    return this.firestore
      .doc(`/userProfile/${user.uid}/billList/${billId}`)
      .update({ paid: true });
  }
}
