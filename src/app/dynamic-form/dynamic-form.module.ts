import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FieldEditorTemplateDirective } from '../field-editor-template.directive';
import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    FieldEditorTemplateDirective
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    ReactiveFormsModule,
  ],
  exports:[
    DynamicFormComponent,
    FieldEditorTemplateDirective
  ]
})
export class DynamicFormModule { }
