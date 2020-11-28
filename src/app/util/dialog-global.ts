import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material';
export class GlobalMethods {
    static openDialog(component: ComponentType<any>, options: {}, dialog: MatDialog) {
        let dialogRef = dialog.open<any>(component, options)
        return dialogRef;
    }
}
