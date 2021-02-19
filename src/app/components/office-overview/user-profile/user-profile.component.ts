import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {PASSWORD_FORM_CONTROL_NAME, SNACKBAR_ERR_MESSAGE, TOKEN_NAME, USERNAME_FORM_CONTROL_NAME} from '../../../constants/constant';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username = '';

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
  }

  userForm = new FormGroup({
    username: new FormControl(localStorage.getItem('username').substring(1, localStorage.getItem('username').length - 1), Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }

  updateUser() {
    this.userService.changeCredentials({
      oldUsername: localStorage.getItem('username').substring(1, localStorage.getItem('username').length - 1),
      newUsername: this.userForm.get(USERNAME_FORM_CONTROL_NAME).value,
      password: this.userForm.get(PASSWORD_FORM_CONTROL_NAME).value
    }).subscribe((resp) => {
      localStorage.removeItem(TOKEN_NAME);
      location.reload();
    }, () => {
      this.snackBar.open(SNACKBAR_ERR_MESSAGE, 'DONE');
    });
  }
}
