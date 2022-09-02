import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appFieldEditorTemplate]'
})
export class FieldEditorTemplateDirective {
  @Input('appFieldEditorTemplate') name: string;

  constructor(readonly template: TemplateRef<any>) { }
}
