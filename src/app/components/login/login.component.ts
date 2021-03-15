import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {User} from '../../model/User';
import {
  BASIC_ROUTE,
  NOT_VALID_CREDENTIALS_MESSAGE, PASSWORD_FORM_CONTROL_NAME,
  REGISTER_SLASH_ROUTE_,
  SNACKBAR_BUTTON_TEXT,
  TOKEN_NAME, USERNAME_FORM_CONTROL_NAME,
  USERNAME_LS
} from '../../constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  // tslint:disable-next-line:variable-name
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  login() {

    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login-spinner').style.display = 'block';
    this.authService.auth({
      username: this.loginForm.get(USERNAME_FORM_CONTROL_NAME).value,
      password: this.loginForm.get(PASSWORD_FORM_CONTROL_NAME).value
    }).subscribe(async (resp) => {
      if (resp[TOKEN_NAME]) {
        localStorage.setItem(TOKEN_NAME, resp[TOKEN_NAME]);
        localStorage.setItem(USERNAME_FORM_CONTROL_NAME, JSON.stringify(resp[USERNAME_LS]));
        await this.router.navigate([BASIC_ROUTE]);
      }
    }, () => {
      document.getElementById('login-spinner').style.display = 'none';

      document.getElementById('login-form').style.display = 'block';
      this.openSnackBar(NOT_VALID_CREDENTIALS_MESSAGE, SNACKBAR_BUTTON_TEXT);
    });
  }

  // goToRegister() {
  //   this.router.navigate([REGISTER_SLASH_ROUTE_]);
  // }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
