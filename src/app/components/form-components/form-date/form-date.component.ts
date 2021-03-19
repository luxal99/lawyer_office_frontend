import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../../../model/Field';
import {FieldConfig} from '../../../model/FieldConfig';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.css']
})
export class FormDateComponent implements OnInit, Field {

  @Input() config: FieldConfig;
  @Input() group: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

}
