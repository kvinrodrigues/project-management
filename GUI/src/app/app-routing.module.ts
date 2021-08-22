import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((value) => value.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((value) => value.HomeModule),
  },
  {
    path: 'permissions',
    loadChildren: () =>
      import('./pages/permissions/permissions.module').then(
        (m) => m.PermissionsModule
      ),
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then(
        (m) => m.UserModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
