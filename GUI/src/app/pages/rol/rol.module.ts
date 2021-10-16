// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

// Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

// Rol
import {RolRoutingModule} from './rol-routing.module';
import {RolComponent} from './rol.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RolEditComponent} from './rol-edit.component';
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [RolComponent, RolEditComponent],
    imports: [
        CommonModule,
        RolRoutingModule,
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
        MatInputModule,
        FlexLayoutModule,
        MatSelectModule,
    ],
})
export class RolModule {}
