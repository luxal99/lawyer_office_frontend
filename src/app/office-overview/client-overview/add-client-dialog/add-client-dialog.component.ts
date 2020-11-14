import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent implements OnInit {

  addClientForm = new FormGroup({
    full_name: new FormControl(this.data.full_name, Validators.required),
    email: new FormControl(this.data.email, Validators.required),
    telephone: new FormControl(this.data.telephone, Validators.required)
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: Client, private clientService: ClientService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  save() {

    let client = new Client(
      this.addClientForm.get("full_name").value,
      this.addClientForm.get("email").value,
      this.addClientForm.get("telephone").value)

    if (this.data.id !== null) {
      client.id = this.data.id;

      this.clientService.update(client).subscribe(resp => {
        this.openSnackBar("Uspešno ste dodali stranku", "DONE")
      }, err => {
        this.openSnackBar("Dogodila se greška", "DONE")
      })
    } else {

      this.clientService.save(client).subscribe(resp => {
        this.openSnackBar("Uspešno ste dodali stranku", "DONE")

      }, err => {

        this.openSnackBar("Dogodila se greška", "DONE")
      })
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
