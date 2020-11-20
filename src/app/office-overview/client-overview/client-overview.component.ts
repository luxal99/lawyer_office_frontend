import { Component, OnInit } from '@angular/core';

import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';
import { Client } from 'src/app/model/Client';
import { ClientOverviewDialogComponent } from './client-overview-dialog/client-overview-dialog.component';
import { ClientService } from 'src/app/service/client.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogOptions } from 'src/app/dialog-options';
import { GlobalMethods } from 'src/app/dialog-global';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.css']
})
export class ClientOverviewComponent implements OnInit {

  listOfClients: Array<Client> = [];

  constructor(private dialog: MatDialog, private clientService: ClientService) { }

  async ngOnInit(): Promise<void> {
    this.getAllClients();
  }

  openConfirmDialog(id: number) {
    new GlobalMethods(this.dialog).openDialog(ConfirmDialogComponent, DialogOptions.getConfirmDialogOption()).afterClosed().subscribe(() => {
      if (JSON.parse(localStorage.getItem("confirm"))) {
        this.deleteClient(id)
        localStorage.removeItem("confirm")
      }
    })
  }


  async deleteClient(id) {
    this.clientService.delete(id).subscribe(resp => {
      this.getAllClients()
    })
  }
  getAllClients() {
    this.clientService.getAll().subscribe(resp => {
      this.listOfClients = resp;
    })
  }

  openAddClientDialog(client): void {
    new GlobalMethods(this.dialog).openDialog(AddClientDialogComponent,DialogOptions.getOptions(client)).afterClosed().subscribe(result => {
      this.getAllClients();
    })
  }

  openClientOverview(client): void {
    new GlobalMethods(this.dialog).openDialog(ClientOverviewDialogComponent, DialogOptions.getOptions(client))
  }
}

