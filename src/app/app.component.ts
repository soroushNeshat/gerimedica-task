import { Component } from '@angular/core';
import { FieldMetadata } from './models/field.metadata';
import { fieldMetadataList } from './to-render.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly fieldMetadataList: FieldMetadata[];

  constructor() {
    this.fieldMetadataList = fieldMetadataList as FieldMetadata[];
  }
}
