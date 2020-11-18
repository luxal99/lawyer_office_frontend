import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {



  title = 'lawyer-office-frontend';

  constructor(private router: Router) {

  }
  ngOnInit(): void {
  }


}

