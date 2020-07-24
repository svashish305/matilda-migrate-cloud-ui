import { MatSnackBar } from '@angular/material/snack-bar';

import { Injectable } from "@angular/core";
import * as uuid from 'uuid';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class Utilities {
    constructor(private _snackBar: MatSnackBar){}

    private generateId() {
        return uuid.v4();
    }

    public openSnackBar(message: string, snackType: string) {
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: { message: message, snackType: snackType, snackBar: this._snackBar },
          panelClass: [snackType]
        });
      }
      
}