import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit {
  constructor(
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  async goToBillList(): Promise<void> {
    const loading = await this.loadingCtrl.create();
    try {
      loading.present();

      this.authService.anonymousLogin().then(() => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/home');
        });
      });
    } catch (error) {
      loading.dismiss().then(() => {
        console.error(error);
      });
    }
  }
}
