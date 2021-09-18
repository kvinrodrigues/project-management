// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


// Project
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatGridListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
  ],
})
export class ProjectModule {}