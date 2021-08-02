import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: []
})
export class SharedLibs {
  static forRoot(): {} {
    return {
      ngModule: SharedLibs
    };
  }
}
