import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";
import * as uuid from 'uuid';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class Utilities {
  constructor(private _snackBar: MatSnackBar) { }

  public generateId() {
    return uuid.v4();
  }

  public openSnackBar(message: string, snackType: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: snackType, snackBar: this._snackBar },
      panelClass: [snackType]
    });
  }

  public errorNotification(error: any) {
    let message = '';
    let snackType = 'error';
    
    if (error.status === 0) {
      message = 'Error Occurred Server is not responding';
    } else if (error.status === 400) {
      message = error.error['message'];
    } else {
      message = 'Error Occurred Something went wrong. Please retry again';
    }

    this._snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: snackType, snackBar: this._snackBar },
      panelClass: [snackType]
    });
  }

}