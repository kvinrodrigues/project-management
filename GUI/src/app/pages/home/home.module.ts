// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project
import { HomeComponent } from './home.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ComponentsModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
