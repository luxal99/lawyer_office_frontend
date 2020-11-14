import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/service/client.service';
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';
import { ClientOverviewDialogComponent } from './client-overview-dialog/client-overview-dialog.component';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.css']
})
export class ClientOverviewComponent implements OnInit {

  listOfClients:Array<Client> = [];

  constructor(private dialog: MatDialog,private clientService:ClientService) { }

  async ngOnInit(): Promise<void> {
    this.getAllClients();
  }

  getAllClients(){
    this.clientService.getAll().subscribe(resp=>{
      this.listOfClients = resp as Array<Client>;
    })
  }
  openAddClientDialog(client?:Client): void {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      minWidth: '40%',
      position: { right: '0' },
      height: '100vh',
      data:client
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllClients();
    });
  }

  openClientOverview(client): void {
    const dialogRef = this.dialog.open(ClientOverviewDialogComponent, {
      minWidth: '70%',
      position: { right: '0' },
      height: '100vh',
      data:client
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllClients();
    });
  }

}

