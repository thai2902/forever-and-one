import { NgModule } from '@angular/core';

import { 
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatButtonToggleModule
} from '@angular/material';

const MaterialModule = [
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatButtonToggleModule
]

@NgModule({
  exports: [ MaterialModule ]
})
export class MatModule { }
