import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Case } from '../../model/Case';
import { CaseOverviewDialogComponent } from '../office-overview/case-overview/case-overview-dialog/case-overview-dialog.component';
import { CaseService } from '../../service/case.service';
import { Client } from '../../model/Client';
import { ClientOverviewDialogComponent } from '../office-overview/client-overview/client-overview-dialog/client-overview-dialog.component';
import { ClientService } from '../../service/client.service';
import { ConfirmDialogComponent } from '../office-overview/confirm-dialog/confirm-dialog.component';
import { DialogOptions } from '../../dialog-options';
import { GlobalMethods } from '../../dialog-global';
import { MatDialog } from '@angular/material';
import { Notification } from 'src/app/model/Notification';
import { NotificationService } from '../../service/notification.service';
import { UserProfileComponent } from '../office-overview/user-profile/user-profile.component';
import { id } from 'date-fns/locale';
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
      this.listOfCases = resp
    })
  }

  getAllClients() {
    this.clientService.getAll().subscribe(resp => {
      this.listofClient = resp
    })
  }


  getNotification() {
    this.notificatioService.getAll().subscribe(resp => {
      this.listOfNotification = resp

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
    })
  }
  async search() {

    var input: string = this.searchForm.get("search").value;

    this.listOfCases.forEach(filter => {
      if (
        filter.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
        && this.searchForm.get("search").value !== ''
        && (this.filteredArray.findIndex(x => x.title === filter.title) < 0)
      ) {
        this.filteredArray.push(filter)
      }
    })

    this.listofClient.forEach(filter => {
      if (filter.full_name.toLowerCase().indexOf(input.toLowerCase()) !== -1 && this.searchForm.get("search").value !== '') {
        if (this.filteredArray.findIndex(x => x.full_name === filter.full_name) < 0) {
          this.filteredArray.push(filter)
        }
      }
    })


  }

  openCaseOverview(cs): void {
    new GlobalMethods(this.dialog).openDialog(CaseOverviewDialogComponent, DialogOptions.getOptions(cs)).afterClosed().subscribe(result => {
      this.getAllCases();
    })
  }
  openClientOverview(client): void {
    new GlobalMethods(this.dialog).openDialog(ClientOverviewDialogComponent, DialogOptions.getOptions(client)).afterClosed().subscribe(() => {
      this.getAllClients();
    })
  }

  openUserProfileDialog() {
    new GlobalMethods(this.dialog).openDialog(UserProfileComponent, DialogOptions.getOptions({}))
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    location.reload();
  }

  desideToOpenDialog(object) {
    if (object.full_name !== undefined) {
      this.openClientOverview(object)
    } else {
      this.openCaseOverview(object)
    }
  }

  openConfirmDialog() {
    new GlobalMethods(this.dialog).openDialog(ConfirmDialogComponent, DialogOptions.getConfirmDialogOption()).afterClosed().subscribe(() => {
      if (JSON.parse(localStorage.getItem("confirm"))) {
        localStorage.removeItem("token")
        localStorage.removeItem("confirm")
        location.reload();
      }
    })
  }
}
