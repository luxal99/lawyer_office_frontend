import {Component, OnInit} from '@angular/core';
import {CONFIRM_LC} from '../../../constants/constant';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  saidYes() {
    localStorage.setItem(CONFIRM_LC, 'true');
  }

  saidNo() {
    localStorage.setItem(CONFIRM_LC, 'false');
  }
}
