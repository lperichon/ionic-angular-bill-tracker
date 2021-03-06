import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectToLogin = redirectUnauthorizedTo(['landing']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
    ...canActivate(redirectToLogin)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'signup/:billId',
    loadChildren: './pages/signup/signup.module#SignupPageModule',
    ...canActivate(redirectToLogin)
  },
  {
    path: 'reset-password',
    loadChildren:
      './pages/reset-password/reset-password.module#ResetPasswordPageModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    ...canActivate(redirectToLogin)
  },
  {
    path: 'landing',
    loadChildren: './pages/landing/landing.module#LandingPageModule'
  },
  {
    path: 'bill-create',
    loadChildren: './pages/bill-create/bill-create.module#BillCreatePageModule',
    ...canActivate(redirectToLogin)
  },
  {
    path: 'bill-detail/:id',
    loadChildren: './pages/bill-detail/bill-detail.module#BillDetailPageModule',
    ...canActivate(redirectToLogin)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
