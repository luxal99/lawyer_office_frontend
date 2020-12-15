import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../service/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {User} from '../../model/User';
import {TOKEN_NAME} from '../../constants/constant';

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
  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.auth(new User(this.loginForm.get('username').value, this.loginForm.get('password').value)).subscribe(resp => {
      if (resp[TOKEN_NAME]) {
        localStorage.setItem(TOKEN_NAME, resp[TOKEN_NAME]);

        localStorage.setItem('username', JSON.stringify(resp['username']));
        this.router.navigate(['/']);
      }
    }, err => {
      this.openSnackBar('Uneti podaci nisu validni', 'DONE');
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
