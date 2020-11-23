import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string = ''

  constructor() { }

  userForm = new FormGroup({
    username: new FormControl(localStorage.getItem("username").substring(1, localStorage.getItem("username").length-1), Validators.required),
    password: new FormControl("", Validators.required),
    confirm_password: new FormControl("", Validators.required)
  })

  ngOnInit() {
  }

}
