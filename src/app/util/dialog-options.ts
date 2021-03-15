import {MatDialogConfig} from '@angular/material/dialog';

export class DialogOptions {

  static dialogOptions: MatDialogConfig;

  static getOptions(data) {
    if (window.screen.width <= 570) {
      this.dialogOptions = {
        minWidth: '100%',
        position: {bottom: '0'},
        maxHeight: '82vh',
        height: '80vh',
        data
      };
    } else {
      this.dialogOptions = {
        minWidth: '40%',
        position: {right: '0'},
        maxHeight: '100vh',
        height: '100vh',
        data
      };
    }
    return this.dialogOptions;
  }

  static getConfirmDialogOption() {
    if (window.screen.width <= 570) {
      this.dialogOptions = {
        minWidth: '100vh',
        maxHeight: '50vh',
        height: '50vh',
        position: {bottom: '0'}
      };
    } else {
      this.dialogOptions = {
        minWidth: '30%',
        height: 'auto'
      };
    }
    return this.dialogOptions;
  }

}
