import {ComponentType} from '@angular/cdk/portal';
import {MatDialog} from '@angular/material/dialog';

export class GlobalMethods {
  static openDialog(component: ComponentType<any>, options: {}, dialog: MatDialog) {
    return dialog.open<any>(component, options);
  }
}
