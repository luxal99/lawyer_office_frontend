import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import * as CONST from '../../constants/constant';
import {FormControlNames} from '../../constants/constant';

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
    if (this.registrationForm.get(CONST.PASSWORD_FORM_CONTROL_NAME).value ===
      this.registrationForm.get(CONST.PASSWORD_CONFIRM_FORM_CONTROL_NAME).value) {
      this.userService.register({
        username: this.registrationForm.get(CONST.USERNAME_FORM_CONTROL_NAME).value,
        password: this.registrationForm.get(CONST.PASSWORD_FORM_CONTROL_NAME).value,
        idUserInfo: {
          fullName: this.registrationForm.get(FormControlNames.FULL_NAME_FORM_CONTROL).value,
          email: this.registrationForm.get(FormControlNames.EMAIL_FORM_CONTROL).value
        }
      }).subscribe(() => {
        this.openSnackBar(CONST.VALID_REGISTRATION_MESSAGE, CONST.SNACKBAR_BUTTON_TEXT);
        this.router.navigate([CONST.BASIC_ROUTE]);
      }, () => {
        this.openSnackBar(CONST.SNACKBAR_ERR_MESSAGE, CONST.SNACKBAR_BUTTON_TEXT);
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
