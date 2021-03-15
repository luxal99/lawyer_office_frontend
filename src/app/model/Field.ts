import {FormGroup} from '@angular/forms';
import {FieldConfig} from './FieldConfig';

export interface Field {
  config: FieldConfig;
  group: FormGroup;
}
