// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

// Flex-Layout
import {FlexLayoutModule} from '@angular/flex-layout';

// Material
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

// Project
import {LoginComponent} from './login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
];

@NgModule({
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {floatLabel: 'always'},
        },
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCardModule,
        MatIconModule,
    ],
    exports: [],
    declarations: [LoginComponent],
})
export class LoginModule {
}
