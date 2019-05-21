import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  public billList: AngularFirestoreCollection<any>;
  public userId: string;

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.billList = this.firestore.collection(
        `/userProfile/${user.uid}/billList`
      );
    });
  }

  getBillList(): AngularFirestoreCollection<any> {
    return this.billList;
  }

  getBill(billId: string): AngularFirestoreDocument<any> {
    return this.firestore.doc(`/userProfile/${this.userId}/billList/${billId}`);
  }

  async createBill(
    name: string,
    amount: number,
    dueDate: string = null,
    paid: boolean = false
  ): Promise<any> {
    const newBillRef: firebase.firestore.DocumentReference = await this.billList.add(
      {}
    );

    return newBillRef.update({
      name,
      amount,
      dueDate,
      paid,
      id: newBillRef.id
    });
  }

  removeBill(billId: string): Promise<any> {
    return this.billList.doc(billId).delete();
  }

  payBill(billId: string): Promise<any> {
    return this.billList.doc(billId).update({ paid: true });
  }
}
