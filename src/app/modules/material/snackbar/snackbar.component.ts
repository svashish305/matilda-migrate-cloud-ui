import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any){}

  ngOnInit() {
  }  
  onActionBtnClick() {
    this.snackBarRef.dismissWithAction();
  }
  getSnackAvatar(snackType){
    if(snackType == 'success'){
      return 'assets/imgs/notify-success.svg';
    }
    else  if(snackType == 'error'){
      return 'assets/imgs/notify-error.svg';
    }
    else  if(snackType == 'info'){
      return 'assets/imgs/notify-info.svg';
    }
    else {
      return 'assets/imgs/notify-warning.svg';

    }

  }
 
}
