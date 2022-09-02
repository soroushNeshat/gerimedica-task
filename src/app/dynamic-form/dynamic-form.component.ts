import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NbComponentStatus } from '@nebular/theme';
import { FieldEditorTemplateDirective } from '../field-editor-template.directive';
import { FieldMetadata } from '../models/field.metadata';
import { AugmentedFieldMetadata } from './augmented-field.meta-data';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() set fieldMetadataList(v: FieldMetadata[]) {
    this.formGroup = this._fb.group({});
    this.augmentedFieldMetadataList = (v ?? []).reduce((p, c) => {
      const validatorFnList: ValidatorFn[] = c.mandatory ? [Validators.required] : [];
      const formControl = this._fb.control(null, { validators: validatorFnList });
      if (c.hidden) {
        formControl.disable();
      }
      p.push({
        ...c,
        visibilityToggleButtonStatus: this._calculateVisibilityToggleButtonStatus(c.hidden),
        formControl
      });
      this.formGroup.addControl(c.field, formControl);
      return p;
    }, [] as AugmentedFieldMetadata[]);
  }

  @ContentChildren(FieldEditorTemplateDirective)
  set fieldEditorTemplatesDirectives(v: QueryList<FieldEditorTemplateDirective>) {
    this.fieldEditorTemplatesByType = v.reduce((p, c) => {
      p[c.name] = c.template
      return p;
    }, {} as Record<string, TemplateRef<any>>);
  }

  fieldEditorTemplatesByType: Record<string, TemplateRef<any>> = {};
  augmentedFieldMetadataList: AugmentedFieldMetadata[];
  formGroup: FormGroup;

  constructor(private readonly _fb: FormBuilder) { }

  toggleVisibility(field: string): void {
    const metadata = this.augmentedFieldMetadataList.find(item => item.field === field);
    metadata.hidden = !metadata.hidden;
    metadata.visibilityToggleButtonStatus = this._calculateVisibilityToggleButtonStatus(metadata.hidden);
    metadata.hidden ? metadata.formControl.disable() : metadata.formControl.enable();
  }

  submit(): void {
    console.log(this.formGroup.value);
  }

  private _calculateVisibilityToggleButtonStatus(hidden: boolean): NbComponentStatus {
    return hidden ? 'basic' : 'primary';
  }
}
