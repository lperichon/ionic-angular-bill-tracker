import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['landing']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    ...canActivate(redirectUnauthorizedToLanding)
  },
  {
    path: 'landing',
    loadChildren: './pages/landing/landing.module#LandingPageModule'
  },
  {
    path: 'bill-create',
    loadChildren: './pages/bill-create/bill-create.module#BillCreatePageModule',
    ...canActivate(redirectUnauthorizedToLanding)
  },
  {
    path: 'bill-detail/:id',
    loadChildren: './pages/bill-detail/bill-detail.module#BillDetailPageModule',
    ...canActivate(redirectUnauthorizedToLanding)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'reset-password',
    loadChildren:
      './pages/reset-password/reset-password.module#ResetPasswordPageModule'
  },
  {
    path: 'signup/:billId',
    loadChildren: './pages/signup/signup.module#SignupPageModule',
    ...canActivate(redirectUnauthorizedToLanding)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
