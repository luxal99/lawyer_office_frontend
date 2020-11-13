import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from '../model/User';
import { UserInfo } from '../model/UserInfo';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-registation',
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.css']
})
export class RegistationComponent implements OnInit {
  registrationForm = new FormGroup({
    full_name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),

    confirm_password: new FormControl("", Validators.required),
  })

  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  register() {
    this.userService.save(new User(
      this.registrationForm.get("username").value, this.registrationForm.get("password").value,
      new UserInfo(this.registrationForm.get("full_name").value, this.registrationForm.get("email").value)
    )).subscribe(resp => {
      this.openSnackBar(resp, "DONE")
    }, err => {
      console.log(err);
      console.log(err);
      
      // this.openSnackBar("Dogodila se greska", "DONE")
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
