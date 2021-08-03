import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibs} from '../shared/shared-libs';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatExpansionModule } from '@angular/material/expansion';


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
    MatExpansionModule
  ],
  exports: [
    RouterModule,

  ],
  declarations: [
    NavbarComponent,
    SidenavComponent
  ],
})
export class LayoutsModule {
}
