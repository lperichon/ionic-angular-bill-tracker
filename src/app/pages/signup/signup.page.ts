import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  @ViewChild(AuthFormComponent, { static: false })
  signupForm: AuthFormComponent;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  async signupUser(credentials: UserCredential): Promise<void> {
    try {
      const userCredential = await this.authService.linkAccount(
        credentials.email,
        credentials.password
      );
      await this.signupForm.hideLoading();
      this.router.navigateByUrl(
        `/bill-detail/${this.route.snapshot.paramMap.get('billId')}`
      );
    } catch (error) {
      await this.signupForm.hideLoading();
      this.signupForm.handleError(error);
    }
  }
}
