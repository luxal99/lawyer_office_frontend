import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../../../model/Field';
import {FieldConfig} from '../../../model/FieldConfig';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements Field, OnInit {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() label = 'Title';
  @Input() type = 'text';

  @Input() formDisplayValue = '';

  ngOnInit(): void {
  }

}
