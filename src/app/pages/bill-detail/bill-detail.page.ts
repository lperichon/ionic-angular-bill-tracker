import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { BillService } from '../../services/bill.service';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.page.html',
  styleUrls: ['./bill-detail.page.scss']
})
export class BillDetailPage implements OnInit {
  public bill: Observable<any>;
  public billId: string;
  public placeholderPicture = 'assets/img/debt-collector.jpg';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private billService: BillService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.billId = this.route.snapshot.paramMap.get('id');
    this.bill = this.billService.getBill(this.billId).valueChanges();
  }

  async uploadPicture(): Promise<void> {
    if (this.authService.getUser().isAnonymous === true) {
      const alert = await this.alertCtrl.create({
        message:
          'If you want to continue you will need to provide an email and create a password',
        buttons: [
          { text: 'Cancel' },
          {
            text: 'OK',
            handler: data => {
              this.router.navigate(['/signup', this.billId]);
            }
          }
        ]
      });
      alert.present();
    } else {
      const debtPicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });
      this.billService.takeBillPhoto(this.billId, debtPicture.base64String);
    }
  }

  async showOptions(): Promise<void> {
    const action = await this.actionCtrl.create({
      header: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.billService.removeBill(this.billId).then(() => {
              this.router.navigateByUrl('home');
            });
          }
        },
        {
          text: 'Mark as Paid!',
          icon: 'checkmark',
          handler: () => {
            this.billService.payBill(this.billId);
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
