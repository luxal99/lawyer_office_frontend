import {Component, OnInit} from '@angular/core';

import {AddClientDialogComponent} from './add-client-dialog/add-client-dialog.component';
import {Client} from 'src/app/model/Client';
import {ClientOverviewDialogComponent} from './client-overview-dialog/client-overview-dialog.component';
import {ClientService} from 'src/app/service/client.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DialogOptions} from 'src/app/util/dialog-options';
import {GlobalMethods} from 'src/app/util/dialog-global';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.css']
})
export class ClientOverviewComponent implements OnInit {

  listOfClients: Array<Client> = [];

  text = '';

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private dialog: MatDialog, private clientService: ClientService) {
  }

  async ngOnInit(): Promise<void> {
    this.getAllClients();
  }

  openConfirmDialog(id: number) {
    GlobalMethods.openDialog(ConfirmDialogComponent, DialogOptions.getConfirmDialogOption(), this.dialog).afterClosed().subscribe(() => {
      if (JSON.parse(localStorage.getItem('confirm'))) {
        this.deleteClient(id);
        localStorage.removeItem('confirm');
      }
    });
  }


  async deleteClient(id) {
    this.clientService.delete(id).subscribe(resp => {
      this.getAllClients();
    });
  }

  getAllClients() {
    this.clientService.getAll().subscribe(resp => {
      this.listOfClients = resp;
    });
  }

  openAddClientDialog(client): void {
    GlobalMethods.openDialog(AddClientDialogComponent, DialogOptions.getOptions(client), this.dialog).afterClosed().subscribe(result => {
      this.getAllClients();
    });
  }

  openClientOverview(client): void {
    GlobalMethods.openDialog(ClientOverviewDialogComponent, DialogOptions.getOptions(client), this.dialog);
  }
}

