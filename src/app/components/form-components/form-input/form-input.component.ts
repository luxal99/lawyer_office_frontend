import {Component, Input, OnInit} from '@angular/core';
import {FieldConfig} from '../../../model/FieldConfig';
import {FormGroup} from '@angular/forms';
import {Field} from '../../../model/Field';
import {Icons} from '../../../constants/constant';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements Field, OnInit {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() icon = Icons.TITLE_ICON;

  ngOnInit(): void {
  }
}
