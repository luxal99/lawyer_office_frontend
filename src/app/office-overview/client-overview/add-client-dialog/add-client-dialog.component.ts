import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent implements OnInit {

  addClientForm = new FormGroup({
    full_name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    telephone: new FormControl("", Validators.required)
  })
  constructor(private clientService:ClientService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  save() {
    this.clientService.save(new Client(
      this.addClientForm.get("full_name").value,
      this.addClientForm.get("email").value,
      this.addClientForm.get("telephone").value
    )).subscribe(resp=>{
        console.log(resp);
        this.openSnackBar("Uspešno ste dodali stranku","DONE")
        
    },err =>{

      this.openSnackBar("Dogodila se greška","DONE")
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
