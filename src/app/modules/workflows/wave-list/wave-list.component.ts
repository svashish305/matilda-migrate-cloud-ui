import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-wave-list',
  templateUrl: './wave-list.component.html',
  styleUrls: ['./wave-list.component.scss'],
})
export class WaveListComponent implements OnInit {
  @Input() waveData: any = {};

  accounts: any[] = [];
  accountCollapseState: Map<any, boolean> = new Map();
  selectedAccount: any;

  editAccountFormGroup: FormGroup;
  accountProvider: any;
  accountName: string;
  accountClientID: any;
  accountRegion: any;

  providers: SelectInterface[] = [
    { value: 'AWS', viewValue: 'AWS' },
    { value: 'p-1', viewValue: 'Pizza' },
    { value: 'p-2', viewValue: 'Tacos' },
  ];

  constructor(
    private dataService: DataService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.editAccountFormGroup = this._formBuilder.group({
      editAccountCtrl: ['', Validators.required],
    });
    this.accountProvider = this.providers[0].viewValue;
    this.getAccounts();
  }

  getAccounts() {
    this.dataService.getAccounts().subscribe((data: any[]) => {
      this.accounts = data;
    });
  }

  toggleHeight(accountId) {
    let height;
    if (this.accountCollapseState[accountId]) {
      height = '18.125em';
    }
    return { height };
  }

  toggleCollapse(accountId) {
    this.accountCollapseState[accountId] = !this.accountCollapseState[
      accountId
    ];
  }

  isCollapsed(accountId) {
    this.accountCollapseState[accountId] = false;
  }

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialog.open(template, {
      width: '36.1111111%',
      height: '66.3333333%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditAccountModal(template: TemplateRef<any>, accountId) {
    this.dataService.getAccount(accountId).subscribe((res) => {
      this.selectedAccount = res;

      this.accountName = this.selectedAccount.name;
      this.accountProvider = this.selectedAccount.data.provider;
      this.accountClientID = this.selectedAccount.data.clientID;
      this.accountRegion = this.selectedAccount.data.region;

      const dialogRef = this.dialog.open(template, {
        width: '36.1111111%',
        height: '66.3333333%',
        data: {
          selectedAccount: this.selectedAccount,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

  editAccount(accountId) {
    const updatedAccount = {
      name: this.accountName,
      data: {
        provider: this.accountProvider,
        clientID: this.accountClientID,
        region: this.accountRegion,
      },
    };
    this.dataService.updateAccount(updatedAccount).subscribe((res: any) => {
      console.log('updated account details ', updatedAccount);
    });
  }
}
