import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedLibs} from '../../shared/shared-libs';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedLibs
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
