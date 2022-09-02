import { FormControl } from "@angular/forms";
import { NbComponentStatus } from "@nebular/theme";
import { FieldMetadata } from "../models/field.metadata";

export interface AugmentedFieldMetadata extends FieldMetadata {
    formControl: FormControl;
    visibilityToggleButtonStatus: NbComponentStatus;
}