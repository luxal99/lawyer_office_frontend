import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Notification } from "src/app/model/Notification";
@Injectable({
  providedIn: 'root'
})
export class NotificationService extends GenericService<Notification> {
  route = "notification"
}
