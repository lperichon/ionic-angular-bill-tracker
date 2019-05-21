import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public billList: Observable<any>;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private billService: BillService,
    private router: Router
  ) {}

  ngOnInit() {
    this.billList = this.billService.getBillList().valueChanges();
  }

  async moreBillOptions(billId): Promise<void> {
    const action = await this.actionSheetCtrl.create({
      header: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.billService.removeBill(billId);
          }
        },
        {
          text: 'More details',
          icon: 'play',
          handler: () => {
            this.router.navigate(['/bill-detail', billId]);
          }
        },
        {
          text: 'Mark as Paid!',
          icon: 'checkmark',
          handler: () => {
            this.billService.payBill(billId);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    action.present();
  }
}
