import { NgModule } from '@angular/core';
import {
  MatSlideToggleModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatGridListModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatButtonModule,
  MatDialogModule,
  MatRadioModule,
  MatInputModule,
  MatChipsModule,
  MatCardModule,
  MatMenuModule,
  MatTabsModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

const MatModules = [

  // display
  MatExpansionModule,
  MatGridListModule,
  MatDialogModule,
  MatCardModule,

  // navigation
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatTabsModule,

  // form
  MatSlideToggleModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatRadioModule,
  MatListModule,

  // extras
  MatProgressBarModule,
  MatTooltipModule,
  MatChipsModule,
  MatIconModule,
];

@NgModule({
  imports: MatModules,
  exports: MatModules
})
export class MaterialModule {}
