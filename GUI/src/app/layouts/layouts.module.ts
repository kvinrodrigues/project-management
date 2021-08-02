import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibs} from '../shared/shared-libs';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((value) => value.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((value) => value.HomeModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedLibs,
  ],
  exports: [
    RouterModule,

  ],
  declarations: [],
})
export class LayoutsModule {
}
