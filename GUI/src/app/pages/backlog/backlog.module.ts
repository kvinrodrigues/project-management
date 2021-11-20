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
import {MatSelectModule} from '@angular/material/select';


// Project
import {BacklogRoutingModule} from './backlog';
import {BacklogComponent} from './backlog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BacklogEditComponent} from './backlog-edit.component';
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [BacklogComponent, BacklogEditComponent],
    imports: [
        CommonModule,
        BacklogRoutingModule,
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
        MatSelectModule,
        FlexLayoutModule,
    ],
})
export class BacklogModule {
}
