import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {User} from '../../model/User';
import {UserInfo} from '../../model/UserInfo';
import {UserService} from '../../service/user.service';
import {
  BASIC_ROUTE, EMAIL_FORM_CONTROL_NAME, FULL_NAME_FORM_CONTROL_NAME, PASSWORD_CONFIRM_FORM_CONTROL_NAME,
  PASSWORD_FORM_CONTROL_NAME,
  SNACKBAR_BUTTON_TEXT,
  SNACKBAR_ERR_MESSAGE,
  USERNAME_FORM_CONTROL_NAME, VALID_REGISTRATION_MESSAGE
} from '../../constants/constant';

@Component({
  selector: 'app-registation',
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.css']
})
export class RegistationComponent implements OnInit {
  registrationForm = new FormGroup({
    full_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  });

  // tslint:disable-next-line:variable-name
  constructor(private userService: UserService, private _snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    if (this.registrationForm.get(PASSWORD_FORM_CONTROL_NAME).value ===
      this.registrationForm.get(PASSWORD_CONFIRM_FORM_CONTROL_NAME).value) {
      this.userService.register(new User(
        this.registrationForm.get(USERNAME_FORM_CONTROL_NAME).value, this.registrationForm.get(PASSWORD_FORM_CONTROL_NAME).value,
        new UserInfo(this.registrationForm.get(FULL_NAME_FORM_CONTROL_NAME).value, this.registrationForm.get(EMAIL_FORM_CONTROL_NAME).value)
      )).subscribe(() => {
        this.openSnackBar(VALID_REGISTRATION_MESSAGE, SNACKBAR_BUTTON_TEXT);
        this.router.navigate([BASIC_ROUTE]);
      }, err => {
        this.openSnackBar(SNACKBAR_ERR_MESSAGE, SNACKBAR_BUTTON_TEXT);
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
