import {MatButtonModule} from '@angular/material/button';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SharedLibs} from "../../shared/shared-libs";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedLibs,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
