import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Case } from '../model/Case';
import { CaseOverviewDialogComponent } from '../office-overview/case-overview/case-overview-dialog/case-overview-dialog.component';
import { CaseService } from '../service/case.service';
import { Client } from '../model/Client';
import { ClientOverviewDialogComponent } from '../office-overview/client-overview/client-overview-dialog/client-overview-dialog.component';
import { ClientService } from '../service/client.service';
import { MatDialog } from '@angular/material';
import { Notification } from 'src/app/model/Notification';
import { NotificationService } from '../service/notification.service';
import { sm } from 'jssm';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  notificationIcon;

  filteredArray: Array<any> = [];

  listOfCases: Array<Case> = [];
  listofClient: Array<Client> = [];
  listOfNotification: Array<Notification> = [];

  searchForm: FormGroup = this._formBuilder.group({
    search: '',
  });

  username: string;
  constructor(private _formBuilder: FormBuilder, private clientService: ClientService,
    private caseService: CaseService, private dialog: MatDialog, private notificatioService: NotificationService) { }

  ngOnInit() {
    this.getAllCases();
    this.getAllClients();
    this.getUsername();
    this.getNotification();
    this.addListener();
  }


  addListener() {
    document.getElementById('search').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.search();
      }
    })
  }

  clear() {
    if (this.searchForm.get("search").value === '')
      this.filteredArray = []
  }

  getAllCases() {
    this.caseService.getAll().subscribe(resp => {
      this.listOfCases = resp as Array<Case>
    })
  }

  getAllClients() {
    this.clientService.getAll().subscribe(resp => {
      this.listofClient = resp as Array<Client>
    })
  }


  getNotification() {
    this.notificatioService.getAll().subscribe(resp => {
      this.listOfNotification = resp as Array<Notification>

      if (this.listOfNotification.length > 0) {
        this.notificationIcon = 'notifications_active';
      } else {
        this.notificationIcon = 'notifications'
      }
    })
  }

  getUsername() {
    this.username = localStorage.getItem("username")
    this.username = this.username.substring(1, this.username.length - 1)
  }

  deleteNotification(notification: Notification) {
    this.notificatioService.delete(notification.id).subscribe(resp => {
      this.getNotification();
    }, err => {
        console.log(err);
        
    })
  }
  async search() {


    this.listOfCases.forEach(filter => {
      if (
        filter.title.toLowerCase().indexOf(this.searchForm.get("search").value) !== -1
        && this.searchForm.get("search").value !== ''
        && (this.filteredArray.findIndex(x => x.title === filter.title) < 0)
      ) {
        this.filteredArray.push(filter)
      }
    })

    this.listofClient.forEach(filter => {
      console.log(filter);

      if (filter.full_name.toLowerCase().indexOf(this.searchForm.get("search").value) !== -1 && this.searchForm.get("search").value !== '') {
        if (this.filteredArray.findIndex(x => x.full_name === filter.full_name) < 0) {
          this.filteredArray.push(filter)
        }
      }
    })


  }

  openCaseOverview(cs): void {
    const dialogRef = this.dialog.open(CaseOverviewDialogComponent, {
      minWidth: '50%',
      position: { right: '0' },
      height: '100vh',
      data: cs
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCases();
    });
  }
  openClientOverview(client): void {
    const dialogRef = this.dialog.open(ClientOverviewDialogComponent, {
      minWidth: '70%',
      position: { right: '0' },
      height: '100vh',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllClients();
    });
  }

  desideToOpenDialog(object) {

    console.log(object.full_name);

    if (object.full_name !== undefined) {
      this.openClientOverview(object)
    } else {
      this.openCaseOverview(object)
    }
  }
}